import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiDevApiPlugin(): Plugin {
  return {
    name: 'gemini-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini/mentor' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { message, problemTitle, problemCode, context } = JSON.parse(body || '{}');

              const ai = new GoogleGenAI({
                apiKey: process.env.GEMINI_API_KEY,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const systemInstruction = `You are "Python DSA Master AI", a friendly, world-class Senior Staff Software Engineer and FAANG Technical Interview Coach.
Your goal is to help software engineers master Python Data Structures & Algorithms, pass coding interviews, and write clean, Pythonic code.

Key Coaching Principles:
1. Socratic Hints First: If the user asks for a hint, provide an intuitive analogy and a guiding question without immediately giving away the complete code, unless they explicitly request "give me the full code" or "show solution".
2. Pythonic Mastery: Highlight Python idioms (e.g. \`collections.defaultdict\`, \`collections.deque\`, \`heapq\`, \`enumerate\`, \`@cache\`, list comprehensions, \`zip\`, bitwise operations).
3. Rigorous Complexity: Always state Time and Space Complexities with standard Big-O notation.
4. Mobile-Friendly Formatting: Use concise bullet points, bold key terms, and clean code blocks formatted nicely for mobile screens.
5. Edge Cases: Remind students of common interview traps (empty input, duplicates, zero, negative numbers, odd vs even lengths).`;

              const userPrompt = `
Current DSA Context:
- Problem: ${problemTitle || 'General Python DSA Practice'}
- Current Code / Snippet:
\`\`\`python
${problemCode || '# No code provided'}
\`\`\`
- Additional Context: ${context || 'None'}

User Question:
${message}
`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.7-flash',
                contents: userPrompt,
                config: {
                  systemInstruction,
                  temperature: 0.7,
                },
              });

              const reply = response.text || 'I could not generate a response. Please try again.';
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply }));
            } catch (error: any) {
              console.error('Vite dev Gemini API error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to communicate with AI mentor', details: error?.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiDevApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

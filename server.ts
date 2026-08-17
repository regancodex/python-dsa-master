import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini AI DSA Mentor Endpoint
app.post('/api/gemini/mentor', async (req, res) => {
  try {
    const { message, problemTitle, problemCode, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

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
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to communicate with AI Mentor',
      details: error?.message || 'Unknown error',
    });
  }
});

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

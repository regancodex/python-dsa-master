import React, { useState } from 'react';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Table2, 
  Code2, 
  Lightbulb, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { 
  DATA_STRUCTURE_COMPLEXITIES, 
  CHEATSHEET_PATTERNS, 
  PYTHON_DSA_TIPS 
} from '../data/cheatsheetsData';

export const CheatsheetView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'matrix' | 'patterns' | 'tips'>('patterns');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPatterns = CHEATSHEET_PATTERNS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.whenToUse.some((w) => w.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4 pb-28">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">DSA Cheatsheet & Pattern Vault</h2>
            <p className="text-xs text-slate-400">Interview templates, Big-O reference cards, and Python speed hacks.</p>
          </div>
        </div>

        {/* Section Picker Pills */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSection('patterns')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'patterns'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🧩 10 Core Patterns & Templates
          </button>
          <button
            onClick={() => setActiveSection('matrix')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'matrix'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            📊 Big-O Operations Matrix
          </button>
          <button
            onClick={() => setActiveSection('tips')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === 'tips'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            🐍 Python DSA Tips & Idioms
          </button>
        </div>
      </div>

      {/* SECTION 1: Algorithmic Patterns & Templates */}
      {activeSection === 'patterns' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns (e.g. Two Pointers, Monotonic Stack, Backtracking)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-emerald-500 text-xs text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            {filteredPatterns.map((pat) => (
              <div key={pat.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {pat.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {pat.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {pat.summary}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                      ⏱️ {pat.timeComplexity}
                    </span>
                  </div>
                </div>

                {/* When to use */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    🎯 When to apply this pattern:
                  </span>
                  <ul className="space-y-1 pl-1">
                    {pat.whenToUse.map((w, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Template with Copy */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Python Boilerplate Template</span>
                    <button
                      onClick={() => handleCopy(pat.patternTemplate, pat.id)}
                      className="flex items-center gap-1 text-slate-300 hover:text-emerald-300 font-sans text-xs font-semibold cursor-pointer"
                    >
                      {copiedId === pat.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === pat.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto py-code">
                    <code>{pat.patternTemplate}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Big-O Matrix Table */}
      {activeSection === 'matrix' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 overflow-x-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Python Standard Data Structures Big-O Complexities
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Data Structure</th>
                    <th className="py-2.5 px-3">Access</th>
                    <th className="py-2.5 px-3">Search</th>
                    <th className="py-2.5 px-3">Insertion</th>
                    <th className="py-2.5 px-3">Deletion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {DATA_STRUCTURE_COMPLEXITIES.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3 font-sans font-bold text-slate-200">
                        {row.structure}
                        <div className="text-[10px] text-slate-400 font-normal font-sans mt-0.5">{row.notes}</div>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400">{row.access}</td>
                      <td className="py-2.5 px-3 text-cyan-400">{row.search}</td>
                      <td className="py-2.5 px-3 text-amber-300">{row.insertion}</td>
                      <td className="py-2.5 px-3 text-rose-300">{row.deletion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Python DSA Tips */}
      {activeSection === 'tips' && (
        <div className="space-y-3">
          {PYTHON_DSA_TIPS.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-md">
              <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <span>🐍</span>
                <span>{tip.title}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

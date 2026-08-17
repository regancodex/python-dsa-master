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
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Target,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Clock,
  Box
} from 'lucide-react';
import { 
  DATA_STRUCTURE_COMPLEXITIES, 
  CHEATSHEET_PATTERNS, 
  PYTHON_DSA_TIPS 
} from '../data/cheatsheetsData';

export const TricksView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'decision_tree' | 'patterns' | 'matrix' | 'tips'>('decision_tree');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPatternIds, setExpandedPatternIds] = useState<string[]>(['pattern-hash-map', 'pattern-two-pointers']);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleExpand = (id: string) => {
    setExpandedPatternIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List', 'Heap', 'Graphs', 'Backtracking', 'Dynamic Programming'];

  const filteredPatterns = CHEATSHEET_PATTERNS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || 
      (selectedCategory === 'Arrays & Hashing' && (p.category.includes('Hashing') || p.category.includes('Array'))) ||
      (selectedCategory === 'Two Pointers' && p.category.includes('Pointers') && !p.category.includes('Linked')) ||
      (selectedCategory === 'Sliding Window' && p.category.includes('Window')) ||
      (selectedCategory === 'Stack' && p.category.includes('Stack')) ||
      (selectedCategory === 'Binary Search' && p.category.includes('Search')) ||
      (selectedCategory === 'Linked List' && p.category.includes('Linked')) ||
      (selectedCategory === 'Heap' && (p.category.includes('Heap') || p.category.includes('Priority'))) ||
      (selectedCategory === 'Graphs' && p.category.includes('Graph')) ||
      (selectedCategory === 'Backtracking' && p.category.includes('Backtracking')) ||
      (selectedCategory === 'Dynamic Programming' && (p.category.includes('DP') || p.category.includes('Dynamic')));

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.goodFor && p.goodFor.some((g) => g.toLowerCase().includes(q))) ||
      (p.badFor && p.badFor.some((b) => b.toLowerCase().includes(q))) ||
      (p.goodProblemExamples && p.goodProblemExamples.some((ex) => ex.toLowerCase().includes(q))) ||
      (p.badProblemExamples && p.badProblemExamples.some((ex) => ex.toLowerCase().includes(q))) ||
      p.whenToUse.some((w) => w.toLowerCase().includes(q))
    );
  });

  // Decision Tree mapping signals to patterns + why other tools fail
  const interviewSignals = [
    { 
      signal: 'Find any 2 elements adding up to target in UNSORTED array', 
      winningPattern: 'Hash Map (seen = {})', 
      winningWhy: 'Instant O(1) complement lookup (target - num). Keeps original indices intact.',
      time: 'O(N)', 
      wrongPattern: 'Sliding Window / Stack / Backtracking',
      wrongWhy: 'Two Sum pairs are not contiguous (Window fails), monotonic (Stack fails), and Backtracking takes O(2^N) TLE.'
    },
    { 
      signal: 'Find a pair or triplet in an ALREADY SORTED array', 
      winningPattern: 'Two Pointers (Left & Right)', 
      winningWhy: 'Left/Right pointers squeeze inward in O(N) time with 0 extra memory.',
      time: 'O(N)', 
      wrongPattern: 'Hash Map (Overkill)',
      wrongWhy: 'Hash Map costs O(N) extra space. Sorted arrays can be solved in O(1) space with pointers.'
    },
    { 
      signal: 'Longest / shortest contiguous subarray or substring with condition', 
      winningPattern: 'Sliding Window [left, right]', 
      winningWhy: 'Expands right, shrinks left when invalid. Reuses state across contiguous chunks.',
      time: 'O(N)', 
      wrongPattern: 'Two Pointers from ends / Hash Map',
      wrongWhy: 'Opposite end pointers cannot track contiguous substring boundaries.'
    },
    { 
      signal: 'Find Next Greater or Next Smaller Element in array', 
      winningPattern: 'Monotonic Stack', 
      winningWhy: 'Maintains sorted invariant in stack. Resolves elements as soon as a larger one appears.',
      time: 'O(N)', 
      wrongPattern: 'Nested Loops / Sliding Window',
      wrongWhy: 'Brute force nested loops take O(N^2). Window cannot jump over smaller intermediate values.'
    },
    { 
      signal: 'Top K frequent, Kth largest/smallest, stream medians', 
      winningPattern: 'Min/Max Heap (heapq)', 
      winningWhy: 'Keeps dynamic K elements in O(N log K) time without full O(N log N) sorting.',
      time: 'O(N log K)', 
      wrongPattern: 'Full Array Sort',
      wrongWhy: 'Sorting entire array takes O(N log N) time and does not support streaming inputs.'
    },
    { 
      signal: 'Shortest path in unweighted grid or network', 
      winningPattern: 'BFS Queue (collections.deque)', 
      winningWhy: 'BFS explores layer by layer. The first time you reach target is guaranteed shortest path.',
      time: 'O(V + E)', 
      wrongPattern: 'DFS (Recursion)',
      wrongWhy: 'DFS dives deep down rabbit holes; does not guarantee shortest path in unweighted graphs.'
    },
    { 
      signal: 'Find all combinations, permutations, subsets, or board placements', 
      winningPattern: 'Backtracking (DFS + State Undo)', 
      winningWhy: 'Exhaustively explores decision tree and un-chooses upon return.',
      time: 'O(2^N) / O(N!)', 
      wrongPattern: 'Hash Map / Two Pointers',
      wrongWhy: 'Cannot generate exponential combinations with simple pointers or lookups.'
    },
    { 
      signal: 'Count ways, min cost, max profit with overlapping subproblems', 
      winningPattern: 'Dynamic Programming (Memoization)', 
      winningWhy: 'Stores intermediate subproblem solutions, turning O(2^N) recursion into O(N) linear time.',
      time: 'O(N) / O(N^2)', 
      wrongPattern: 'Greedy / Plain Backtracking',
      wrongWhy: 'Greedy makes short-sighted local choices that fail global optima; Backtracking without memo causes TLE.'
    },
    { 
      signal: 'Cycle detection in linked list or find middle node', 
      winningPattern: 'Fast & Slow Pointers (Floyd\'s)', 
      winningWhy: 'Slow moves 1 step, fast moves 2 steps. Meets inside cycle in O(1) extra space.',
      time: 'O(N)', 
      wrongPattern: 'Binary Search / Sliding Window',
      wrongWhy: 'Linked lists do not have random index access O(1).'
    }
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-24 animate-in fade-in duration-200">
      {/* Header Container */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-[#818cf8] border border-indigo-500/25">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  75-Day Master Pattern Vault
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Global Cheatsheet
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Understand in a glance which algorithm is good ⭐ or bad ❌ for any interview problem.
              </p>
            </div>
          </div>
        </div>

        {/* Intuition helper box */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>Why Not All Patterns Solve Every Problem:</span>
          </div>
          <p className="leading-relaxed">
            In coding interviews, choosing the wrong pattern leads to slow code ($O(N^2)$ or $O(2^N)$ TLE) or impossible logic. Use the <strong className="text-emerald-300">⭐ Best For</strong> and <strong className="text-rose-300">❌ Avoid When</strong> badges below to instantly pick the winning tool.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setActiveSection('decision_tree')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'decision_tree'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca] shadow-md shadow-indigo-950/40'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>5-Sec Good vs Bad Matcher</span>
          </button>

          <button
            onClick={() => setActiveSection('patterns')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'patterns'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca] shadow-md shadow-indigo-950/40'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pattern Cards & Code</span>
          </button>

          <button
            onClick={() => setActiveSection('matrix')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'matrix'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca] shadow-md shadow-indigo-950/40'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Table2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Big-O Matrix</span>
          </button>

          <button
            onClick={() => setActiveSection('tips')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'tips'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca] shadow-md shadow-indigo-950/40'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>🐍 Python Idioms</span>
          </button>
        </div>
      </div>

      {/* SECTION: 5-Sec Good vs Bad Pattern Matcher */}
      {activeSection === 'decision_tree' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-3 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Interview Problem Signal ➜ Good vs Bad Tools</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">9 Core Scenarios</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              When an interviewer gives you a question, match the prompt cue on the left to immediately see what to use and what to avoid:
            </p>

            <div className="space-y-3 pt-1">
              {interviewSignals.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-indigo-500/40 transition-all space-y-3"
                >
                  {/* Problem Cue */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Interview Question Asks:
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        "{item.signal}"
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs font-bold flex-shrink-0">
                      ⏱️ {item.time}
                    </span>
                  </div>

                  {/* Good vs Bad comparison grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* Winning Tool */}
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>⭐ USE: {item.winningPattern}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {item.winningWhy}
                      </p>
                    </div>

                    {/* Wrong Tool */}
                    <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        <span>❌ AVOID: {item.wrongPattern}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.wrongWhy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: Patterns with Accordion Collapsing */}
      {activeSection === 'patterns' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns or questions (e.g. Two Sum, Sliding Window, Heap, DP)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pattern Cards List */}
          <div className="space-y-3">
            {filteredPatterns.map((pat) => {
              const isExpanded = expandedPatternIds.includes(pat.id);

              return (
                <div
                  key={pat.id}
                  className="rounded-3xl bg-[#12161f] border border-slate-800/80 overflow-hidden shadow-lg transition-all"
                >
                  {/* Card Clickable Header */}
                  <div
                    onClick={() => toggleExpand(pat.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-900/30 transition-colors"
                  >
                    <div className="space-y-2 pr-2 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                          {pat.category}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          ⏱️ {pat.timeComplexity}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                          💾 {pat.spaceComplexity}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {pat.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {pat.summary}
                      </p>

                      {/* Quick at-a-glance green & red tags */}
                      <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px]">
                        {pat.goodProblemExamples && pat.goodProblemExamples.length > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                            <span className="font-bold">⭐ Best for:</span>
                            <span className="text-slate-200">{pat.goodProblemExamples.slice(0, 2).join(', ')}</span>
                          </div>
                        )}
                        {pat.badProblemExamples && pat.badProblemExamples.length > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300">
                            <span className="font-bold">❌ Avoid for:</span>
                            <span className="text-slate-300">{pat.badProblemExamples[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex-shrink-0 mt-1 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand Code Template'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-slate-800/60 pt-4 animate-in fade-in duration-150">
                      
                      {/* Good vs Bad detailed comparison columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* When this pattern WINS */}
                        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>⭐ Best For & When It Wins</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {(pat.goodFor || pat.whenToUse).map((g, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                <span>{g}</span>
                              </li>
                            ))}
                          </ul>
                          {pat.goodProblemExamples && (
                            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] uppercase font-bold text-emerald-400">Canonical:</span>
                              {pat.goodProblemExamples.map((ex, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* When to AVOID this pattern */}
                        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>❌ Avoid When & Why It Fails</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {(pat.badFor || ['Do not use for problems requiring different structural traversals']).map((b, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-rose-400 font-bold mt-0.5">✗</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          {pat.badProblemExamples && (
                            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] uppercase font-bold text-rose-400">Wrong Tool For:</span>
                              {pat.badProblemExamples.map((ex, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-200 text-[10px] font-bold">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Common Pitfalls Card */}
                      {pat.pitfalls && pat.pitfalls.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>⚠️ Common Interview Traps & Pitfalls:</span>
                          </div>
                          <ul className="space-y-1 text-xs text-slate-300 pl-1">
                            {pat.pitfalls.map((p, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Boilerplate Code */}
                      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
                        <div className="px-3.5 py-2 bg-[#181d2a] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                          <div className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Python Boilerplate Template</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(pat.patternTemplate || pat.pythonSyntax, pat.id);
                            }}
                            className="flex items-center gap-1 text-slate-300 hover:text-white font-sans text-xs font-semibold cursor-pointer px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
                          >
                            {copiedId === pat.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === pat.id ? 'Copied!' : 'Copy Template'}</span>
                          </button>
                        </div>
                        <pre className="p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                          <code>{pat.patternTemplate || pat.pythonSyntax}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: Big-O Matrix Table */}
      {activeSection === 'matrix' && (
        <div className="p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-3.5 shadow-xl animate-in fade-in duration-150">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Table2 className="w-4 h-4 text-emerald-400" />
              <span>Python Data Structures Complexity Cheat Sheet</span>
            </h3>
            <p className="text-xs text-slate-400">
              Quickly compare average time complexities for lists, dicts, sets, deques, and heaps.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse min-w-[480px]">
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
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-200">
                      {row.structure}
                      <div className="text-[10px] text-slate-400 font-normal font-sans mt-0.5">{row.notes}</div>
                    </td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{row.access}</td>
                    <td className="py-2.5 px-3 text-cyan-400 font-bold">{row.search}</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">{row.insertion}</td>
                    <td className="py-2.5 px-3 text-rose-300 font-bold">{row.deletion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: Python DSA Idioms */}
      {activeSection === 'tips' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {PYTHON_DSA_TIPS.map((tip, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-1.5 shadow-lg">
              <h4 className="text-sm font-bold text-[#a5b4fc] flex items-center gap-1.5">
                <span>🐍</span>
                <span>{tip.title}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

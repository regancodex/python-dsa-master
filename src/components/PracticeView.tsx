import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  HelpCircle, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  AlertCircle,
  Lightbulb,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap
} from 'lucide-react';
import { Problem, Difficulty } from '../types/dsa';
import { executePythonCode, ExecutionResult } from '../utils/pythonRunner';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { getPythonPrimerForProblem } from '../utils/pythonFoundations';
import confetti from 'canvas-confetti';

interface PracticeViewProps {
  problem: Problem;
  totalProblems: number;
  isSolved: boolean;
  isBookmarked: boolean;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onNextDay: () => void;
  onPrevDay: () => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
}

type PracticeSubTab = 'editor' | 'solution' | 'visualizer';

export const PracticeView: React.FC<PracticeViewProps> = ({
  problem,
  totalProblems,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmark,
  onNextDay,
  onPrevDay,
  fontSize
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PracticeSubTab>('editor');
  const [editableCode, setEditableCode] = useState<string>(problem.starterCode);
  const [testResult, setTestResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [solutionType, setSolutionType] = useState<'optimal' | 'brute'>('optimal');
  const [showHint, setShowHint] = useState(false);

  // Sync starter code when problem changes
  useEffect(() => {
    setEditableCode(problem.starterCode);
    setTestResult(null);
    setShowHint(false);
  }, [problem.id]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    setEditableCode(problem.starterCode);
    setTestResult(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executePythonCode(editableCode, problem.id, problem.testCases);
      setTestResult(res);
      setIsRunning(false);
      if (res.success) {
        if (!isSolved) {
          onToggleSolved(problem.id);
        }
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 250);
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-300 border border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto pb-24 animate-in fade-in duration-200">
      {/* Top Problem Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevDay}
              disabled={problem.day <= 1}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-xs text-slate-200">
              DAY {problem.day}
            </span>
            <button
              onClick={onNextDay}
              disabled={problem.day >= totalProblems}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getDifficultyBadge(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            <button
              onClick={() => onToggleBookmark(problem.id)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                isBookmarked ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {problem.title}
          </h2>
          <p className="text-xs text-[#818cf8] font-medium mt-0.5">
            Category: {problem.category}
          </p>
        </div>

        {/* Sub Navigation: Code Editor vs Solution vs Visualizer */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800/80">
          <button
            onClick={() => setActiveSubTab('editor')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'editor'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Sandbox</span>
          </button>

          <button
            onClick={() => setActiveSubTab('solution')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'solution'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Optimal Solution</span>
          </button>

          <button
            onClick={() => setActiveSubTab('visualizer')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'visualizer'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visualizer</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Interactive Code Editor & Test Runner */}
      {activeSubTab === 'editor' && (
        <div className="space-y-4">
          {/* Problem Statement Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-3 shadow-lg">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {problem.description}
            </p>

            {/* Examples */}
            <div className="space-y-2 pt-1">
              {problem.examples.slice(0, 2).map((ex, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1 font-mono text-xs">
                  <div className="text-[11px] font-bold text-[#818cf8]">Example {idx + 1}:</div>
                  <div><span className="text-slate-400">Input: </span><span className="text-slate-200">{ex.input}</span></div>
                  <div><span className="text-slate-400">Output: </span><span className="text-emerald-400 font-bold">{ex.output}</span></div>
                  {ex.explanation && (
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">{ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Constraints:</span>
                <ul className="space-y-0.5">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="text-[#818cf8]">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hint Accordion */}
          <div className="rounded-2xl bg-[#12161f] border border-slate-800/80 overflow-hidden">
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[#818cf8] hover:text-[#a5b4fc] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Need a hint? (Socratic Guidance)</span>
              </div>
              {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showHint && (() => {
              const primer = getPythonPrimerForProblem(problem);
              return (
                <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-300 space-y-3">
                  <p className="leading-relaxed">💡 {problem.optimalIntuition.slice(0, 220)}...</p>
                  
                  {/* Python Power-Up Snippet inside hint */}
                  <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/25 space-y-1.5 font-sans">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Python Power-Up: {primer.title}</span>
                    </div>
                    <pre className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      <code>{primer.pythonicSnippet}</code>
                    </pre>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Python Code Editor Card */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-[#12161f] border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-300 ml-1">solution.py (Python 3.12)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetCode}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                  title="Reset to starter boilerplate"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden xs:inline">Reset</span>
                </button>

                <button
                  onClick={() => handleCopyCode(editableCode)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px] hidden xs:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Editable Python Textarea */}
            <textarea
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              spellCheck={false}
              className="w-full h-64 sm:h-72 p-4 bg-transparent font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed outline-none resize-y selection:bg-indigo-600/40"
              placeholder="Write your Python 3 algorithm solution here..."
            />

            {/* Runner Action Footer */}
            <div className="p-3 bg-[#12161f] border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                {problem.testCases?.length || 2} Test Cases configured
              </span>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="w-full sm:w-auto py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{isRunning ? 'Running Python...' : 'Run Code & Tests'}</span>
              </button>
            </div>
          </div>

          {/* Test Results Output Display */}
          {testResult && (
            <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800 shadow-xl space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#818cf8]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Execution Output</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    testResult.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {testResult.success ? '✓ All Tests Passed' : '✗ Failed Test Case'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    ⏱️ {testResult.executionTimeMs}ms
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 font-mono text-xs text-slate-300 whitespace-pre-wrap">
                {testResult.output}
              </div>

              {testResult.testCaseResults && (
                <div className="space-y-1.5 pt-1">
                  {testResult.testCaseResults.map((tc, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between ${
                        tc.passed
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{tc.passed ? '✓' : '✗'} Case {idx + 1}:</span>
                        <span className="text-slate-400 truncate max-w-[180px]">{tc.input}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Exp: {tc.expected}</span>
                        <span className="font-bold">Got: {tc.actual}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: Optimal Solution & Brute Force */}
      {activeSubTab === 'solution' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSolutionType('optimal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                solutionType === 'optimal'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              ⚡ Optimal Python Solution ({problem.complexity.time})
            </button>
            {problem.bruteForceCode && (
              <button
                onClick={() => setSolutionType('brute')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  solutionType === 'brute'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                🐢 Brute Force Comparison
              </button>
            )}
          </div>

          <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-[#12161f] border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300">
                {solutionType === 'optimal' ? 'optimal_solution.py' : 'brute_force.py'}
              </span>
              <button
                onClick={() => handleCopyCode(solutionType === 'optimal' ? problem.solutionCode : problem.bruteForceCode || '')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{solutionType === 'optimal' ? problem.solutionCode : problem.bruteForceCode}</code>
            </pre>
          </div>

          {/* Complexity Explanation Card */}
          <div className="p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#818cf8]">
              Complexity Proof & Trade-offs
            </h4>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-sans text-[10px] uppercase font-bold">Time Complexity:</span>
                <p className="text-emerald-400 font-bold text-sm mt-0.5">{problem.complexity.time}</p>
                <p className="text-slate-300 font-sans text-xs mt-1">{problem.complexity.timeExplanation}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-sans text-[10px] uppercase font-bold">Space Complexity:</span>
                <p className="text-purple-400 font-bold text-sm mt-0.5">{problem.complexity.space}</p>
                <p className="text-slate-300 font-sans text-xs mt-1">{problem.complexity.spaceExplanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Visualizer */}
      {activeSubTab === 'visualizer' && (
        <AlgorithmVisualizer problem={problem} />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Lightbulb, 
  AlertTriangle, 
  Terminal, 
  FileText,
  RotateCcw,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Problem, Difficulty } from '../types/dsa';
import { executePythonCode, ExecutionResult } from '../utils/pythonRunner';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import confetti from 'canvas-confetti';

interface ProblemDetailModalProps {
  problem: Problem | null;
  onClose: () => void;
  isSolved: boolean;
  isBookmarked: boolean;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  userNote: string;
  onSaveNote: (note: string) => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  onAskAIMentor: (question: string, problemTitle: string, problemCode: string) => void;
}

type TabType = 'problem' | 'intuition' | 'solution' | 'runner' | 'visualizer' | 'notes';

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  onClose,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmark,
  userNote,
  onSaveNote,
  fontSize,
  onAskAIMentor
}) => {
  if (!problem) return null;

  const [activeTab, setActiveTab] = useState<TabType>('problem');
  const [copied, setCopied] = useState(false);
  const [solutionType, setSolutionType] = useState<'optimal' | 'brute'>('optimal');
  const [editableCode, setEditableCode] = useState<string>(problem.starterCode);
  const [testResult, setTestResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [noteContent, setNoteContent] = useState<string>(userNote);

  // Font scale class helper
  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-xs leading-relaxed';
      case 'large': return 'text-base leading-relaxed';
      case 'xlarge': return 'text-lg leading-loose';
      case 'normal':
      default:
        return 'text-sm leading-relaxed';
    }
  };

  const getCodeTextSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-[11px]';
      case 'large': return 'text-[14px]';
      case 'xlarge': return 'text-[16px]';
      case 'normal':
      default:
        return 'text-xs';
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executePythonCode(editableCode, problem.id, problem.testCases);
      setTestResult(res);
      setIsRunning(false);
      if (res.success) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 200);
  };

  const handleLoadOptimalCode = () => {
    setEditableCode(problem.solutionCode);
    setTestResult(null);
  };

  const handleResetStarter = () => {
    setEditableCode(problem.starterCode);
    setTestResult(null);
  };

  const handleToggleSolvedWithCheer = () => {
    onToggleSolved(problem.id);
    if (!isSolved) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.3 }
      });
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'problem', label: 'Problem', icon: BookOpen },
    { id: 'intuition', label: 'Intuition & Steps', icon: Lightbulb },
    { id: 'solution', label: 'Python Solution', icon: Code2 },
    { id: 'runner', label: 'Run & Test', icon: Play },
    { id: 'visualizer', label: 'Visualizer', icon: Layers },
    { id: 'notes', label: 'My Notes', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Header Bar with Safe-Area Top Padding */}
      <div className="w-full glass-panel border-b border-slate-800 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 px-3 sm:px-6 flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title="Back to problems"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Day {problem.day}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
                {problem.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{problem.category}</span>
              <span>•</span>
              <span className={problem.difficulty === 'Easy' ? 'text-emerald-400' : problem.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Solved Toggle */}
          <button
            onClick={handleToggleSolvedWithCheer}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
              isSolved 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isSolved ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{isSolved ? 'Solved' : 'Mark Solved'}</span>
          </button>

          {/* Bookmark Toggle */}
          <button
            onClick={() => onToggleBookmark(problem.id)}
            className={`p-2 rounded-xl transition-all active:scale-95 ${
              isBookmarked ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* LeetCode External Link */}
          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 transition-colors"
              title="Open on LeetCode"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="w-full bg-slate-950 border-b border-slate-800/80 px-2 sm:px-6 overflow-x-auto no-scrollbar flex-shrink-0">
        <div className="flex items-center gap-1 py-1 min-w-max">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all select-none cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-emerald-300 border border-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-24 ${getTextSizeClass()}`}>
        {/* TAB 1: Problem Statement */}
        {activeTab === 'problem' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Complexity Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Time Complexity</span>
                <p className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{problem.complexity.time}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Space Complexity</span>
                <p className="font-mono font-bold text-cyan-400 text-sm mt-0.5">{problem.complexity.space}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Difficulty</span>
                <p className="font-bold text-sm mt-0.5 text-slate-200">{problem.difficulty}</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
                <p className="font-bold text-sm mt-0.5 text-slate-200 truncate">{problem.category}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem Description</h3>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 leading-relaxed font-sans">
                {problem.description}
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h3>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-1.5 font-sans">
                    <span className="font-bold text-emerald-400">Example {idx + 1}</span>
                    <button
                      onClick={() => handleCopyCode(ex.input)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy Input
                    </button>
                  </div>
                  <div>
                    <span className="text-slate-500 select-none">Input: </span>
                    <span className="text-emerald-300 font-semibold">{ex.input}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 select-none">Output: </span>
                    <span className="text-cyan-300 font-semibold">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-xs text-slate-400 font-sans pt-1 border-t border-slate-800/60">
                      <span className="text-slate-500 font-semibold">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Constraints</h3>
                <ul className="space-y-1.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="font-mono text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ask AI Mentor Quick Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 flex-wrap">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Need an interview hint or intuition breakdown?</span>
                </p>
                <p className="text-[11px] text-slate-400">Ask the Gemini AI DSA Mentor for a Socratic hint</p>
              </div>
              <button
                onClick={() => onAskAIMentor(`Can you give me a gentle hint for ${problem.title} without spoiling the complete solution?`, problem.title, problem.starterCode)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md flex items-center gap-1 cursor-pointer"
              >
                <span>Ask AI Mentor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Intuition & Step-by-Step Logic */}
        {activeTab === 'intuition' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Core Intuition Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Core Algorithm Intuition</span>
              </h3>
              <p className="text-slate-200 leading-relaxed font-medium">
                {problem.optimalIntuition}
              </p>
            </div>

            {/* Step-by-step logic breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step-by-Step Execution Plan</h3>
              <div className="space-y-2">
                {problem.stepByStepLogic.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Complexity Proof */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Time Complexity</span>
                  <span className="font-mono font-bold text-emerald-400">{problem.complexity.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{problem.complexity.timeExplanation}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Space Complexity</span>
                  <span className="font-mono font-bold text-cyan-400">{problem.complexity.space}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{problem.complexity.spaceExplanation}</p>
              </div>
            </div>

            {/* Common Pitfalls & Traps */}
            {problem.commonPitfalls && problem.commonPitfalls.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Common Interview Traps & Pitfalls</span>
                </h3>
                <ul className="space-y-1.5 pl-1">
                  {problem.commonPitfalls.map((pitfall, idx) => (
                    <li key={idx} className="text-xs text-rose-200/90 leading-relaxed flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pythonic Tips */}
            {problem.pythonicTips && problem.pythonicTips.length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  🐍 <span>Pythonic Tips & Idioms</span>
                </h3>
                <ul className="space-y-1.5 pl-1">
                  {problem.pythonicTips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Python Solution Code */}
        {activeTab === 'solution' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setSolutionType('optimal')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    solutionType === 'optimal' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Optimal Solution ({problem.complexity.time})
                </button>
                {problem.bruteForceCode && (
                  <button
                    onClick={() => setSolutionType('brute')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      solutionType === 'brute' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Brute Force Approach
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(solutionType === 'optimal' ? problem.solutionCode : (problem.bruteForceCode || ''))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={() => {
                    setEditableCode(problem.solutionCode);
                    setActiveTab('runner');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test in Runner</span>
                </button>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>solution.py</span>
                <span>Python 3</span>
              </div>
              <pre className={`p-4 font-mono text-emerald-300 overflow-x-auto py-code ${getCodeTextSizeClass()}`}>
                <code>{solutionType === 'optimal' ? problem.solutionCode : (problem.bruteForceCode || '# No brute force code available')}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: Code Runner & Interactive Sandbox */}
        {activeTab === 'runner' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Python 3 Code Sandbox</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadOptimalCode}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Load Solution
                </button>
                <button
                  onClick={handleResetStarter}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
                </button>
              </div>
            </div>

            {/* Editable Python Code Area */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
              <textarea
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                rows={12}
                spellCheck={false}
                className={`w-full p-4 font-mono text-slate-100 bg-transparent outline-none resize-y ${getCodeTextSizeClass()}`}
                placeholder="Write your Python 3 code here..."
              />
            </div>

            {/* Test Results Output */}
            {testResult && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className={`p-4 rounded-2xl border ${
                  testResult.success 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                    : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">
                      {testResult.success ? '🎉 All Test Cases Passed!' : '⚠️ Test Case Failures'}
                    </span>
                    <span className="font-mono text-xs">
                      {testResult.totalPassed} / {testResult.totalTests} Passed ({testResult.executionTimeMs}ms)
                    </span>
                  </div>

                  <div className="space-y-2">
                    {testResult.testCaseResults.map((tc, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-sans font-bold">Test Case {i + 1}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tc.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {tc.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                        <div className="text-slate-300">Input: <span className="text-emerald-300">{tc.input}</span></div>
                        <div className="text-slate-300">Expected: <span className="text-cyan-300">{tc.expected}</span></div>
                        <div className="text-slate-300">Actual: <span className={tc.passed ? 'text-emerald-300' : 'text-rose-300'}>{tc.actual}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Algorithm Visualizer */}
        {activeTab === 'visualizer' && (
          <div className="max-w-4xl mx-auto">
            <AlgorithmVisualizer problem={problem} />
          </div>
        )}

        {/* TAB 6: Personal Notes */}
        {activeTab === 'notes' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>My Personal Study Notes & Key Takeaways</span>
              </h3>
            </div>
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
              <textarea
                value={noteContent}
                onChange={(e) => {
                  setNoteContent(e.target.value);
                  onSaveNote(e.target.value);
                }}
                rows={10}
                placeholder="Write your personal takeaways, edge cases, tricky moments or reminder for revision..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none resize-y text-sm leading-relaxed"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              * Notes are saved locally in your browser storage automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

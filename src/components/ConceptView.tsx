import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Sparkles, 
  ExternalLink,
  Flame,
  AlertTriangle,
  Play,
  Square,
  Volume2,
  VolumeX,
  Share2,
  Target,
  Info,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap
} from 'lucide-react';
import { Problem } from '../types/dsa';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { ActiveRecallQuizModal } from './ActiveRecallQuizModal';
import { PatternMatcherModal } from './PatternMatcherModal';
import { JargonDecoderModal } from './JargonDecoderModal';
import { getPatternAnalysisForProblem } from '../utils/problemPatterns';
import { getConceptGuideForProblem } from '../utils/jargonAnalogies';
import { getPythonPrimerForProblem } from '../utils/pythonFoundations';
import confetti from 'canvas-confetti';

interface ConceptViewProps {
  problem: Problem;
  totalProblems: number;
  isSolved: boolean;
  isBookmarked: boolean;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onNextDay: () => void;
  onPrevDay: () => void;
  onStartChallenge: () => void;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  theme?: 'dark' | 'light' | 'midnight';
}

export const ConceptView: React.FC<ConceptViewProps> = ({
  problem,
  totalProblems,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmark,
  onNextDay,
  onPrevDay,
  onStartChallenge,
  fontSize,
  theme = 'dark'
}) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPatternMatcherOpen, setIsPatternMatcherOpen] = useState(false);
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [expandedJargonKey, setExpandedJargonKey] = useState<string | null>(null);

  const conceptGuide = getConceptGuideForProblem(problem);
  const pythonPrimer = getPythonPrimerForProblem(problem);

  // Stop speech when problem changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [problem.id]);

  const toggleSpeechReading = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `Day ${problem.day}. ${problem.title}. Topic: ${problem.category}. Core Algorithmic Concept: ${problem.optimalIntuition}. Time complexity is ${problem.complexity.time}. Space complexity is ${problem.complexity.space}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const getPhaseName = (day: number) => {
    if (day <= 15) return 'PHASE 1: BUILD THE FOUNDATION';
    if (day <= 30) return 'PHASE 2: CORE PATTERNS & SEARCH';
    if (day <= 45) return 'PHASE 3: LINKED STRUCTURES & TREES';
    if (day <= 60) return 'PHASE 4: GRAPHS & BACKTRACKING';
    return 'PHASE 5: DYNAMIC PROGRAMMING & ADVANCED';
  };

  const handleSolvedClick = () => {
    onToggleSolved(problem.id);
    if (!isSolved) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-24 animate-in fade-in duration-200">
      {/* Top Header Card Container */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-2xl space-y-5">
        {/* Phase and Day Badge Row */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-full bg-[#201d47] border border-[#4338ca]/50 text-[#a5b4fc] text-[11px] font-bold tracking-wider shadow-inner">
            DAY {problem.day} OF {totalProblems}
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[#181f2a] border border-slate-700/60 text-slate-300 text-[11px] font-bold tracking-wide">
            {getPhaseName(problem.day)}
          </div>
        </div>

        {/* Stepper & Solved/Bookmark/Audio Actions Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
          {/* Day Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevDay}
              disabled={problem.day <= 1}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 active:scale-95 transition-all cursor-pointer shadow-sm"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-xs text-slate-200 px-1 tracking-wider">
              DAY {problem.day}
            </span>
            <button
              onClick={onNextDay}
              disabled={problem.day >= totalProblems}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 active:scale-95 transition-all cursor-pointer shadow-sm"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons: Read Aloud (TTS), Solved, Bookmark */}
          <div className="flex items-center gap-2">
            {/* Audio narration TTS */}
            <button
              onClick={toggleSpeechReading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isSpeaking
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 animate-pulse'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Read Concept Aloud"
            >
              {isSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Listen</span>
                </>
              )}
            </button>

            <button
              onClick={handleSolvedClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isSolved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {isSolved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
              <span>{isSolved ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(problem.id)}
              className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Bookmark for revision"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Big Title & Subtitle */}
        <div className="space-y-1.5 pt-1">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {problem.title}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#818cf8]">
            Topic: <span className="text-[#a5b4fc]">{problem.category}</span>
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={onStartChallenge}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#5356e3] hover:bg-[#5437F3] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-white" />
            <span className="text-white">Start Challenge ({problem.difficulty})</span>
            <ArrowRight className="w-4 h-4 ml-0.5 text-white" />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="py-2.5 px-3 rounded-2xl bg-[#1a202c] border border-slate-700/80 hover:bg-[#222a3a] text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#818cf8]" />
              <span>Active Recall Quiz</span>
            </button>

            <button
              onClick={() => setIsPatternMatcherOpen(true)}
              className="py-2.5 px-3 rounded-2xl bg-[#1a202c] border border-indigo-500/40 hover:bg-[#222a3a] text-indigo-300 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Pattern Drill</span>
            </button>

            <button
              onClick={() => setShowVisualizer(!showVisualizer)}
              className={`col-span-2 sm:col-span-1 py-2.5 px-3 rounded-2xl border font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer ${
                showVisualizer
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-200'
                  : 'bg-[#1a202c] border-slate-700/80 hover:bg-[#222a3a] text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showVisualizer ? 'Hide Visualizer' : 'Step Visualizer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visualizer Drawer if toggled */}
      {showVisualizer && (
        <div className="animate-in fade-in zoom-in-95 duration-150">
          <AlgorithmVisualizer problem={problem} />
        </div>
      )}

      {/* Card 0: INTUITION FIRST: REAL-WORLD DAILY LIFE ANALOGY & PLAIN ENGLISH */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            <span className="text-base">{conceptGuide.realLifeAnalogy.icon}</span>
            <span>Intuition First: Real-Life Daily Analogy</span>
          </div>
          <button
            onClick={() => setIsJargonModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>DSA Jargon Decoder</span>
          </button>
        </div>

        {/* Real life story container */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
            <span>{conceptGuide.realLifeAnalogy.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {conceptGuide.realLifeAnalogy.story}
          </p>
          <div className="pt-2 border-t border-amber-500/20 text-[11px] sm:text-xs font-semibold text-amber-300 flex items-start gap-1.5">
            <span className="text-amber-400 mt-0.5">👉</span>
            <span><strong>Core Takeaway:</strong> {conceptGuide.realLifeAnalogy.takeaway}</span>
          </div>
        </div>

        {/* Mental Model: The 1 Question to Ask Yourself */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-300">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mental Model: The 1 Question To Ask Yourself</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white italic">
            "{conceptGuide.mentalModelQuestion}"
          </p>
        </div>

        {/* Interactive Jargon Demystifier Pills */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
            <span>Confused by technical words in this topic?</span>
            <span className="text-[10px] text-slate-400 font-normal">Tap to demystify</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {conceptGuide.jargonBreakdown.map((jargon, idx) => {
              const isExpanded = expandedJargonKey === `${problem.id}-${idx}`;
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isExpanded 
                      ? 'bg-slate-900 border-indigo-500/50 shadow-md' 
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setExpandedJargonKey(isExpanded ? null : `${problem.id}-${idx}`)}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-indigo-400">❓</span>
                      <span>{jargon.term}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-2 text-[11px] leading-relaxed animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold text-indigo-300">Plain English: </span>
                        <span className="text-slate-300">{jargon.plainEnglish}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                        <span className="font-bold text-amber-300">Daily Life: </span>
                        <span>{jargon.realLifeAnalogy}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card: ZERO-TO-HERO PYTHON PRIMER & UNDER THE HOOD */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs tracking-wider uppercase">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Python Under The Hood & Data Structure Internals</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            {pythonPrimer.badge}
          </span>
        </div>

        {/* Title & Core Mental Model */}
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{pythonPrimer.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {pythonPrimer.underTheHood}
          </p>
        </div>

        {/* Code Snippet */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden">
          <div className="px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="text-indigo-300 font-bold">Pythonic Idiom vs Anti-Pattern</span>
            <span className="text-[10px] text-slate-500">Python 3.11+</span>
          </div>
          <pre className="p-3.5 text-[11px] sm:text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
            <code>{pythonPrimer.pythonicSnippet}</code>
          </pre>
        </div>

        {/* Two Mini Takeaway Cards: Why it matters in interviews & Common beginner trap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/25 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interview Impact</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {pythonPrimer.whyItMattersInInterviews}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/25 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Common Beginner Mistake</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {pythonPrimer.commonMistake}
            </p>
          </div>
        </div>
      </div>

      {/* Card 1: CORE ALGORITHMIC CONCEPT & INVARIANTS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-3.5">
        <div className="flex items-center gap-2 text-[#818cf8] font-bold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Core Algorithmic Concept & Invariants</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          {problem.optimalIntuition}
        </p>

        {/* Complexity Summary Pill */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Time Complexity</span>
            <div className="font-mono text-xs font-bold text-emerald-400 mt-0.5">{problem.complexity.time}</div>
            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{problem.complexity.timeExplanation}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Space Complexity</span>
            <div className="font-mono text-xs font-bold text-purple-400 mt-0.5">{problem.complexity.space}</div>
            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{problem.complexity.spaceExplanation}</div>
          </div>
        </div>
      </div>

      {/* Card 2: PYTHON PRO TIPS & SHORTCUTS */}
      {problem.pythonicTips && problem.pythonicTips.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-3.5">
          <div className="flex items-center gap-2 text-[#818cf8] font-bold text-xs tracking-wider uppercase">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Python Pro Tips & Shortcuts</span>
          </div>

          <ul className="space-y-2.5">
            {problem.pythonicTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-bold mt-0.5">🐍</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Card 3: STEP-BY-STEP LOGIC BREAKDOWN */}
      {problem.stepByStepLogic && problem.stepByStepLogic.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-3.5">
          <div className="flex items-center gap-2 text-[#818cf8] font-bold text-xs tracking-wider uppercase">
            <span>⚡</span>
            <span>Step-by-Step Logic Breakdown</span>
          </div>

          <ol className="space-y-2">
            {problem.stepByStepLogic.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-[#201d47] text-[#a5b4fc] text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#4338ca]/40">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Card: WHY THIS PATTERN FITS (AND WHY OTHER PATTERNS DON'T) */}
      {(() => {
        const analysis = getPatternAnalysisForProblem(problem);
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs tracking-wider uppercase">
                <Target className="w-4 h-4 text-indigo-400" />
                <span>Algorithm Match: Why This Pattern & Why Others Don't</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Topic: {problem.category}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Optimal Tool */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{analysis.bestToolTitle}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {analysis.bestToolWhy}
                </p>
              </div>

              {/* Alternative or Conditional Tool */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <span>⚠️</span>
                  <span>{analysis.alternativeTitle}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {analysis.alternativeWhy}
                </p>
              </div>

              {/* Wrong Tool 1 */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <span>❌</span>
                  <span>{analysis.wrongTool1Title}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {analysis.wrongTool1Why}
                </p>
              </div>

              {/* Wrong Tool 2 */}
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <span>❌</span>
                  <span>{analysis.wrongTool2Title}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {analysis.wrongTool2Why}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Card 4: COMMON INTERVIEW PITFALLS & REAL COMPANIES */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
        {problem.commonPitfalls && problem.commonPitfalls.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Common Pitfalls to Avoid</span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {problem.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-bold">Frequently Asked At:</span>
            {problem.companies.map((comp) => (
              <span key={comp} className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 font-semibold text-[11px] border border-slate-800">
                {comp}
              </span>
            ))}
          </div>

          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>LeetCode #{problem.leetcodeNumber || problem.day}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Active Recall Quiz Modal */}
      <ActiveRecallQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        problem={problem}
        theme={theme}
      />

      {/* Pattern Matcher Drill Modal */}
      <PatternMatcherModal
        isOpen={isPatternMatcherOpen}
        onClose={() => setIsPatternMatcherOpen(false)}
        problem={problem}
        theme={theme}
      />

      {/* Jargon Decoder Modal */}
      <JargonDecoderModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};

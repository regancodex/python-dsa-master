import React, { useState } from 'react';
import { 
  X, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Problem } from '../types/dsa';
import { getPatternAnalysisForProblem } from '../utils/problemPatterns';
import confetti from 'canvas-confetti';

interface PatternMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  theme?: 'dark' | 'light' | 'midnight';
}

export const PatternMatcherModal: React.FC<PatternMatcherModalProps> = ({
  isOpen,
  onClose,
  problem,
  theme = 'dark'
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const analysis = getPatternAnalysisForProblem(problem);

  // Derive multiple choice options
  const options = [
    {
      id: 'optimal',
      label: analysis.bestToolTitle.replace('⭐ Best Tool: ', ''),
      isCorrect: true,
      explanation: analysis.bestToolWhy,
      tag: 'Optimal Strategy'
    },
    {
      id: 'alt',
      label: analysis.alternativeTitle.replace('⚠️ ', ''),
      isCorrect: false,
      explanation: analysis.alternativeWhy,
      tag: 'Sub-Optimal / Conditional'
    },
    {
      id: 'wrong1',
      label: analysis.wrongTool1Title.replace('❌ ', ''),
      isCorrect: false,
      explanation: analysis.wrongTool1Why,
      tag: 'Incorrect Approach'
    },
    {
      id: 'wrong2',
      label: analysis.wrongTool2Title.replace('❌ ', ''),
      isCorrect: false,
      explanation: analysis.wrongTool2Why,
      tag: 'Inefficient / Fails'
    }
  ];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (hasSubmitted) return;
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setHasSubmitted(true);
    if (selectedId === 'optimal') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedId(null);
    setHasSubmitted(false);
  };

  const selectedOption = options.find((o) => o.id === selectedId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className={`w-full max-w-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-all ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#0d1117] border-slate-800 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between flex-shrink-0 ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/80 bg-slate-900/40'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isLight
                ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
            }`}>
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Pattern Matcher Drill</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isLight ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  Day {problem.day}
                </span>
              </h3>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Identify the correct data structure & pattern under interview pressure
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          {/* Question scenario */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isLight
              ? 'bg-indigo-50/70 border-indigo-200/90 text-slate-900'
              : 'bg-slate-900/90 border-slate-800 text-white'
          }`}>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
              isLight ? 'text-indigo-700' : 'text-indigo-400'
            }`}>
              Problem Scenario: {problem.title}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}>
              {problem.description.slice(0, 180)}...
            </p>
            <div className={`text-xs font-bold pt-1 ${
              isLight ? 'text-indigo-900' : 'text-indigo-300'
            }`}>
              Which approach gives optimal time & space complexity?
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {options.map((option) => {
              const isSelected = selectedId === option.id;
              let optionStyle = isLight
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200';

              if (isSelected && !hasSubmitted) {
                optionStyle = isLight
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/20'
                  : 'bg-indigo-500/20 border-indigo-500 text-white ring-2 ring-indigo-500/40';
              } else if (hasSubmitted) {
                if (option.isCorrect) {
                  optionStyle = isLight
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = isLight
                    ? 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'bg-rose-500/20 border-rose-500 text-rose-300';
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none space-y-1.5 ${optionStyle}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                      <span>{option.label}</span>
                    </span>
                    {hasSubmitted && option.isCorrect && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/30 text-emerald-300'
                      }`}>
                        Optimal
                      </span>
                    )}
                  </div>

                  {hasSubmitted && (
                    <p className={`text-xs leading-relaxed pt-1 border-t font-medium ${
                      isLight
                        ? option.isCorrect ? 'border-emerald-200 text-emerald-900' : 'border-slate-200 text-slate-600'
                        : option.isCorrect ? 'border-emerald-500/30 text-emerald-200' : 'border-slate-800 text-slate-400'
                    }`}>
                      {option.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3">
            {hasSubmitted ? (
              <button
                onClick={handleReset}
                className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!selectedId}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Confirm Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className={`py-3 px-5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

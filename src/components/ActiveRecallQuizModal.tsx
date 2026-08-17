import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  CheckCircle2, 
  BrainCircuit, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Award,
  HelpCircle
} from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { Problem } from '../types/dsa';
import confetti from 'canvas-confetti';

interface ActiveRecallQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  theme?: 'dark' | 'light' | 'midnight';
}

export const ActiveRecallQuizModal: React.FC<ActiveRecallQuizModalProps> = ({
  isOpen,
  onClose,
  problem,
  theme = 'dark'
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  // Filter flashcards relevant to this problem's category or day
  const relevantCards = FLASHCARDS_DATA.filter(
    (f) => f.category.toLowerCase().includes(problem.category.toLowerCase()) ||
           problem.tags.some(t => f.topic.toLowerCase().includes(t.toLowerCase()))
  );

  const displayCards = relevantCards.length > 0 ? relevantCards : FLASHCARDS_DATA.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentCard = displayCards[currentIndex] || displayCards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % displayCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);
  };

  const handleMastered = () => {
    if (!masteredIds.includes(currentCard.id)) {
      setMasteredIds([...masteredIds, currentCard.id]);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    handleNext();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className={`w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden border transition-all ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          : 'bg-[#0d1117] border-slate-800 text-white'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between flex-shrink-0 ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/80 bg-slate-900/40'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isLight
                ? 'bg-purple-100 text-purple-700 border-purple-200'
                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
            }`}>
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Active Recall Quiz</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isLight ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  Day {problem.day}
                </span>
              </h3>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Test your mental model on {problem.category}
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
        <div className="p-4 sm:p-6 space-y-4">
          <div className={`flex items-center justify-between text-xs font-semibold ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            <span className={isLight ? 'text-purple-700' : 'text-purple-400'}>{currentCard.topic}</span>
            <span>Card {currentIndex + 1} of {displayCards.length}</span>
          </div>

          {/* Clean Interactive Flashcard (No black background in Light Mode) */}
          <div
            onClick={handleFlip}
            className={`min-h-[260px] p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none active:scale-[0.99] ${
              isLight
                ? 'bg-purple-50/70 border-purple-200/90 hover:border-purple-400 shadow-sm hover:shadow-md'
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 hover:border-purple-500/40 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                isLight
                  ? 'bg-white border-purple-200 text-purple-900 shadow-2xs'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                {currentCard.category}
              </span>
              <span className={`text-xs flex items-center gap-1 font-medium ${
                isLight ? 'text-purple-600' : 'text-slate-500'
              }`}>
                <RotateCw className="w-3.5 h-3.5" /> Tap to Flip
              </span>
            </div>

            <div className="my-auto py-3 space-y-2.5">
              {!isFlipped ? (
                <div className="space-y-2 text-center">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                    isLight ? 'text-purple-700' : 'text-purple-400'
                  }`}>
                    Question
                  </span>
                  <p className={`text-sm sm:text-base font-bold leading-relaxed ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {currentCard.question}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    Answer & Explanation
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {currentCard.answer}
                  </p>
                  {currentCard.codeSnippet && (
                    <pre className={`p-2.5 rounded-xl border text-xs font-mono overflow-x-auto ${
                      isLight
                        ? 'bg-white border-purple-200 text-emerald-800 shadow-2xs'
                        : 'bg-slate-950 border-slate-800 text-emerald-300'
                    }`}>
                      <code>{currentCard.codeSnippet}</code>
                    </pre>
                  )}
                  <div className={`p-2.5 rounded-xl border text-[11px] font-semibold ${
                    isLight
                      ? 'bg-purple-100/80 border-purple-300 text-purple-950'
                      : 'bg-purple-500/10 border-purple-500/20 text-purple-300'
                  }`}>
                    💡 {currentCard.keyTakeaway}
                  </div>
                </div>
              )}
            </div>

            <div className={`text-center text-[10px] font-medium ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {isFlipped ? 'Answer Revealed' : 'Think of your solution before flipping!'}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handlePrev}
              className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <button
              onClick={handleMastered}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mastered</span>
            </button>

            <button
              onClick={handleNext}
              className="py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-purple-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-purple-600/20"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Award
} from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import confetti from 'canvas-confetti';

interface FlashcardsViewProps {
  theme?: 'dark' | 'light' | 'midnight';
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(FLASHCARDS_DATA.map((f) => f.category)))];

  const filteredCards = FLASHCARDS_DATA.filter((f) => {
    if (selectedCategory === 'All') return true;
    return f.category === selectedCategory;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
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

  const masteryPercent = Math.round((masteredIds.length / FLASHCARDS_DATA.length) * 100);

  return (
    <div className="space-y-4 pb-28">
      {/* Header Banner */}
      <div className={`p-4 sm:p-5 rounded-3xl border space-y-3 transition-all ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl border ${
              isLight ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
            }`}>
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Active Recall Flashcards</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Master Big-O complexities and pattern triggers.</p>
            </div>
          </div>

          <div className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border ${
            isLight
              ? 'bg-purple-50 text-purple-900 border-purple-200'
              : 'text-purple-300 bg-purple-500/10 border-purple-500/20'
          }`}>
            <Award className="w-4 h-4 text-purple-500" />
            <span>{masteredIds.length}/{FLASHCARDS_DATA.length} Mastered ({masteryPercent}%)</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : isLight
                  ? 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Component */}
      {filteredCards.length > 0 && currentCard && (
        <div className="space-y-4 max-w-xl mx-auto">
          {/* Card Meta */}
          <div className={`flex items-center justify-between text-xs font-semibold px-1 ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            <span className={isLight ? 'text-purple-700 font-bold' : 'font-bold text-purple-400'}>{currentCard.topic}</span>
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
          </div>

          {/* Flip Card Container */}
          <div 
            onClick={handleFlip}
            className={`min-h-[280px] sm:min-h-[320px] p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between select-none active:scale-[0.99] relative overflow-hidden ${
              isLight
                ? 'bg-purple-50/70 border-purple-200/90 hover:border-purple-400 shadow-md'
                : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800 hover:border-purple-500/40 shadow-2xl'
            }`}
          >
            {/* Top pill */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                isLight
                  ? 'bg-white border-purple-200 text-purple-900 shadow-2xs'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                {currentCard.category}
              </span>
              <span className={`text-xs flex items-center gap-1 font-medium ${
                isLight ? 'text-purple-700' : 'text-slate-500'
              }`}>
                <RotateCw className="w-3.5 h-3.5" /> Tap to Flip
              </span>
            </div>

            {/* Front (Question) vs Back (Answer) */}
            <div className="my-auto py-4 space-y-3">
              {!isFlipped ? (
                <div className="space-y-2 text-center">
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${
                    isLight ? 'text-purple-700' : 'text-purple-400'
                  }`}>Question</span>
                  <h3 className={`text-base sm:text-lg font-extrabold leading-relaxed ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>Answer & Explanation</span>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {currentCard.answer}
                  </p>

                  {currentCard.codeSnippet && (
                    <pre className={`p-3 rounded-xl border text-xs font-mono overflow-x-auto ${
                      isLight
                        ? 'bg-white border-purple-200 text-emerald-800 shadow-2xs'
                        : 'bg-slate-950 border-slate-800 text-emerald-300'
                    }`}>
                      <code>{currentCard.codeSnippet}</code>
                    </pre>
                  )}

                  <div className={`p-2.5 rounded-xl border text-xs font-semibold ${
                    isLight
                      ? 'bg-purple-100 border-purple-300 text-purple-950'
                      : 'bg-purple-500/10 border-purple-500/20 text-purple-300'
                  }`}>
                    💡 Key Takeaway: {currentCard.keyTakeaway}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className={`text-center text-[11px] font-medium ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {isFlipped ? 'Answer Revealed' : 'Think of your answer before flipping!'}
            </div>
          </div>

          {/* Action Buttons: Prev, Mastered, Next */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={handlePrev}
              className={`py-2.5 rounded-xl border text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleMastered}
              className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mastered (+1)</span>
            </button>

            <button
              onClick={handleNext}
              className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

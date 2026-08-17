import React from 'react';
import { Flame, Trophy, Calendar, CheckCircle2, X, Sparkles } from 'lucide-react';
import { StreakData, getWeekDayActivity, getTodayDateString } from '../utils/streakUtils';
import confetti from 'canvas-confetti';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: StreakData;
  solvedTodayCount: number;
  theme?: 'dark' | 'light' | 'midnight';
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
  solvedTodayCount,
  theme = 'dark'
}) => {
  if (!isOpen) return null;

  const weekDays = getWeekDayActivity(streakData.activityDates);
  const todayStr = getTodayDateString();
  const practicedToday = streakData.lastActiveDate === todayStr;

  const triggerCelebration = () => {
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.6 }
    });
  };

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden transition-all animate-in zoom-in-95 duration-200 border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-xl'
            : 'bg-[#12161f] border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft background ambient glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-sm ${
              isLight 
                ? 'bg-amber-100/90 border-amber-200 text-amber-700' 
                : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}>
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
            </div>
            <div>
              <h2 className={`text-lg font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Daily Study Streak
              </h2>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Keep your algorithmic momentum alive
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isLight
                ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Streak Counter Card - Clean Soft Yellow / Amber (No dark gradient) */}
        <div className={`p-5 rounded-2xl border text-center space-y-2 relative transition-all ${
          isLight
            ? 'bg-amber-50/90 border-amber-200/90 shadow-sm'
            : 'bg-amber-500/10 border-amber-500/25'
        }`}>
          <div className="inline-flex items-center justify-center gap-1.5">
            <span className={`text-5xl font-black tracking-tight ${
              isLight ? 'text-amber-700' : 'text-amber-400'
            }`}>
              {streakData.currentStreak}
            </span>
            <span className={`text-2xl font-black ${
              isLight ? 'text-amber-800' : 'text-amber-300'
            }`}>
              Days
            </span>
          </div>

          <p className={`text-xs font-semibold ${
            isLight ? 'text-amber-900/80' : 'text-amber-200/90'
          }`}>
            {practicedToday 
              ? "🔥 You've practiced today! Your streak is secured."
              : "⏳ Solve at least 1 problem today to extend your streak!"}
          </p>

          <div className={`flex items-center justify-center gap-5 pt-3 mt-3 border-t text-xs font-medium ${
            isLight ? 'border-amber-200/70 text-slate-700' : 'border-amber-500/20 text-slate-300'
          }`}>
            <div className="flex items-center gap-1.5">
              <Trophy className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
              <span>Best: <strong>{streakData.longestStreak} days</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className={`w-4 h-4 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
              <span>Solved Today: <strong>{solvedTodayCount}</strong></span>
            </div>
          </div>
        </div>

        {/* 7-Day Activity Calendar Grid */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <Calendar className="w-3.5 h-3.5" />
              Last 7 Days Activity
            </span>
            <span className={`text-[11px] ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
              1 problem / day
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {weekDays.map((day, idx) => (
              <div 
                key={idx}
                className={`p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all ${
                  day.active
                    ? isLight
                      ? 'bg-amber-100/90 border-amber-300 text-amber-900 shadow-sm'
                      : 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                    : day.isToday
                    ? isLight
                      ? 'bg-slate-50 border-dashed border-indigo-400 text-indigo-700'
                      : 'bg-slate-900 border-dashed border-indigo-500/50 text-slate-300'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{day.dayName}</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  day.active
                    ? isLight
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-500 text-slate-950'
                    : isLight
                    ? 'bg-slate-200 text-slate-500'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {day.active ? (
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span className="text-[9px] font-bold">{day.dateStr.slice(-2)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={triggerCelebration}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-slate-950" />
            Celebrate Streak 🎉
          </button>
          <button
            onClick={onClose}
            className={`py-3 px-5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  BarChart3, 
  X, 
  Flame, 
  CheckCircle2, 
  Award, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Problem } from '../types/dsa';
import { CATEGORIES_LIST } from '../data/problemsData';

interface StatsProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  problems: Problem[];
  solvedIds: string[];
  bookmarkedIds: string[];
  streakCount: number;
  onExportProgress: () => void;
  onResetProgress: () => void;
  onSelectProblem?: (day: number) => void;
}

export const StatsProgressModal: React.FC<StatsProgressModalProps> = ({
  isOpen,
  onClose,
  problems,
  solvedIds,
  bookmarkedIds,
  streakCount,
  onExportProgress,
  onResetProgress,
  onSelectProblem
}) => {
  if (!isOpen) return null;

  const solvedSet = new Set(solvedIds);

  const easyTotal = problems.filter((p) => p.difficulty === 'Easy').length;
  const easySolved = problems.filter((p) => p.difficulty === 'Easy' && solvedSet.has(p.id)).length;

  const medTotal = problems.filter((p) => p.difficulty === 'Medium').length;
  const medSolved = problems.filter((p) => p.difficulty === 'Medium' && solvedSet.has(p.id)).length;

  const hardTotal = problems.filter((p) => p.difficulty === 'Hard').length;
  const hardSolved = problems.filter((p) => p.difficulty === 'Hard' && solvedSet.has(p.id)).length;

  const overallPercent = Math.round((solvedIds.length / problems.length) * 100);

  // Compute category mastery statistics for Weakness Analysis
  const categoryStats = CATEGORIES_LIST.map((cat) => {
    const catProblems = problems.filter((p) => p.category === cat);
    const solvedCount = catProblems.filter((p) => solvedSet.has(p.id)).length;
    const total = catProblems.length;
    const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
    const nextUnsolved = catProblems.find((p) => !solvedSet.has(p.id));
    return {
      category: cat,
      total,
      solved: solvedCount,
      pct,
      nextUnsolved
    };
  }).filter((stat) => stat.total > 0);

  // Identify top weakness (lowest completion percentage that still has problems remaining)
  const sortedWeakness = [...categoryStats].sort((a, b) => a.pct - b.pct);
  const topWeakness = sortedWeakness.find((w) => w.solved < w.total) || sortedWeakness[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Study Analytics & Mastery</h2>
              <p className="text-xs text-slate-400">Track your daily progress and curriculum stats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Total Solved</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                {solvedIds.length} <span className="text-xs text-slate-500">/ {problems.length}</span>
              </p>
              <div className="text-[10px] text-emerald-400 font-bold">{overallPercent}% Complete</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Daily Streak</span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-amber-300">
                {streakCount} <span className="text-xs text-slate-500">Days</span>
              </p>
              <div className="text-[10px] text-amber-400 font-bold">🔥 On Fire!</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Bookmarked</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-purple-300">
                {bookmarkedIds.length}
              </p>
              <div className="text-[10px] text-purple-400 font-bold">In Revision Queue</div>
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Difficulty Breakdown
            </h3>
            <div className="space-y-2.5">
              {/* Easy */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-400">🟢 Easy</span>
                  <span className="text-slate-300">{easySolved} / {easyTotal} ({easyTotal ? Math.round((easySolved/easyTotal)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-full rounded-full transition-all" 
                    style={{ width: `${easyTotal ? (easySolved/easyTotal)*100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-400">🟡 Medium</span>
                  <span className="text-slate-300">{medSolved} / {medTotal} ({medTotal ? Math.round((medSolved/medTotal)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all" 
                    style={{ width: `${medTotal ? (medSolved/medTotal)*100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-rose-400">🔴 Hard</span>
                  <span className="text-slate-300">{hardSolved} / {hardTotal} ({hardTotal ? Math.round((hardSolved/hardTotal)*100) : 0}%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-rose-400 h-full rounded-full transition-all" 
                    style={{ width: `${hardTotal ? (hardSolved/hardTotal)*100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category Progress & Weakness Heatmap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                <span>Topic Mastery & Weakness Heatmap</span>
              </h3>
              <span className="text-[10px] text-slate-400">Color mapped by confidence</span>
            </div>

            {/* Smart Recommendation Card */}
            {topWeakness && topWeakness.nextUnsolved && (
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs">🎯</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Recommended Next Focus</h4>
                      <p className="text-[11px] text-indigo-300">
                        Level up in <strong>{topWeakness.category}</strong> ({topWeakness.pct}% mastered)
                      </p>
                    </div>
                  </div>
                  {onSelectProblem && (
                    <button
                      onClick={() => {
                        onSelectProblem(topWeakness.nextUnsolved!.day);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Solve Day {topWeakness.nextUnsolved.day}
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 font-bold">Suggested Problem: </span>
                  <span className="text-white font-semibold">{topWeakness.nextUnsolved.title}</span>
                  <span className="text-slate-400 ml-1.5 font-mono text-[10px]">({topWeakness.nextUnsolved.difficulty})</span>
                </div>
              </div>
            )}

            {/* Heatmap Grid of Topics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categoryStats.map((stat) => {
                // Determine color code based on mastery %
                const isWeak = stat.pct < 40;
                const isMedium = stat.pct >= 40 && stat.pct < 80;
                const isMastered = stat.pct >= 80;

                const colorClass = isMastered 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : isMedium 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400';

                const barColor = isMastered ? 'bg-emerald-400' : isMedium ? 'bg-amber-400' : 'bg-rose-400';

                return (
                  <div key={stat.category} className={`p-2.5 rounded-xl border ${colorClass} bg-slate-950/70 space-y-1.5`}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200 truncate pr-2">{stat.category}</span>
                      <span className="font-mono">{stat.solved}/{stat.total} ({stat.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div className={`${barColor} h-full rounded-full transition-all`} style={{ width: `${stat.pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backup & Actions */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={onExportProgress}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Progress JSON</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your local progress?')) {
                  onResetProgress();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-950/80 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

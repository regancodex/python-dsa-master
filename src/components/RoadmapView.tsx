import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Flame,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Problem, Difficulty, CurriculumTrack } from '../types/dsa';
import { CATEGORIES_LIST } from '../data/problemsData';
import confetti from 'canvas-confetti';

interface RoadmapViewProps {
  problems: Problem[];
  currentDay: number;
  solvedIds: string[];
  bookmarkedIds: string[];
  onSelectProblem: (problem: Problem) => void;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  streakCount: number;
  currentTrack?: CurriculumTrack;
  onTrackChange?: (track: CurriculumTrack) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  problems,
  currentDay,
  solvedIds,
  bookmarkedIds,
  onSelectProblem,
  onToggleSolved,
  onToggleBookmark,
  streakCount,
  currentTrack = 'core30',
  onTrackChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');

  const solvedSet = new Set(solvedIds);
  const bookmarkedSet = new Set(bookmarkedIds);

  const getPhaseNumber = (day: number) => {
    if (currentTrack === 'core30') {
      if (day <= 6) return 1;
      if (day <= 12) return 2;
      if (day <= 18) return 3;
      if (day <= 24) return 4;
      return 5;
    } else {
      if (day <= 15) return 1;
      if (day <= 30) return 2;
      if (day <= 45) return 3;
      if (day <= 60) return 4;
      return 5;
    }
  };

  const getPhaseDetails = (phaseNum: number) => {
    switch (phaseNum) {
      case 1:
        return {
          title: 'Phase 1: Frequency & Fast Lookups',
          subtitle: 'Arrays, Hash Tables, Sets & Two Pointers',
          toolkit: 'Python dict, set, collections.Counter, defaultdict',
          goal: 'Replace O(N²) nested loops with O(1) hash lookups and O(N) linear scans.'
        };
      case 2:
        return {
          title: 'Phase 2: Sequential Traversal & Search',
          subtitle: 'Sliding Windows, Binary Search & Monotonic Stacks',
          toolkit: 'Pointers arithmetic, bisect, collections.deque',
          goal: 'Master contiguous subarrays, logarithmic bisection, and LIFO order invariant.'
        };
      case 3:
        return {
          title: 'Phase 3: Linked Structures & Hierarchies',
          subtitle: 'Linked Lists, Binary Trees & Priority Queues',
          toolkit: 'Dummy nodes, recursion call stack, heapq min-heap',
          goal: 'Navigate pointer graphs, DFS pre/in/post-order, and top-K stream processing.'
        };
      case 4:
        return {
          title: 'Phase 4: Search Spaces & Network Traversal',
          subtitle: 'Backtracking, DFS/BFS & Graph Topologies',
          toolkit: 'Adjacency lists, visited sets, state backtrack pruning',
          goal: 'Explore combinatorial states (choose/explore/unchoose) and cycle detection.'
        };
      case 5:
        return {
          title: 'Phase 5: Dynamic Programming & Interview Mastery',
          subtitle: '1D/2D Memoization, Tabulation & Greedy Strategy',
          toolkit: '@functools.cache, bottom-up 1D state arrays, intervals',
          goal: 'Break overlapping subproblems into O(1) state transitions and pass FAANG interviews.'
        };
      default:
        return {
          title: `Phase ${phaseNum}`,
          subtitle: 'Core Data Structures',
          toolkit: 'Python 3 Standard Library',
          goal: 'Build deep problem-solving intuition.'
        };
    }
  };

  const filteredProblems = problems.filter((p) => {
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    if (selectedPhase !== 'All') {
      const phaseNum = getPhaseNumber(p.day);
      if (String(phaseNum) !== selectedPhase) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.companies.some((c) => c.toLowerCase().includes(q)) ||
        String(p.day).includes(q)
      );
    }
    return true;
  });

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

  const handleSolvedClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleSolved(id);
    if (!solvedSet.has(id)) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleBookmark(id);
  };

  const overallPercent = Math.round((solvedIds.length / problems.length) * 100);

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-24 animate-in fade-in duration-200">
      {/* Roadmap Summary Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#12161f] border border-slate-800/80 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#818cf8] tracking-wider">
                Curriculum Progress
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[10px] font-bold border border-indigo-500/20">
                {currentTrack === 'core30' ? '⚡ Core 30 Fast-Track' : '🏆 Blind 75 Master'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
              {currentTrack === 'core30' ? '30-Day Intensive Sprint' : '75-Day Comprehensive Mastery'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Track Switcher Segmented Control */}
            {onTrackChange && (
              <div className="flex items-center p-1 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
                <button
                  onClick={() => onTrackChange('core30')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentTrack === 'core30'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="30 High-Yield Core Pattern Problems"
                >
                  ⚡ Core 30
                </button>
                <button
                  onClick={() => onTrackChange('blind75')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentTrack === 'blind75'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Full Blind 75 Standard Curriculum"
                >
                  🏆 Blind 75
                </button>
              </div>
            )}

            <div className="px-3 py-1.5 rounded-xl bg-[#201d47] border border-[#4338ca]/50 text-[#a5b4fc] text-xs font-mono font-bold whitespace-nowrap">
              {solvedIds.length}/{problems.length} ({overallPercent}%)
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>

        {/* Smart Next Up Recommendation Banner */}
        {(() => {
          // Find first unsolved problem in the roadmap sequence
          const nextUnsolved = problems.find((p) => !solvedSet.has(p.id)) || problems[0];
          return (
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 text-sm flex-shrink-0">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-300">Smart "Next Up" Focus</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getDifficultyBadge(nextUnsolved.difficulty)}`}>
                      {nextUnsolved.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Day {nextUnsolved.day}: <strong className="text-white font-bold">{nextUnsolved.title}</strong> · {nextUnsolved.category}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectProblem(nextUnsolved)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Jump to Day {nextUnsolved.day}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          );
        })()}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, topics, FAANG companies..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/60 dark:bg-slate-950 border border-slate-800/80 focus:border-indigo-500 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/60 dark:bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-slate-200 dark:hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}

          <div className="w-px h-5 bg-slate-800/60 mx-1 flex-shrink-0" />

          {['All', '1', '2', '3', '4', '5'].map((ph) => (
            <button
              key={ph}
              onClick={() => setSelectedPhase(ph)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedPhase === ph
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/60 dark:bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-slate-200 dark:hover:text-white'
              }`}
            >
              {ph === 'All' ? 'All Phases' : `Phase ${ph}`}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Phase Milestone Goal Card */}
      {selectedPhase !== 'All' && (() => {
        const phNum = Number(selectedPhase);
        const details = getPhaseDetails(phNum);
        const phaseProblems = problems.filter((p) => getPhaseNumber(p.day) === phNum);
        const phaseSolvedCount = phaseProblems.filter((p) => solvedSet.has(p.id)).length;
        const phasePercent = Math.round((phaseSolvedCount / (phaseProblems.length || 1)) * 100);

        return (
          <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-indigo-500/30 shadow-xl space-y-2.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎯</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white">{details.title}</h3>
                  <p className="text-[11px] font-semibold text-indigo-300">{details.subtitle}</p>
                </div>
              </div>
              <div className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Phase {phNum}: {phaseSolvedCount}/{phaseProblems.length} ({phasePercent}%)
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
              <strong>Milestone Goal: </strong>{details.goal}
            </p>

            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="text-slate-400 font-bold">Python Toolkit:</span>
              <span className="truncate">{details.toolkit}</span>
            </div>
          </div>
        );
      })()}

      {/* Problems List */}
      <div className="space-y-2.5">
        {filteredProblems.map((prob) => {
          const isCurrent = prob.day === currentDay;
          const isDone = solvedSet.has(prob.id);
          const isMarked = bookmarkedSet.has(prob.id);

          return (
            <div
              key={prob.id}
              onClick={() => onSelectProblem(prob)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-[#181d2a] border-[#4338ca] shadow-lg shadow-indigo-950/40'
                  : 'bg-[#12161f] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Left Day Badge & Title */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={(e) => handleSolvedClick(e, prob.id)}
                  className="text-slate-500 hover:text-emerald-400 transition-colors flex-shrink-0 cursor-pointer"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400">
                      Day {prob.day}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getDifficultyBadge(prob.difficulty)}`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <h3 className={`text-xs sm:text-sm font-bold truncate ${isDone ? 'text-slate-300 line-through' : 'text-white'}`}>
                    {prob.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {prob.category}
                  </p>
                </div>
              </div>

              {/* Right: Bookmark & Action Arrow */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => handleBookmarkClick(e, prob.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Bookmark className={`w-4 h-4 ${isMarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

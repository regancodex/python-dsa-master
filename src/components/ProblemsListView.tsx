import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Clock, 
  ArrowUpDown, 
  Sparkles,
  ExternalLink,
  Tag,
  Building2,
  X,
  Compass,
  GraduationCap
} from 'lucide-react';
import { Problem, DSACategory, Difficulty } from '../types/dsa';
import { CATEGORIES_LIST } from '../data/problemsData';
import confetti from 'canvas-confetti';

interface ProblemsListViewProps {
  problems: Problem[];
  solvedIds: string[];
  bookmarkedIds: string[];
  onSelectProblem: (problem: Problem) => void;
  onToggleSolved: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  initialSearchQuery?: string;
}

export const ProblemsListView: React.FC<ProblemsListViewProps> = ({
  problems,
  solvedIds,
  bookmarkedIds,
  onSelectProblem,
  onToggleSolved,
  onToggleBookmark,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved' | 'Bookmarked'>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'day' | 'difficulty' | 'title'>('day');

  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);
  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);

  // Extract all unique companies
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    problems.forEach((p) => p.companies?.forEach((c) => companies.add(c)));
    return Array.from(companies).sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => {
        // Text Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          const matchCompany = p.companies?.some((c) => c.toLowerCase().includes(q));
          const matchDay = `day ${p.day}`.includes(q) || `d${p.day}`.includes(q);
          if (!matchTitle && !matchCategory && !matchTags && !matchCompany && !matchDay) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
          return false;
        }

        // Status filter
        if (statusFilter === 'Solved' && !solvedSet.has(p.id)) return false;
        if (statusFilter === 'Unsolved' && solvedSet.has(p.id)) return false;
        if (statusFilter === 'Bookmarked' && !bookmarkedSet.has(p.id)) return false;

        // Company filter
        if (selectedCompany !== 'All' && !p.companies?.includes(selectedCompany)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'day') return a.day - b.day;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'difficulty') {
          const score = { Easy: 1, Medium: 2, Hard: 3 };
          return score[a.difficulty] - score[b.difficulty];
        }
        return 0;
      });
  }, [
    problems,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    statusFilter,
    selectedCompany,
    sortBy,
    solvedSet,
    bookmarkedSet
  ]);

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const handleSolved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onToggleSolved(id);
    if (!solvedSet.has(id)) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Search & Filter Header */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, patterns, companies (e.g. Google, Two Pointers, O(N))..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Primary Filter Tabs: Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {(['All', 'Unsolved', 'Solved', 'Bookmarked'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {status}
              {status === 'Solved' && ` (${solvedIds.length})`}
              {status === 'Bookmarked' && ` (${bookmarkedIds.length})`}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Difficulty, Category, Company, Sort */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Hard">🔴 Hard</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES_LIST.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Company Filter */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="All">All Companies</option>
            {allCompanies.map((c) => (
              <option key={c} value={c}>🏢 {c}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 outline-none focus:border-emerald-500"
          >
            <option value="day">📅 Sort by Day</option>
            <option value="difficulty">🎯 Sort by Difficulty</option>
            <option value="title">🔤 Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results Count & Quick Reset */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredProblems.length}</strong> of {problems.length} problems
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || statusFilter !== 'All' || selectedCompany !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setStatusFilter('All');
              setSelectedCompany('All');
            }}
            className="text-emerald-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Problems Card List */}
      <div className="space-y-2.5">
        {filteredProblems.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <p className="text-sm font-semibold text-slate-300">No problems match your current search/filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setStatusFilter('All');
                setSelectedCompany('All');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredProblems.map((problem) => {
            const isSolved = solvedSet.has(problem.id);
            const isBookmarked = bookmarkedSet.has(problem.id);

            return (
              <div
                key={problem.id}
                onClick={() => onSelectProblem(problem)}
                className={`group p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] ${
                  isSolved
                    ? 'bg-slate-900/60 border-slate-800/60 opacity-90'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left Main */}
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={(e) => handleSolved(e, problem.id)}
                      className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors flex-shrink-0"
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          D{problem.day}
                        </span>
                        <h4 className={`text-sm sm:text-base font-bold truncate ${
                          isSolved ? 'text-slate-300 line-through decoration-slate-500' : 'text-white group-hover:text-emerald-300'
                        }`}>
                          {problem.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                        <span className="text-slate-300 font-medium">{problem.category}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-slate-400 text-[11px]">Time: {problem.complexity.time}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-slate-400 text-[11px]">Space: {problem.complexity.space}</span>
                      </div>

                      {/* Company Pills */}
                      {problem.companies && problem.companies.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {problem.companies.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium"
                            >
                              🏢 {comp}
                            </span>
                          ))}
                          {problem.companies.length > 3 && (
                            <span className="text-[10px] text-slate-400">
                              +{problem.companies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(problem.id);
                      }}
                      className={`p-2 rounded-xl transition-all ${
                        isBookmarked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

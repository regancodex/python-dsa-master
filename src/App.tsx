import React, { useState, useEffect } from 'react';
import { TopNavHeader } from './components/TopNavHeader';
import { ConceptView } from './components/ConceptView';
import { PracticeView } from './components/PracticeView';
import { RoadmapView } from './components/RoadmapView';
import { TricksView } from './components/TricksView';
import { StatsProgressModal } from './components/StatsProgressModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { StudyReminderModal } from './components/StudyReminderModal';
import { StreakModal } from './components/StreakModal';
import { PROBLEMS_DATA, getProblemsByTrack } from './data/problemsData';
import { Problem, ActiveTab, CurriculumTrack } from './types/dsa';
import { StreakData, getInitialStreakData, recordProblemActivity, getTodayDateString } from './utils/streakUtils';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('concept');
  const [currentTrack, setCurrentTrack] = useState<CurriculumTrack>(() => {
    try {
      const saved = localStorage.getItem('dsa_curriculum_track');
      return saved === 'blind75' ? 'blind75' : 'core30';
    } catch {
      return 'core30';
    }
  });
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isPWAOpen, setIsPWAOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isStreakOpen, setIsStreakOpen] = useState(false);

  // Active problems based on selected track
  const activeProblems: Problem[] = getProblemsByTrack(currentTrack);

  // Local storage persisted states
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_solved_ids');
      return saved ? JSON.parse(saved) : ['two-sum'];
    } catch {
      return ['two-sum'];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_bookmarked_ids');
      return saved ? JSON.parse(saved) : ['trapping-rain-water', 'lru-cache'];
    } catch {
      return [];
    }
  });

  const [streakData, setStreakData] = useState<StreakData>(() => getInitialStreakData());
  const streakCount = streakData.currentStreak;

  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large' | 'xlarge'>(() => {
    try {
      const saved = localStorage.getItem('dsa_font_size');
      return (saved as any) || 'normal';
    } catch {
      return 'normal';
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light' | 'midnight'>(() => {
    try {
      const saved = localStorage.getItem('dsa_theme');
      if (saved === 'light' || saved === 'midnight' || saved === 'dark') {
        return saved;
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  // Dynamically set HTML attributes for typography scaling & light/dark theme styles
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [theme, fontSize]);

  // Current problem based on currentDay
  const currentProblem: Problem = activeProblems.find((p) => p.day === currentDay) || activeProblems[0];

  useEffect(() => {
    localStorage.setItem('dsa_curriculum_track', currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    localStorage.setItem('dsa_solved_ids', JSON.stringify(solvedIds));
  }, [solvedIds]);

  useEffect(() => {
    localStorage.setItem('dsa_bookmarked_ids', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('dsa_streak_count', String(streakCount));
  }, [streakCount]);

  useEffect(() => {
    localStorage.setItem('dsa_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('dsa_theme', theme);
  }, [theme]);

  const handleTrackChange = (newTrack: CurriculumTrack) => {
    setCurrentTrack(newTrack);
    const newProblems = getProblemsByTrack(newTrack);
    if (currentDay > newProblems.length) {
      setCurrentDay(1);
    }
  };

  const handleToggleSolved = (id: string) => {
    setSolvedIds((prev) => {
      const isNewlySolved = !prev.includes(id);
      if (isNewlySolved) {
        // Record real calendar activity & update streak
        const { updatedData, streakIncreased } = recordProblemActivity(streakData);
        setStreakData(updatedData);
      }
      return isNewlySolved ? [...prev, id] : prev.filter((item) => item !== id);
    });
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextDay = () => {
    if (currentDay < activeProblems.length) {
      setCurrentDay((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevDay = () => {
    if (currentDay > 1) {
      setCurrentDay((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProblemFromRoadmap = (problem: Problem) => {
    setCurrentDay(problem.day);
    setActiveTab('concept');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportProgress = () => {
    const data = {
      solvedIds,
      bookmarkedIds,
      streakCount,
      streakData,
      currentDay,
      currentTrack,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python-dsa-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetProgress = () => {
    setSolvedIds([]);
    setBookmarkedIds([]);
    const resetStreak = {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: getTodayDateString(),
      activityDates: [getTodayDateString()]
    };
    setStreakData(resetStreak);
    localStorage.setItem('dsa_streak_details', JSON.stringify(resetStreak));
    localStorage.setItem('dsa_streak_count', '1');
    setCurrentDay(1);
    setIsStatsOpen(false);
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'light':
        return 'bg-[#f8fafc] text-slate-900';
      case 'midnight':
        return 'bg-black text-slate-100';
      case 'dark':
      default:
        return 'bg-[#080b11] text-slate-100';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClass()} flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200`}>
      {/* Top Header with Dynamic Island & Notch Safe Clearance + 4 Main Tabs + Icon Utilities */}
      <TopNavHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakCount={streakCount}
        solvedCount={solvedIds.filter((id) => activeProblems.some((p) => p.id === id)).length}
        totalCount={activeProblems.length}
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        setTheme={setTheme}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenPWA={() => setIsPWAOpen(true)}
        onOpenReminder={() => setIsReminderOpen(true)}
        onOpenStreak={() => setIsStreakOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-3.5 sm:px-6 pt-3">
        {activeTab === 'concept' && (
          <ConceptView
            problem={currentProblem}
            totalProblems={activeProblems.length}
            isSolved={solvedIds.includes(currentProblem.id)}
            isBookmarked={bookmarkedIds.includes(currentProblem.id)}
            onToggleSolved={handleToggleSolved}
            onToggleBookmark={handleToggleBookmark}
            onNextDay={handleNextDay}
            onPrevDay={handlePrevDay}
            onStartChallenge={() => setActiveTab('practice')}
            fontSize={fontSize}
            theme={theme}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            problem={currentProblem}
            totalProblems={activeProblems.length}
            isSolved={solvedIds.includes(currentProblem.id)}
            isBookmarked={bookmarkedIds.includes(currentProblem.id)}
            onToggleSolved={handleToggleSolved}
            onToggleBookmark={handleToggleBookmark}
            onNextDay={handleNextDay}
            onPrevDay={handlePrevDay}
            fontSize={fontSize}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            problems={activeProblems}
            currentDay={currentDay}
            solvedIds={solvedIds}
            bookmarkedIds={bookmarkedIds}
            onSelectProblem={handleSelectProblemFromRoadmap}
            onToggleSolved={handleToggleSolved}
            onToggleBookmark={handleToggleBookmark}
            streakCount={streakCount}
            currentTrack={currentTrack}
            onTrackChange={handleTrackChange}
          />
        )}

        {activeTab === 'tricks' && (
          <TricksView />
        )}
      </main>

      {/* Cross-Platform PWA Installation Guide Modal (iOS Safari & Android Chrome) */}
      <PWAInstallModal
        isOpen={isPWAOpen}
        onClose={() => setIsPWAOpen(false)}
        onOpenSync={() => {
          setIsPWAOpen(false);
          setIsStatsOpen(true);
        }}
      />

      {/* Daily Habit & Study Reminder Modal */}
      <StudyReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
      />

      {/* Streak Details & Activity Calendar Modal */}
      <StreakModal
        isOpen={isStreakOpen}
        onClose={() => setIsStreakOpen(false)}
        streakData={streakData}
        solvedTodayCount={streakData.lastActiveDate === getTodayDateString() ? 1 : 0}
        theme={theme}
      />

      {/* Analytics / Stats Modal */}
      <StatsProgressModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        problems={activeProblems}
        solvedIds={solvedIds}
        bookmarkedIds={bookmarkedIds}
        streakCount={streakCount}
        onExportProgress={handleExportProgress}
        onResetProgress={handleResetProgress}
        onSelectProblem={handleSelectProblemFromRoadmap}
      />
    </div>
  );
}

export default App;

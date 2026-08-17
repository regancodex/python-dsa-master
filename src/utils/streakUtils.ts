export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  activityDates: string[]; // ['2026-08-10', '2026-08-11', ...]
}

export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function getInitialStreakData(): StreakData {
  try {
    const saved = localStorage.getItem('dsa_streak_details');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }

  // Default initial seed data for demo continuity
  const today = getTodayDateString();
  const pastDates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    pastDates.push(d.toISOString().split('T')[0]);
  }

  return {
    currentStreak: 7,
    longestStreak: 12,
    lastActiveDate: today,
    activityDates: pastDates
  };
}

export function recordProblemActivity(currentData: StreakData): { updatedData: StreakData; streakIncreased: boolean } {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  const activityDates = currentData.activityDates.includes(today)
    ? currentData.activityDates
    : [...currentData.activityDates, today];

  // If already practiced today
  if (currentData.lastActiveDate === today) {
    const updated: StreakData = {
      ...currentData,
      activityDates
    };
    saveStreakData(updated);
    return { updatedData: updated, streakIncreased: false };
  }

  let newStreak = currentData.currentStreak;
  let streakIncreased = false;

  if (currentData.lastActiveDate === yesterday) {
    // Consecutive day!
    newStreak += 1;
    streakIncreased = true;
  } else if (!currentData.lastActiveDate) {
    // First ever day
    newStreak = 1;
    streakIncreased = true;
  } else {
    // Missed at least one day -> reset to 1
    newStreak = 1;
    streakIncreased = true;
  }

  const updatedData: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, currentData.longestStreak),
    lastActiveDate: today,
    activityDates
  };

  saveStreakData(updatedData);
  return { updatedData, streakIncreased };
}

export function saveStreakData(data: StreakData): void {
  try {
    localStorage.setItem('dsa_streak_details', JSON.stringify(data));
    localStorage.setItem('dsa_streak_count', String(data.currentStreak));
  } catch (e) {
    console.error(e);
  }
}

export function getWeekDayActivity(activityDates: string[]): { dayName: string; dateStr: string; active: boolean; isToday: boolean }[] {
  const result = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayStr = getTodayDateString();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = dayNames[d.getDay()];
    result.push({
      dayName,
      dateStr,
      active: activityDates.includes(dateStr),
      isToday: dateStr === todayStr
    });
  }

  return result;
}

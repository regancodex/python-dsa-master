import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Lightbulb, 
  Flame, 
  Type, 
  Moon, 
  Sun,
  Palette,
  CheckCircle2, 
  BarChart3,
  Smartphone,
  Bell
} from 'lucide-react';
import { ActiveTab } from '../types/dsa';
import confetti from 'canvas-confetti';

interface TopNavHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  streakCount: number;
  solvedCount: number;
  totalCount: number;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => void;
  theme: 'dark' | 'light' | 'midnight';
  setTheme: (theme: 'dark' | 'light' | 'midnight') => void;
  onOpenStats: () => void;
  onOpenPWA: () => void;
  onOpenReminder: () => void;
  onOpenStreak?: () => void;
}

export const TopNavHeader: React.FC<TopNavHeaderProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  solvedCount,
  totalCount,
  fontSize,
  setFontSize,
  theme,
  setTheme,
  onOpenStats,
  onOpenPWA,
  onOpenReminder,
  onOpenStreak
}) => {
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themeMenuRef = useRef<HTMLDivElement>(null);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  // Auto-close submenu when clicking anywhere outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (fontMenuRef.current && !fontMenuRef.current.contains(event.target as Node)) {
        setShowFontMenu(false);
      }
    };

    if (showThemeMenu || showFontMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeMenu, showFontMenu]);

  const handleStreakClick = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.15 }
    });
    if (onOpenStreak) {
      onOpenStreak();
    }
  };

  const fontOptions: { id: 'small' | 'normal' | 'large' | 'xlarge'; label: string; desc: string }[] = [
    { id: 'small', label: 'Compact', desc: '13.5px' },
    { id: 'normal', label: 'Default', desc: '15px' },
    { id: 'large', label: 'Large (Mobile+)', desc: '16.5px' },
    { id: 'xlarge', label: 'Extra Large', desc: '18px' }
  ];

  const themeOptions: { id: 'light' | 'dark' | 'midnight'; label: string; desc: string; dotBg: string; dotBorder: string }[] = [
    { id: 'light', label: 'Crisp Light', desc: 'High Contrast Clean', dotBg: '#ffffff', dotBorder: '#94a3b8' },
    { id: 'dark', label: 'Dark Slate', desc: 'Deep Navy Obsidian', dotBg: '#0f172a', dotBorder: '#475569' },
    { id: 'midnight', label: 'Pure Midnight', desc: 'OLED Deep Black', dotBg: '#000000', dotBorder: '#334155' }
  ];

  return (
    <header className="w-full bg-[#0a0d14]/95 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-40 transition-all shadow-lg pt-[max(3rem,calc(env(safe-area-inset-top)+1.2rem))] pb-3 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Top Branding & Utilities Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Counter */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-sm shadow-sm">
              🐍
            </div>
            <div>
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white">
                Python DSA
              </span>
              <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
                {solvedCount}/{totalCount}
              </span>
            </div>
          </div>

          {/* Quick Utility Icon Bar */}
          <div className="flex items-center gap-1">
            {/* Streak */}
            <button
              onClick={handleStreakClick}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-bold active:scale-95 cursor-pointer shadow-sm"
              title="Practice Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{streakCount}d</span>
            </button>

            {/* PWA Phone Install Icon */}
            <button
              onClick={onOpenPWA}
              className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/40'
              }`}
              title="Install App on iPhone & Android"
            >
              <Smartphone className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
            </button>

            {/* Study Reminder Bell Icon */}
            <button
              onClick={onOpenReminder}
              className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/40'
              }`}
              title="Daily Study Reminder"
            >
              <Bell className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'}`} />
            </button>

            {/* Theme Switcher */}
            <div className="relative" ref={themeMenuRef}>
              <button
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowFontMenu(false);
                }}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                  showThemeMenu
                    ? theme === 'light'
                      ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-sm'
                      : 'bg-indigo-950 border-indigo-500 text-indigo-300'
                    : theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Change Theme (Dark / Light / Midnight)"
              >
                {theme === 'light' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                ) : theme === 'midnight' ? (
                  <Moon className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </button>

              {showThemeMenu && (
                <div
                  className={`absolute right-0 mt-2 w-52 p-2 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    theme === 'light'
                      ? 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60'
                      : 'bg-slate-900 border-slate-700 shadow-2xl'
                  }`}
                >
                  <div
                    className={`px-2 py-1 mb-1 border-b text-[11px] font-bold ${
                      theme === 'light'
                        ? 'border-slate-200 text-slate-700'
                        : 'border-slate-800 text-slate-300'
                    }`}
                  >
                    Display Theme
                  </div>
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setTheme(opt.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        theme === opt.id
                          ? theme === 'light'
                            ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                            : 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30'
                          : theme === 'light'
                          ? 'text-slate-700 hover:bg-slate-100 border border-transparent'
                          : 'text-slate-300 hover:bg-slate-800 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border flex-shrink-0"
                          style={{ backgroundColor: opt.dotBg, borderColor: opt.dotBorder }}
                        />
                        <div>
                          <div className="font-semibold">{opt.label}</div>
                          <div
                            className={`text-[10px] ${
                              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                      {theme === opt.id && (
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Font Scaler */}
            <div className="relative" ref={fontMenuRef}>
              <button
                onClick={() => {
                  setShowFontMenu(!showFontMenu);
                  setShowThemeMenu(false);
                }}
                className={`p-1.5 rounded-xl border transition-all flex items-center gap-1 text-xs cursor-pointer ${
                  showFontMenu
                    ? theme === 'light'
                      ? 'bg-indigo-100 border-indigo-400 text-indigo-800 shadow-sm'
                      : 'bg-indigo-950 border-indigo-500 text-indigo-300'
                    : theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Adjust Text Size"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">
                  {fontSize === 'small' ? 'A-' : fontSize === 'xlarge' ? 'A++' : fontSize === 'large' ? 'A+' : 'A'}
                </span>
              </button>

              {showFontMenu && (
                <div
                  className={`absolute right-0 mt-2 w-48 p-2 rounded-2xl border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    theme === 'light'
                      ? 'bg-white border-slate-300 text-slate-900 shadow-slate-300/60'
                      : 'bg-slate-900 border-slate-700 shadow-2xl'
                  }`}
                >
                  <div
                    className={`px-2 py-1 mb-1 border-b text-[11px] font-bold ${
                      theme === 'light'
                        ? 'border-slate-200 text-slate-700'
                        : 'border-slate-800 text-slate-300'
                    }`}
                  >
                    Text Reading Size
                  </div>
                  {fontOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setFontSize(opt.id);
                        setShowFontMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        fontSize === opt.id
                          ? theme === 'light'
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'bg-indigo-500/20 text-indigo-300 font-semibold'
                          : theme === 'light'
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {fontSize === opt.id && (
                        <CheckCircle2
                          className={`w-3 h-3 ${
                            theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Progress Modal */}
            <button
              onClick={onOpenStats}
              className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Curriculum Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Core Navigation Tabs */}
        <nav className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-950/90 border border-slate-800/90">
          <button
            onClick={() => setActiveTab('concept')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'concept'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/80 shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#818cf8]" />
            <span className="text-xs">Concept</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/80 shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-[#818cf8]" />
            <span className="text-xs">Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/80 shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#818cf8]" />
            <span className="text-xs">Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('tricks')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tricks'
                ? 'bg-[#201d47] text-[#a5b4fc] border border-[#4338ca]/80 shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Global Patterns & Cheatsheet Vault for all 75 Days"
          >
            <Lightbulb className="w-4 h-4 text-[#818cf8]" />
            <span className="text-xs">Patterns</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Type, 
  Moon, 
  Sun, 
  Sparkles, 
  Share2, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SafeHeaderProps {
  streakCount: number;
  solvedCount: number;
  totalCount: number;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge') => void;
  theme: 'dark' | 'midnight' | 'emerald';
  setTheme: (theme: 'dark' | 'midnight' | 'emerald') => void;
  onOpenSearch: () => void;
  onOpenStats: () => void;
}

export const SafeHeader: React.FC<SafeHeaderProps> = ({
  streakCount,
  solvedCount,
  totalCount,
  fontSize,
  setFontSize,
  theme,
  setTheme,
  onOpenSearch,
  onOpenStats
}) => {
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleStreakClick = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.1 }
    });
  };

  const fontOptions: { id: 'small' | 'normal' | 'large' | 'xlarge'; label: string; desc: string }[] = [
    { id: 'small', label: 'Compact', desc: '14px - Max data density' },
    { id: 'normal', label: 'Default', desc: '16px - Standard reading' },
    { id: 'large', label: 'Large (Mobile+)', desc: '18px - Ultra readable' },
    { id: 'xlarge', label: 'Extra Large', desc: '20px - Large text comfort' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 pt-[max(0.6rem,env(safe-area-inset-top))] pb-2.5 px-3 sm:px-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-[1.5px] shadow-lg shadow-emerald-950/40 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-black text-emerald-400 text-sm">
              🐍
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent truncate">
                Python DSA
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold uppercase tracking-wider hidden xs:inline-block border border-emerald-500/30">
                Daily Master
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 font-medium">
              <span>Day-by-Day Prep</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">{solvedCount}/{totalCount} Solved</span>
            </p>
          </div>
        </div>

        {/* Action Controls (Streak, Font Scaler, Search, Stats) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Streak Badge */}
          <button
            onClick={handleStreakClick}
            title="Daily Practice Streak! Tap for cheer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs font-bold active:scale-95 cursor-pointer shadow-sm"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
            <span>{streakCount}d</span>
          </button>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            title="Search problems (⌘K or tap)"
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline text-slate-400">Search</span>
          </button>

          {/* Text Size Customizer dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFontMenu(!showFontMenu);
                setShowThemeMenu(false);
              }}
              title="Adjust text reading size"
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs active:scale-95 cursor-pointer ${
                showFontMenu
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span className="text-[11px] font-semibold hidden md:inline">
                {fontSize === 'small' ? 'A-' : fontSize === 'xlarge' ? 'A++' : fontSize === 'large' ? 'A+' : 'A'}
              </span>
            </button>

            {showFontMenu && (
              <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 mb-1 border-b border-slate-800">
                  <p className="text-xs font-bold text-slate-200">Mobile Reading Size</p>
                  <p className="text-[10px] text-slate-400">Scale problem text & code blocks</p>
                </div>
                {fontOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFontSize(opt.id);
                      setShowFontMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      fontSize === opt.id
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-[10px] text-slate-400">{opt.desc}</div>
                    </div>
                    {fontSize === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowFontMenu(false);
              }}
              title="Theme settings"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <Moon className="w-4 h-4 text-slate-400" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <p className="px-2 py-1 text-xs font-bold text-slate-200 border-b border-slate-800 mb-1">
                  Appearance
                </p>
                <button
                  onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium ${theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  🌌 Dark Slate
                </button>
                <button
                  onClick={() => { setTheme('midnight'); setShowThemeMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium ${theme === 'midnight' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  🖤 OLED Midnight
                </button>
                <button
                  onClick={() => { setTheme('emerald'); setShowThemeMenu(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium ${theme === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  🌲 Emerald Cyber
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Layers,
  Apple,
  Globe
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSync?: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onOpenSync
}) => {
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#0f141e] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header matching exact screenshot */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-start justify-between relative">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Cross-Platform Setup (iOS & Android)</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              How to Install PyAlgo Daily on iPhone & Android
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 max-h-[75vh]">
          {/* Subtitle Intro */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            The best option for seamless learning across iOS and Android is a <strong className="text-indigo-300 font-semibold">Progressive Web App (PWA)</strong>. It requires zero App Store downloads, works natively on both OSes, includes an in-browser Python runner, and lets you sync progress instantly!
          </p>

          {/* Platform Switcher Tabs */}
          <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActivePlatform('ios')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activePlatform === 'ios'
                  ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>iPhone / iPad (iOS Safari)</span>
            </button>

            <button
              onClick={() => setActivePlatform('android')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activePlatform === 'android'
                  ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Android (Chrome)</span>
            </button>
          </div>

          {/* iOS Safari Setup Steps */}
          {activePlatform === 'ios' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Apple className="w-4 h-4" />
                <span>iOS Safari Setup (3 Steps):</span>
              </h3>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    1
                  </span>
                  <span>Open this app URL in <strong className="text-white font-bold">Safari</strong> on your iPhone or iPad.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    2
                  </span>
                  <span>Tap the <strong className="text-indigo-300 font-bold">Share Button</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-indigo-400" /> at the bottom toolbar.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    3
                  </span>
                  <span>Scroll down and tap <strong className="text-indigo-300 font-bold">"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-indigo-400" />.</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic px-1">
                PyAlgo Daily will now appear on your iPhone home screen like a native app with full offline Python support!
              </p>
            </div>
          )}

          {/* Android Chrome Setup Steps */}
          {activePlatform === 'android' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>Android Chrome Setup (3 Steps):</span>
              </h3>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    1
                  </span>
                  <span>Open this app in <strong className="text-white font-bold">Google Chrome</strong> on your Android phone.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    2
                  </span>
                  <span>Tap the <strong className="text-indigo-300 font-bold">Three Dots (⋮)</strong> menu icon at the top right.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center flex-shrink-0 text-[11px] border border-indigo-500/30 mt-0.5">
                    3
                  </span>
                  <span>Select <strong className="text-indigo-300 font-bold">"Install App"</strong> or <strong className="text-indigo-300 font-bold">"Add to Home screen"</strong>.</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic px-1">
                The standalone app icon will be pinned to your app drawer and home launcher.
              </p>
            </div>
          )}

          {/* Sync across devices notice */}
          <div className="p-4 rounded-2xl bg-[#1e1b4b]/60 border border-indigo-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>How to continue learning across iPhone & Android:</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Use the <strong className="text-white">"Sync Data"</strong> button on the Roadmap tab to generate a 1-click JSON backup snippet. Paste it between devices whenever you switch!
            </p>
          </div>
        </div>

        {/* Primary Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#6366f1] via-[#5b5bf0] to-[#4f46e5] text-white font-bold text-sm hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/25 cursor-pointer text-center"
          >
            Got It, Let's Start Learning!
          </button>
        </div>
      </div>
    </div>
  );
};

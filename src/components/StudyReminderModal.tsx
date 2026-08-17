import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Flame,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyReminderModal: React.FC<StudyReminderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(() => {
    return localStorage.getItem('dsa_reminder_enabled') === 'true';
  });

  const [reminderTime, setReminderTime] = useState<string>(() => {
    return localStorage.getItem('dsa_reminder_time') || '09:00';
  });

  const [reminderDays, setReminderDays] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dsa_reminder_days');
      return saved ? JSON.parse(saved) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } catch {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('dsa_sound_enabled') !== 'false';
  });

  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationStatus(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleDay = (day: string) => {
    if (reminderDays.includes(day)) {
      if (reminderDays.length > 1) {
        setReminderDays(reminderDays.filter((d) => d !== day));
      }
    } else {
      setReminderDays([...reminderDays, day]);
    }
  };

  const handleRequestPermission = async () => {
    if (typeof Notification !== 'undefined') {
      try {
        const perm = await Notification.requestPermission();
        setNotificationStatus(perm);
        if (perm === 'granted') {
          new Notification('🐍 Python DSA Daily Reminder Set!', {
            body: `We will nudge you at ${reminderTime} to keep your daily streak alive!`,
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error('Notification error:', err);
      }
    }
  };

  const handleSave = () => {
    localStorage.setItem('dsa_reminder_enabled', String(reminderEnabled));
    localStorage.setItem('dsa_reminder_time', reminderTime);
    localStorage.setItem('dsa_reminder_days', JSON.stringify(reminderDays));
    localStorage.setItem('dsa_sound_enabled', String(soundEnabled));
    
    setSavedSuccess(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const allWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3.5 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0f141e] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Daily Study Reminder</span>
              </h3>
              <p className="text-xs text-slate-400">Never break your Python algorithm streak</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {/* Main Toggle Switch */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white">Daily Habit Reminder</span>
              <p className="text-[11px] text-slate-400">Receive local notification prompt</p>
            </div>
            <button
              onClick={() => setReminderEnabled(!reminderEnabled)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                reminderEnabled ? 'bg-indigo-600 justify-end' : 'bg-slate-400 justify-start'
              }`}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all" />
            </button>
          </div>

          {/* Time Picker */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Reminder Time</span>
              </span>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono font-bold text-white outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Day of Week Multi-select */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Target Days</span>
            </span>

            <div className="grid grid-cols-7 gap-1.5">
              {allWeekDays.map((day) => {
                const isSelected = reminderDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notification Permission Status */}
          {typeof Notification !== 'undefined' && notificationStatus !== 'granted' && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs text-amber-200 font-medium">Browser permission needed</span>
              </div>
              <button
                onClick={handleRequestPermission}
                className="px-3 py-1 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-all cursor-pointer flex-shrink-0"
              >
                Allow
              </button>
            </div>
          )}

          {/* Sound toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span className="text-xs text-slate-300 font-medium">Sound Effects (Celebration & Clicks)</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/30 cursor-pointer flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Schedule</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

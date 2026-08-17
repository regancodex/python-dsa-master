import React, { useState } from 'react';
import { X, Search, ChevronRight, Lightbulb } from 'lucide-react';
import { COMMON_DSA_GLOSSARY, JargonTerm } from '../utils/jargonAnalogies';

interface JargonDecoderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermKey?: string;
  theme?: 'dark' | 'light' | 'midnight';
}

export const JargonDecoderModal: React.FC<JargonDecoderModalProps> = ({
  isOpen,
  onClose,
  initialTermKey,
  theme = 'dark'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKey, setSelectedKey] = useState<string>(initialTermKey || 'hash-map');

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const allTerms = Object.entries(COMMON_DSA_GLOSSARY);

  const filteredTerms = allTerms.filter(([key, item]) => {
    const query = searchTerm.toLowerCase();
    return (
      item.term.toLowerCase().includes(query) ||
      item.plainEnglish.toLowerCase().includes(query) ||
      item.realLifeAnalogy.toLowerCase().includes(query)
    );
  });

  const currentTerm: JargonTerm = COMMON_DSA_GLOSSARY[selectedKey] || allTerms[0][1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border transition-all ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#12161f] border-slate-800 text-white'
      }`}>
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200 bg-slate-50/70' : 'border-slate-800 bg-slate-950/60'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center border ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-700'
                : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
            }`}>
              <Lightbulb className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            </div>
            <div>
              <h2 className={`font-extrabold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                DSA Jargon Decoder (Plain English)
              </h2>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Real-world daily life analogies for complex computer science terms
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className={`p-3 border-b ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-[#0f141e]'
        }`}>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts (e.g., hash map, heap, memoization, permutations)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20'
                  : 'bg-slate-900/90 border-slate-700/70 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20'
              }`}
            />
          </div>
        </div>

        {/* Content Body: Sidebar list + Detail Card */}
        <div className={`flex-1 overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x ${
          isLight ? 'divide-slate-200' : 'divide-slate-800'
        }`}>
          {/* Term List Sidebar */}
          <div className={`p-2 overflow-y-auto max-h-48 sm:max-h-none space-y-1 ${
            isLight ? 'bg-slate-50/50' : 'bg-slate-950/40'
          }`}>
            {filteredTerms.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 font-medium">No matching terms</div>
            ) : (
              filteredTerms.map(([key, term]) => (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    selectedKey === key
                      ? isLight
                        ? 'bg-indigo-100 text-indigo-950 font-bold border border-indigo-200 shadow-2xs'
                        : 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                      : isLight
                      ? 'text-slate-700 hover:bg-slate-100 border border-transparent'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <span className="truncate">{term.term.split('(')[0].trim()}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                </button>
              ))
            )}
          </div>

          {/* Term Detail View */}
          <div className={`sm:col-span-2 p-4 sm:p-6 overflow-y-auto space-y-4 ${
            isLight ? 'bg-white' : 'bg-[#12161f]'
          }`}>
            {currentTerm && (
              <div className="space-y-4">
                <div>
                  <h3 className={`text-base font-extrabold flex items-center gap-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {currentTerm.term}
                  </h3>
                  <p className={`text-xs mt-1 font-medium ${
                    isLight ? 'text-indigo-800' : 'text-indigo-300'
                  }`}>
                    {currentTerm.plainEnglish}
                  </p>
                </div>

                {/* Real-life Analogy Box */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight
                    ? 'bg-amber-50/80 border-amber-200/90 text-slate-800'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                }`}>
                  <div className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400'
                  }`}>
                    <span>🍕 Real-World Analogy</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {currentTerm.realLifeAnalogy}
                  </p>
                </div>

                {/* Mental Model / Why It Matters */}
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isLight
                    ? 'bg-purple-50/70 border-purple-200/90'
                    : 'bg-purple-500/10 border-purple-500/20'
                }`}>
                  <div className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                    isLight ? 'text-purple-800' : 'text-purple-400'
                  }`}>
                    <span>🧠 Why It Matters</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    {currentTerm.whyItMatters}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3 sm:p-4 border-t flex justify-end ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950/60'
        }`}>
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            Close Decoder
          </button>
        </div>
      </div>
    </div>
  );
};

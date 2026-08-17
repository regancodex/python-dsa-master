import React, { useState } from 'react';
import { Problem } from '../types/dsa';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { PlaySquare, Sparkles } from 'lucide-react';

interface VisualizerTabProps {
  problems: Problem[];
}

export const VisualizerTab: React.FC<VisualizerTabProps> = ({ problems }) => {
  // Sort problems by Day
  const sortedProblems = [...problems].sort((a, b) => a.day - b.day);

  const [selectedId, setSelectedId] = useState<string>(sortedProblems[0]?.id || problems[0].id);

  const currentProblem = sortedProblems.find((p) => p.id === selectedId) || sortedProblems[0];

  return (
    <div className="space-y-4 pb-28 animate-in fade-in duration-200">
      {/* Header & Selector */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800/80 space-y-3.5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <PlaySquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white">Algorithm Pointer & State Visualizer</h2>
            <p className="text-xs text-slate-400">Step through Hash Maps, Two Pointers, Sliding Windows, Stacks, Trees, Heaps, and DP tables step-by-step.</p>
          </div>
        </div>

        {/* Algorithm Picker */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-slate-300">Select Problem to Step-Through:</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-indigo-300 outline-none focus:border-indigo-500 cursor-pointer"
          >
            {sortedProblems.map((p) => (
              <option key={p.id} value={p.id}>
                Day {p.day}: {p.title} · {p.category} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visualizer Component */}
      <AlgorithmVisualizer problem={currentProblem} />
    </div>
  );
};

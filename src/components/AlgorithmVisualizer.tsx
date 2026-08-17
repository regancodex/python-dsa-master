import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Gauge, 
  Layers,
  Sparkles,
  Info,
  Database,
  Hash,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Code2
} from 'lucide-react';
import { Problem } from '../types/dsa';
import { getProblemVisualizerData } from '../utils/visualizerData';

interface AlgorithmVisualizerProps {
  problem?: Problem;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ problem }) => {
  // Default to two-sum if not supplied
  const visualData = getProblemVisualizerData(problem || {
    id: 'two-sum',
    day: 1,
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    description: '',
    examples: [],
    constraints: [],
    starterCode: '',
    solutionCode: '',
    optimalIntuition: '',
    complexity: { time: 'O(N)', space: 'O(N)' },
    companies: [],
    tags: []
  });

  const { steps, arrayItems, targetLabel, targetValue, specialFormula } = visualData;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1400); // ms per step

  const currentStep = steps[currentStepIndex] || steps[0];

  // Whenever problem changes (e.g. Day 1 -> Day 10 3Sum), reset index and stop playback
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [problem?.id, problem?.day]);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  };

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-200">
      {/* Header & Step progress */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#12161f] border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Step-by-Step Visualizer</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
              {problem?.title || 'Two Sum Algorithm'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-indigo-300">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Visualizer Canvas Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-5">
          
          {/* Step description badge */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">Current Action:</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Problem-Specific Formula Box (e.g. Two Sum complement or 3Sum pivot) */}
          {specialFormula && (
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300 flex-wrap gap-1">
                <span className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{specialFormula.title}</span>
                </span>
                <span className="font-mono text-[11px] bg-indigo-500/20 px-2 py-0.5 rounded-md text-indigo-200">
                  {specialFormula.formula}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {specialFormula.description}
              </p>
            </div>
          )}

          {/* Array Graphic */}
          {arrayItems.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
                <span>Input Array `nums`:</span>
                {targetLabel && targetValue !== undefined && (
                  <span className="font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {targetLabel}: {String(targetValue)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap py-2">
                {arrayItems.map((val, idx) => {
                  const pointerMatch = currentStep.pointers?.find((p) => p.index === idx);
                  const isHighlighted = currentStep.arrayHighlight?.indices?.includes(idx);
                  const highlightType = currentStep.arrayHighlight?.type;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      {/* Pointer Tag above element */}
                      <div className="h-6 flex items-center justify-center">
                        {pointerMatch && (
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border animate-bounce shadow-md whitespace-nowrap ${
                            pointerMatch.name.includes('seen') || pointerMatch.name.includes('left') || pointerMatch.name === 'L'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : pointerMatch.name.includes('current') || pointerMatch.name.includes('right') || pointerMatch.name === 'R'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : pointerMatch.name.includes('i')
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          }`}>
                            {pointerMatch.name}
                          </span>
                        )}
                      </div>

                      {/* Array Cell */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base transition-all duration-300 border-2 shadow-lg ${
                          highlightType === 'matched' && isHighlighted
                            ? 'bg-emerald-500 text-slate-950 border-emerald-300 scale-110 shadow-emerald-500/30'
                            : isHighlighted
                            ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 scale-105 shadow-indigo-500/20'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        <span>{val}</span>
                      </div>

                      {/* Index label */}
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        i = {idx}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hash Map State Visualizer */}
          {currentStep.hashState !== undefined && (
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Hash Map State (`seen` dictionary):</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">key: value ➜ val: index</span>
              </div>

              {Object.keys(currentStep.hashState || {}).length === 0 ? (
                <div className="py-2.5 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-500 italic text-center">
                  seen = &#123; &#125; (Empty Dictionary — No items stored yet)
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(currentStep.hashState || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between font-mono text-xs animate-in zoom-in-95 duration-150"
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">num:</span>
                        <span className="text-white font-bold">{key}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">idx:</span>
                        <span className="text-emerald-400 font-bold">{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Stack visualization if present */}
          {currentStep.stackState && (
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-300">Stack State (LIFO):</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentStep.stackState.length === 0 ? (
                  <span className="text-xs font-mono text-slate-500 italic">[ Empty Stack ]</span>
                ) : (
                  currentStep.stackState.map((elem, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                      {elem}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Live Step Variables Inspector */}
          {currentStep.variables && Object.keys(currentStep.variables).length > 0 && (
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Variables Watcher:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(currentStep.variables).map(([k, v]) => (
                  <div key={k} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs flex items-center gap-1.5">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-emerald-400 font-bold">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Intuition & Decision Explanation */}
          <div className="p-4 rounded-2xl bg-[#1e1b4b]/50 border border-indigo-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Why this step happens:</span>
            </div>
            <p className="text-slate-200 font-sans">
              {currentStep.explanation}
            </p>
          </div>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all disabled:opacity-30 cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2.5 rounded-xl bg-[#6366f1] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#5255e3] active:scale-95 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all disabled:opacity-30 cursor-pointer"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Gauge className="w-3.5 h-3.5" />
            <span>Speed:</span>
            <button
              onClick={() => setPlaybackSpeed(2200)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${playbackSpeed === 2200 ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30' : 'bg-slate-950 text-slate-400'}`}
            >
              0.5x
            </button>
            <button
              onClick={() => setPlaybackSpeed(1400)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${playbackSpeed === 1400 ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30' : 'bg-slate-950 text-slate-400'}`}
            >
              1x
            </button>
            <button
              onClick={() => setPlaybackSpeed(700)}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${playbackSpeed === 700 ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30' : 'bg-slate-950 text-slate-400'}`}
            >
              2x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

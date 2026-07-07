'use client';

import React from 'react';
import { Play, RefreshCw, AlertOctagon, Flame, Zap } from 'lucide-react';
import { useSimulationStore } from '../../stores/useSimulationStore';
import { useCanvasStore } from '../../stores/useCanvasStore';
import { FailureType } from '../../types/simulation';

interface SimulationPanelProps {
  onRunSimulation: (config: any) => void;
  isLoading?: boolean;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({
  onRunSimulation,
  isLoading,
}) => {
  const { config, setConfig, setFailure, isRunning } = useSimulationStore();
  const { nodes, selectedNodeId } = useCanvasStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedNodeFailure = selectedNodeId ? config.failures?.[selectedNodeId] : null;

  const handleFailureSelect = (type: FailureType | null) => {
    if (selectedNodeId) {
      setFailure(selectedNodeId, type);
    }
  };

  return (
    <aside className="w-80 border-l border-slate-800 bg-slate-950/90 backdrop-blur-md p-5 flex flex-col h-full overflow-y-auto select-none">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400 fill-current" />
          <h3 className="text-sm font-bold text-slate-100">Simulation Controls</h3>
        </div>
        {isRunning && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Live Run
          </span>
        )}
      </div>

      {/* Traffic Load Sliders */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Target Traffic (RPS)</span>
            <span className="font-mono text-cyan-400 font-semibold">{config.rps} rps</span>
          </div>
          <input
            type="range"
            min="100"
            max="20000"
            step="100"
            value={config.rps}
            onChange={(e) => setConfig({ rps: parseInt(e.target.value, 10) })}
            className="w-full accent-cyan-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Concurrent Users</span>
            <span className="font-mono text-violet-400 font-semibold">{config.concurrentUsers}</span>
          </div>
          <input
            type="range"
            min="10"
            max="5000"
            step="10"
            value={config.concurrentUsers}
            onChange={(e) => setConfig({ concurrentUsers: parseInt(e.target.value, 10) })}
            className="w-full accent-violet-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300 font-medium">Test Duration</span>
            <span className="font-mono text-emerald-400 font-semibold">{config.duration} sec</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={config.duration}
            onChange={(e) => setConfig({ duration: parseInt(e.target.value, 10) })}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Trigger Run Button */}
      <button
        onClick={() => onRunSimulation(config)}
        disabled={isLoading || isRunning}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 mb-6"
      >
        {isLoading || isRunning ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Simulating Traffic...</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            <span>Execute Simulation</span>
          </>
        )}
      </button>

      {/* Chaos Engineering Failure Injection Section */}
      <div className="pt-4 border-t border-slate-800 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-slate-200">Chaos Engineering</h4>
        </div>

        {selectedNode ? (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px]">Selected Component</span>
              <span className="font-semibold text-slate-100">{selectedNode.data.label}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block">Inject Artificial Failure</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleFailureSelect('DOWN')}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${
                    selectedNodeFailure === 'DOWN'
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  Hard Down
                </button>
                <button
                  onClick={() => handleFailureSelect('DEGRADED')}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${
                    selectedNodeFailure === 'DEGRADED'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  Degraded
                </button>
                <button
                  onClick={() => handleFailureSelect('HIGH_LATENCY')}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${
                    selectedNodeFailure === 'HIGH_LATENCY'
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  +500ms Delay
                </button>
                <button
                  onClick={() => handleFailureSelect(null)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                >
                  Reset Health
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center text-xs text-slate-500">
            <AlertOctagon className="w-5 h-5 mx-auto mb-1 text-slate-600" />
            Click any component on the canvas to inject chaos failure scenarios.
          </div>
        )}
      </div>
    </aside>
  );
};

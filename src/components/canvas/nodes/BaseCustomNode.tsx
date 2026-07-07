'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LucideIcon, AlertTriangle, Activity } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { CustomNodeData } from '../../../types/canvas';

interface BaseCustomNodeProps extends NodeProps<CustomNodeData> {
  icon: LucideIcon;
  colorClass: string;
  borderColorClass: string;
}

export const BaseCustomNode: React.FC<BaseCustomNodeProps> = ({
  data,
  selected,
  icon: Icon,
  colorClass,
  borderColorClass,
}) => {
  const isFailed = data.status === 'FAILED';
  const isWarning = data.status === 'WARNING';
  const isCritical = data.status === 'CRITICAL';
  const isBottleneck = data.isBottleneck;

  return (
    <div
      className={cn(
        'relative min-w-[180px] rounded-xl p-3.5 bg-slate-900/90 backdrop-blur-md border transition-all duration-300 shadow-xl select-none',
        selected ? 'border-cyan-400 ring-2 ring-cyan-400/20' : borderColorClass,
        isBottleneck && 'animate-pulse ring-2 ring-rose-500/50 border-rose-500',
        isFailed && 'border-rose-600/80 bg-rose-950/20',
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-cyan-400 border-2 border-slate-950 !top-[-6px]"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md',
              colorClass,
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 leading-tight">{data.label}</h4>
            <p className="text-[10px] text-slate-400 capitalize">{data.type}</p>
          </div>
        </div>

        {/* Status Badge */}
        {data.status && (
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              data.status === 'HEALTHY' && 'bg-emerald-400 shadow-sm shadow-emerald-400/50',
              data.status === 'WARNING' && 'bg-amber-400 shadow-sm shadow-amber-400/50',
              data.status === 'CRITICAL' && 'bg-rose-400 animate-ping',
              data.status === 'FAILED' && 'bg-rose-600',
            )}
          />
        )}
      </div>

      {/* Bottleneck Warning Flag */}
      {isBottleneck && (
        <div className="mb-2 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 flex items-center gap-1.5 text-[10px] font-semibold text-rose-400">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          <span>Bottleneck Detected</span>
        </div>
      )}

      {/* Real-time Simulation Stats (if running) */}
      {(data.latencyMs !== undefined || data.throughputRps !== undefined) && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] grid grid-cols-2 gap-1 text-slate-300">
          <div>
            <span className="text-slate-500 block">Latency</span>
            <span className="font-mono font-semibold text-cyan-400">
              {data.latencyMs ? `${data.latencyMs}ms` : '0ms'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Throughput</span>
            <span className="font-mono font-semibold text-violet-400">
              {data.throughputRps ? `${Math.round(data.throughputRps)} rps` : '0 rps'}
            </span>
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-cyan-400 border-2 border-slate-950 !bottom-[-6px]"
      />
    </div>
  );
};

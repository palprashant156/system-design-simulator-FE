"use client";

import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { SimulationResultNode } from "../../types/simulation";

interface BottleneckAlertProps {
  bottlenecks: SimulationResultNode[];
}

export const BottleneckAlert: React.FC<BottleneckAlertProps> = ({
  bottlenecks,
}) => {
  if (bottlenecks.length === 0) return null;

  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2.5 mb-2 text-rose-400 font-semibold text-sm">
        <AlertTriangle className="w-5 h-5" />
        <span>
          System Bottleneck Detected ({bottlenecks.length} components affected)
        </span>
      </div>

      <div className="space-y-1.5">
        {bottlenecks.map((item) => (
          <div
            key={item.nodeId}
            className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-900/60 border border-rose-500/20 text-slate-200"
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-mono text-rose-300 font-medium">
                {item.nodeId}
              </span>
              <span className="text-[10px] text-slate-400">
                ({item.nodeType})
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-slate-400">
                Latency:{" "}
                <span className="text-rose-400 font-bold">
                  {item.latencyMs}ms
                </span>
              </span>
              <span className="text-slate-400">
                Error Rate:{" "}
                <span className="text-amber-400 font-bold">
                  {(item.errorRate * 100).toFixed(1)}%
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

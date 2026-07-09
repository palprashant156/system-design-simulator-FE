"use client";

import React from "react";
import { Save, Play, RefreshCw, Layers } from "lucide-react";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onSave?: () => void;
  onSimulate?: () => void;
  isSaving?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  title = "System Design Simulator",
  subtitle,
  onSave,
  onSimulate,
  isSaving,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
      <div>
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Save className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span>{isSaving ? "Saving..." : "Save Architecture"}</span>
          </button>
        )}

        {onSimulate && (
          <button
            onClick={onSimulate}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Traffic Simulation</span>
          </button>
        )}
      </div>
    </header>
  );
};

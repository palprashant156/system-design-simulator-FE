"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowRight, Trash2, Clock } from "lucide-react";
import { Project } from "../../types/api";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => {
  const formattedDate = new Date(project.updatedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(project.id);
              }}
              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <h3 className="font-semibold text-slate-100 text-base mb-1 group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          {formattedDate}
        </span>

        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Open Canvas</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

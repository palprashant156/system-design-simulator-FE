"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Topbar } from "../../../components/layout/Topbar";
import { api } from "../../../lib/api";
import { Template, Project } from "../../../types/api";
import { Layers, GitFork, RefreshCw, Sparkles } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();

  const { data: templates = [], isLoading } = useQuery<Template[]>({
    queryKey: ["templates"],
    queryFn: async (): Promise<any> => {
      return api.get("/templates");
    },
  });

  const forkMutation = useMutation({
    mutationFn: async (templateId: string): Promise<any> => {
      const res: any = await api.post(`/templates/${templateId}/fork`);
      return res as Project;
    },
    onSuccess: (newProject) => {
      if (newProject && newProject.id) {
        router.push(`/projects/${newProject.id}`);
      }
    },
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto">
      <Topbar
        title="Architecture Templates"
        subtitle="One-click clone production-grade system architectures built by senior engineers"
      />

      <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-slate-500 text-xs gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Loading built-in architecture templates...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold uppercase tracking-wider border border-cyan-500/30">
                      {tpl.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {Array.isArray(tpl.nodes) ? tpl.nodes.length : 0}{" "}
                        Components
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Built-in Template
                  </span>
                  <button
                    onClick={() => forkMutation.mutate(tpl.id)}
                    disabled={forkMutation.isPending}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>
                      {forkMutation.isPending
                        ? "Forking Template..."
                        : "Fork into My Projects"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Topbar } from "../../../../../components/layout/Topbar";
import { LatencyTrend } from "../../../../../components/analytics/LatencyTrend";
import { ThroughputChart } from "../../../../../components/analytics/ThroughputChart";
import { useProject } from "../../../../../hooks/useProject";
import { api } from "../../../../../lib/api";
import { AnalyticsTrendsResponse } from "../../../../../types/api";
import { BarChart3, RefreshCw, AlertTriangle } from "lucide-react";

export default function AnalyticsDashboardPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const { data: project } = useProject(projectId);

  const { data: analytics, isLoading } = useQuery<AnalyticsTrendsResponse>({
    queryKey: ["analyticsTrends", projectId],
    queryFn: async (): Promise<any> => {
      return api.get(`/analytics/${projectId}/trends`);
    },
    enabled: Boolean(projectId),
  });

  const timeSeries = analytics?.timeSeries || [];
  const bottleneckFreq = analytics?.bottleneckFrequency || {};

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto">
      <Topbar
        title={`${project?.name || "Project"} — Analytics Dashboard`}
        subtitle="Historical latency, throughput metrics, and bottleneck frequency analysis"
      />

      <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-slate-500 text-xs gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Loading historical analytics...</span>
          </div>
        ) : timeSeries.length > 0 ? (
          <>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LatencyTrend data={timeSeries} />
              <ThroughputChart data={timeSeries} />
            </div>

            {/* Bottleneck Frequency Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Component Bottleneck Frequency Breakdown
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(bottleneckFreq).map(([nodeId, item]) => (
                  <div
                    key={nodeId}
                    className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-cyan-400 font-semibold block">
                        {nodeId}
                      </span>
                      <span className="text-[10px] text-slate-500 capitalize">
                        {item.nodeType}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 font-bold border border-rose-500/30">
                      {item.count} Bottlenecks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
            <BarChart3 className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <h3 className="text-sm font-semibold text-slate-300">
              No simulation data recorded
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Run simulations on the Workbench tab to generate analytics trend
              lines.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

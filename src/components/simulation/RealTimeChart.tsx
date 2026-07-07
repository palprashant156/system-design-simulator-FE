'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { SimulationResultNode } from '../../types/simulation';

interface RealTimeChartProps {
  data: SimulationResultNode[];
}

export const RealTimeChart: React.FC<RealTimeChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-500">
        No simulation metrics available yet. Execute a simulation run to view real-time node metrics.
      </div>
    );
  }

  const chartData = data.map((item) => ({
    node: item.nodeId,
    latency: item.latencyMs,
    throughput: item.throughputRps,
    cpu: item.cpuUsage,
  }));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md">
      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
        Per-Node Latency & Throughput Distribution
      </h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="node" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#f8fafc',
              }}
            />
            <Bar dataKey="latency" name="Latency (ms)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="throughput" name="Throughput (RPS)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

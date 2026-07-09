"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AnalyticsTrendPoint } from "../../types/api";

interface LatencyTrendProps {
  data: AnalyticsTrendPoint[];
}

export const LatencyTrend: React.FC<LatencyTrendProps> = ({ data }) => {
  const formattedData = data.map((item, idx) => ({
    name: `Run #${idx + 1}`,
    avgLatency: item.avgLatencyMs,
    maxLatency: item.maxLatencyMs,
    time: new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md">
      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
        Latency Trends (Average vs Max)
      </h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
            />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#f8fafc",
              }}
            />
            <Line
              type="monotone"
              dataKey="avgLatency"
              name="Avg Latency (ms)"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 4, fill: "#06b6d4" }}
            />
            <Line
              type="monotone"
              dataKey="maxLatency"
              name="Max Latency (ms)"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ r: 4, fill: "#f43f5e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

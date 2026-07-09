"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { AnalyticsTrendPoint } from "../../types/api";

interface ThroughputChartProps {
  data: AnalyticsTrendPoint[];
}

export const ThroughputChart: React.FC<ThroughputChartProps> = ({ data }) => {
  const formattedData = data.map((item, idx) => ({
    name: `Run #${idx + 1}`,
    throughput: item.avgThroughputRps,
    errors: Math.round(item.avgErrorRate * 100),
  }));

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md">
      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
        Throughput (RPS) & Error Rate History
      </h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
            <Area
              type="monotone"
              dataKey="throughput"
              name="Throughput (RPS)"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

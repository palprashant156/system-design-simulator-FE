'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Topbar } from '../../../../../components/layout/Topbar';
import { SimulationPanel } from '../../../../../components/simulation/SimulationPanel';
import { MetricsCard } from '../../../../../components/simulation/MetricsCard';
import { BottleneckAlert } from '../../../../../components/simulation/BottleneckAlert';
import { RealTimeChart } from '../../../../../components/simulation/RealTimeChart';
import { FlowCanvas } from '../../../../../components/canvas/FlowCanvas';
import { useProject } from '../../../../../hooks/useProject';
import { useSimulation } from '../../../../../hooks/useSimulation';
import { useDiagram } from '../../../../../hooks/useDiagram';
import { useCanvasStore } from '../../../../../stores/useCanvasStore';
import { useSimulationStore } from '../../../../../stores/useSimulationStore';
import { Activity, Zap, ShieldAlert, Clock } from 'lucide-react';

export default function SimulationWorkbenchPage() {
  const params = useParams();
  const projectId = params?.id as string;

  const { data: project } = useProject(projectId);
  const { data: diagram } = useDiagram(projectId);
  const { runSimulation, isStarting } = useSimulation(projectId);
  const { liveMetrics } = useSimulationStore();
  const { setNodes, setEdges } = useCanvasStore();

  // Populate canvas when diagram loads from server
  useEffect(() => {
    if (diagram) {
      if (diagram.nodes && Array.isArray(diagram.nodes)) {
        setNodes(
          diagram.nodes.map((n: any) => ({
            id: n.id,
            type: n.type,
            position: { x: n.positionX, y: n.positionY },
            data: { label: n.label, type: n.type, ...(n.data || {}) },
          })),
        );
      }
      if (diagram.edges && Array.isArray(diagram.edges)) {
        setEdges(
          diagram.edges.map((e: any) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            label: e.label || undefined,
            type: 'animatedEdge',
            animated: true,
          })),
        );
      }
    }
  }, [diagram, setNodes, setEdges]);

  const metricsList = Object.values(liveMetrics);
  const bottlenecks = metricsList.filter((m) => m.isBottleneck);

  const avgLatency = metricsList.length
    ? (metricsList.reduce((acc, m) => acc + m.latencyMs, 0) / metricsList.length).toFixed(1)
    : '0';

  const totalThroughput = metricsList.length
    ? metricsList.reduce((acc, m) => acc + m.throughputRps, 0).toFixed(0)
    : '0';

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      <Topbar
        title={`${project?.name || 'Project'} — Simulation Workbench`}
        subtitle="Execute high-concurrency traffic runs and observe real-time component bottlenecks and chaos failures"
      />

      <div className="flex-1 flex h-full overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 space-y-6">
          {/* Top Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricsCard
              title="Average Latency"
              value={`${avgLatency} ms`}
              subtitle="System-wide roundtrip"
              icon={Clock}
              colorClass="bg-gradient-to-tr from-cyan-500 to-blue-600"
            />
            <MetricsCard
              title="Aggregated Throughput"
              value={`${totalThroughput} RPS`}
              subtitle="Served requests per sec"
              icon={Zap}
              colorClass="bg-gradient-to-tr from-violet-500 to-indigo-600"
            />
            <MetricsCard
              title="Active Nodes"
              value={metricsList.length}
              subtitle="Participating components"
              icon={Activity}
              colorClass="bg-gradient-to-tr from-emerald-500 to-teal-600"
            />
            <MetricsCard
              title="Bottlenecks"
              value={bottlenecks.length}
              subtitle="Components experiencing overload"
              icon={ShieldAlert}
              colorClass="bg-gradient-to-tr from-rose-500 to-amber-600"
            />
          </div>

          {/* Bottleneck Alerts */}
          <BottleneckAlert bottlenecks={bottlenecks} />

          {/* Live Canvas View */}
          <div className="h-[400px] border border-slate-800 rounded-xl overflow-hidden relative">
            <FlowCanvas />
          </div>

          {/* Real-time Per-Node Performance Distribution */}
          <RealTimeChart data={metricsList} />
        </div>

        {/* Right Controls Panel */}
        <SimulationPanel
          onRunSimulation={(config) => runSimulation(config)}
          isLoading={isStarting}
        />
      </div>
    </div>
  );
}

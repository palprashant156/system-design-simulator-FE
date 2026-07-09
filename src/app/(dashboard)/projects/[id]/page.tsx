"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Topbar } from "../../../../components/layout/Topbar";
import { NodePalette } from "../../../../components/canvas/NodePalette";
import { FlowCanvas } from "../../../../components/canvas/FlowCanvas";
import { useProject } from "../../../../hooks/useProject";
import { useDiagram, useSaveDiagram } from "../../../../hooks/useDiagram";
import { useCanvasStore } from "../../../../stores/useCanvasStore";

export default function CanvasEditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const { data: project } = useProject(projectId);
  const { data: diagram } = useDiagram(projectId);
  const saveDiagramMutation = useSaveDiagram(projectId);

  const { nodes, edges, setNodes, setEdges } = useCanvasStore();

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
            type: "animatedEdge",
            animated: true,
          })),
        );
      }
    }
  }, [diagram, setNodes, setEdges]);

  const handleSave = async () => {
    const formattedNodes = nodes.map((n) => ({
      id: n.id,
      type: n.type,
      label: n.data.label,
      positionX: n.position.x,
      positionY: n.position.y,
      data: n.data,
    }));

    const formattedEdges = edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: typeof e.label === "string" ? e.label : undefined,
    }));

    await saveDiagramMutation.mutateAsync({
      nodes: formattedNodes,
      edges: formattedEdges,
    });
  };

  const handleRunSimulation = async () => {
    try {
      await handleSave();
      router.push(`/projects/${projectId}/simulate`);
    } catch (err) {
      console.error("Failed to save diagram before simulation:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      <Topbar
        title={project?.name || "Architecture Canvas"}
        subtitle="Drag & drop infrastructure components onto the canvas to construct your system diagram"
        onSave={handleSave}
        isSaving={saveDiagramMutation.isPending}
        onSimulate={handleRunSimulation}
      />

      <div className="flex-1 flex h-full overflow-hidden relative">
        <NodePalette />
        <FlowCanvas />
      </div>
    </div>
  );
}

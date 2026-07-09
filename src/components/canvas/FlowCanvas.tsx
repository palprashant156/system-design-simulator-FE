"use client";

import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCanvasStore } from "../../stores/useCanvasStore";
import { ApiGatewayNode } from "./nodes/ApiGatewayNode";
import { LoadBalancerNode } from "./nodes/LoadBalancerNode";
import { MicroserviceNode } from "./nodes/MicroserviceNode";
import { DatabaseNode } from "./nodes/DatabaseNode";
import { AnimatedEdge } from "./edges/AnimatedEdge";
import { CustomNodeData } from "../../types/canvas";

const nodeTypes = {
  "api-gateway": ApiGatewayNode,
  "load-balancer": LoadBalancerNode,
  microservice: MicroserviceNode,
  database: DatabaseNode,
  postgresql: DatabaseNode,
  mysql: DatabaseNode,
  redis: DatabaseNode,
  cache: DatabaseNode,
  kafka: MicroserviceNode,
  rabbitmq: MicroserviceNode,
  cdn: ApiGatewayNode,
  "authentication-service": ApiGatewayNode,
  "notification-service": MicroserviceNode,
  "search-service": MicroserviceNode,
  "object-storage": DatabaseNode,
};

const edgeTypes = {
  animatedEdge: AnimatedEdge,
};

export const FlowCanvasContent: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
  } = useCanvasStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow/type");
      const label = event.dataTransfer.getData("application/reactflow/label");

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<CustomNodeData> = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: {
          label,
          type,
          status: "HEALTHY",
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode],
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        className="bg-slate-950"
      >
        <Background color="#1e293b" gap={16} size={1} />
        <Controls className="!bg-slate-900 !border-slate-800 !text-slate-200 !rounded-lg" />
        <MiniMap
          nodeColor="#06b6d4"
          maskColor="rgba(2, 6, 23, 0.7)"
          className="!bg-slate-900 !border-slate-800 !rounded-lg"
        />
      </ReactFlow>
    </div>
  );
};

export const FlowCanvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvasContent />
    </ReactFlowProvider>
  );
};

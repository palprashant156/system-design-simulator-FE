import { Node, Edge } from 'reactflow';

export type ComponentCategory =
  | 'compute'
  | 'storage'
  | 'network'
  | 'messaging'
  | 'cache'
  | 'service';

export interface ComponentDefinition {
  type: string;
  label: string;
  category: ComponentCategory;
  description: string;
  icon: string;
  defaultData?: Record<string, any>;
}

export interface CustomNodeData {
  label: string;
  type: string;
  status?: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'FAILED';
  isBottleneck?: boolean;
  latencyMs?: number;
  throughputRps?: number;
  errorRate?: number;
  cpuUsage?: number;
  memoryUsage?: number;
  config?: Record<string, any>;
}

export type CustomNode = Node<CustomNodeData>;
export type CustomEdge = Edge;

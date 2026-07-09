export type FailureType = "DOWN" | "DEGRADED" | "HIGH_LATENCY";

export interface SimulationConfig {
  rps: number;
  concurrentUsers: number;
  duration: number;
  failures?: Record<string, FailureType>;
}

export interface SimulationResultNode {
  id?: string;
  nodeId: string;
  nodeType: string;
  status: "HEALTHY" | "WARNING" | "CRITICAL" | "FAILED";
  latencyMs: number;
  throughputRps: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  isBottleneck: boolean;
}

export interface SimulationRun {
  id: string;
  projectId: string;
  config: SimulationConfig;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  createdAt: string;
  completedAt?: string;
  results: SimulationResultNode[];
}

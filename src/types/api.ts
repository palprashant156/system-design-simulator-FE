export interface ApiResponse<T> {
  data: T;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  nodes: any[];
  edges: any[];
  isPublic: boolean;
  createdAt: string;
}

export interface AnalyticsTrendPoint {
  simulationId: string;
  timestamp: string;
  config: any;
  avgLatencyMs: number;
  maxLatencyMs: number;
  avgThroughputRps: number;
  avgErrorRate: number;
  bottleneckCount: number;
}

export interface AnalyticsTrendsResponse {
  projectId: string;
  totalSimulations: number;
  timeSeries: AnalyticsTrendPoint[];
  bottleneckFrequency: Record<string, { nodeType: string; count: number }>;
}

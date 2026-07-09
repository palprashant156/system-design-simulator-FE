import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { getSocket } from "../lib/socket";
import { useSimulationStore } from "../stores/useSimulationStore";
import { useCanvasStore } from "../stores/useCanvasStore";
import { SimulationConfig, SimulationRun } from "../types/simulation";

export const useSimulation = (projectId: string) => {
  const queryClient = useQueryClient();
  const { updateLiveMetric, setIsRunning, setActiveSimulationId } =
    useSimulationStore();
  const { updateNodeData } = useCanvasStore();

  // Socket.IO real-time event listener setup
  useEffect(() => {
    if (!projectId) return;

    const socket = getSocket();

    socket.emit("join:project", projectId);

    socket.on("simulation:started", (data) => {
      setIsRunning(true);
      if (data.simulationId) {
        setActiveSimulationId(data.simulationId);
      }
    });

    socket.on("simulation:node-update", (data) => {
      if (data.nodeId) {
        updateNodeData(data.nodeId, {
          status: data.status,
          isBottleneck: data.isBottleneck,
        });
      }
    });

    socket.on("simulation:metrics", (metric) => {
      updateLiveMetric(metric);
      if (metric.nodeId) {
        updateNodeData(metric.nodeId, {
          latencyMs: metric.latencyMs,
          throughputRps: metric.throughputRps,
          errorRate: metric.errorRate,
          cpuUsage: metric.cpuUsage,
          memoryUsage: metric.memoryUsage,
          status: metric.status,
          isBottleneck: metric.isBottleneck,
        });
      }
    });

    socket.on("simulation:completed", (data) => {
      setIsRunning(false);
      queryClient.invalidateQueries({
        queryKey: ["simulationHistory", projectId],
      });
    });

    return () => {
      socket.emit("leave:project", projectId);
      socket.off("simulation:started");
      socket.off("simulation:node-update");
      socket.off("simulation:metrics");
      socket.off("simulation:completed");
    };
  }, [
    projectId,
    updateLiveMetric,
    setIsRunning,
    setActiveSimulationId,
    updateNodeData,
    queryClient,
  ]);

  const runSimulationMutation = useMutation({
    mutationFn: async (config: SimulationConfig): Promise<any> => {
      return api.post(`/simulation/${projectId}/run`, config);
    },
  });

  const historyQuery = useQuery<SimulationRun[]>({
    queryKey: ["simulationHistory", projectId],
    queryFn: async (): Promise<any> => {
      return api.get(`/simulation/${projectId}/history`);
    },
    enabled: Boolean(projectId),
  });

  return {
    runSimulation: runSimulationMutation.mutateAsync,
    isStarting: runSimulationMutation.isPending,
    history: historyQuery.data || [],
    isLoadingHistory: historyQuery.isLoading,
  };
};

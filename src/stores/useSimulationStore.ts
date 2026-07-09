import { create } from "zustand";
import {
  SimulationConfig,
  SimulationResultNode,
  FailureType,
} from "../types/simulation";

interface SimulationState {
  config: SimulationConfig;
  isRunning: boolean;
  liveMetrics: Record<string, SimulationResultNode>;
  failures: Record<string, FailureType>;
  activeSimulationId: string | null;
  setConfig: (config: Partial<SimulationConfig>) => void;
  setFailure: (nodeId: string, failureType: FailureType | null) => void;
  setIsRunning: (isRunning: boolean) => void;
  setActiveSimulationId: (id: string | null) => void;
  updateLiveMetric: (metric: SimulationResultNode) => void;
  resetSimulation: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  config: {
    rps: 1000,
    concurrentUsers: 100,
    duration: 10,
    failures: {},
  },
  isRunning: false,
  liveMetrics: {},
  failures: {},
  activeSimulationId: null,

  setConfig: (newConfig) =>
    set({
      config: {
        ...get().config,
        ...newConfig,
      },
    }),

  setFailure: (nodeId, failureType) => {
    const currentFailures = { ...get().failures };
    if (failureType === null) {
      delete currentFailures[nodeId];
    } else {
      currentFailures[nodeId] = failureType;
    }

    set({
      failures: currentFailures,
      config: {
        ...get().config,
        failures: currentFailures,
      },
    });
  },

  setIsRunning: (isRunning) => set({ isRunning }),
  setActiveSimulationId: (id) => set({ activeSimulationId: id }),

  updateLiveMetric: (metric) => {
    set({
      liveMetrics: {
        ...get().liveMetrics,
        [metric.nodeId]: metric,
      },
    });
  },

  resetSimulation: () =>
    set({
      isRunning: false,
      liveMetrics: {},
      activeSimulationId: null,
    }),
}));

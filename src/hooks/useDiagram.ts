import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useDiagram = (projectId: string) => {
  return useQuery({
    queryKey: ["diagram", projectId],
    queryFn: async (): Promise<any> => {
      return api.get(`/diagrams/${projectId}`);
    },
    enabled: Boolean(projectId),
  });
};

export const useSaveDiagram = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { nodes: any[]; edges: any[] }) => {
      return api.post(`/diagrams/${projectId}/save`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagram", projectId] });
    },
  });
};

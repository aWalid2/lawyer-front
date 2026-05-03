import { mockClientStatuses } from "./mockData";

// Mock implementation
export const updateClientStatus = async (id: string, data: { name: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockClientStatuses.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockClientStatuses[index] = { ...mockClientStatuses[index], name: data.name };
    return mockClientStatuses[index];
  }
  throw new Error("Client status not found");
};

/*
// REAL API IMPLEMENTATION (Uncomment when backend is ready)
import api from "@/lib/api";

export const updateClientStatus = async (id: string, data: { name: string }) => {
    const response = await api.put(`/client-status/${id}`, data);
    return response.data;
};
*/

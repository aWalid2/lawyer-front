import { mockClientStatuses } from "./mockData";

// Mock implementation
export const deleteClientStatus = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = mockClientStatuses.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockClientStatuses.splice(index, 1);
    return { success: true };
  }
  throw new Error("Client status not found");
};

/*
// REAL API IMPLEMENTATION (Uncomment when backend is ready)
import api from "@/lib/api";

export const deleteClientStatus = async (id: string) => {
    const response = await api.delete(`/client-status/${id}`);
    return response.data;
};
*/

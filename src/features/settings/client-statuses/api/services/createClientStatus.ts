import { mockClientStatuses } from "./mockData";

// Mock implementation
export const createClientStatus = async (data: { name: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newStatus = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    _count: { clients: 0 },
  };

  mockClientStatuses.unshift(newStatus);
  return newStatus;
};

/*
// REAL API IMPLEMENTATION (Uncomment when backend is ready)
import api from "@/lib/api";

export const createClientStatus = async (data: { name: string }) => {
    const response = await api.post('/client-status', data);
    return response.data;
};
*/

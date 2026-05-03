import { mockClientStatuses } from "./mockData";

// Mock implementation
export const getClientStatuses = async (page: number = 1, limit: number = 15) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = mockClientStatuses.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    meta: {
      total_pages: Math.ceil(mockClientStatuses.length / limit),
    },
  };
};

/* 
// REAL API IMPLEMENTATION (Uncomment when backend is ready)
import api from "@/lib/api";

export const getClientStatuses = async (page?: number, limit?: number) => {
    const response = await api.get<{ data: ClientStatusT[], meta: { total_pages: number } }>(`/client-status?page=${page}&limit=${limit}`);
    return response.data;
};
*/

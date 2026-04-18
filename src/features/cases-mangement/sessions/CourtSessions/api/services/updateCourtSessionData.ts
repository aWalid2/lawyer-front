import api from "@/lib/api";

export const updateCourtSessionData = async ({ id, data, level }: { id: string | number; data: any, level: string }) => {
  const response = await api.post(`/court-case-data/${id}?level=${level}`, data);
  return response.data;
};

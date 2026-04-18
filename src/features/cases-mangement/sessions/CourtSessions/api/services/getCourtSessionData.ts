import api from "@/lib/api";

export const getCourtSessionData = async (id: string | number, level: string) => {
  const response = await api.get(`/court-case-data/level/${id}?level=${level}`);
  return response.data;
};

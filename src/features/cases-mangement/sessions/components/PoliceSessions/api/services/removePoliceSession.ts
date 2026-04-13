import api from "@/lib/api";


export const removePoliceSession = async (id: number) => {
  const response = await api.delete(`/police-sessions/${id}`);
  return response.data;
};
import api from "@/lib/api";

export const fetchClients = async (page: number, limit?: number) => {
  const { data } = await api.get(`/client-profile/all-Clients?page=${page}&limit=${limit}`);
  return data;
};
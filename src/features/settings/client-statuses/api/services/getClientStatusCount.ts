import api from "@/lib/api";

type ClientStatusCountResponse = {
  clientCount: number;
};

export const getClientStatusCount = async (id: string) => {
  const { data } = await api.get<ClientStatusCountResponse>(`/client-status/${id}/count`);

  return data.clientCount;
};
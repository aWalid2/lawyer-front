import api from "@/lib/api";

export const updateClientStatus = async (id: string, data: { name: string }) => {
  const response = await api.patch(`/client-status/${id}`, data);
  return response.data;
};

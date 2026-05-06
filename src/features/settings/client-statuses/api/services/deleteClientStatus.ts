import api from "@/lib/api";

export const deleteClientStatus = async (id: string) => {
  const response = await api.delete(`/client-status/${id}`);
  return response.data;
};

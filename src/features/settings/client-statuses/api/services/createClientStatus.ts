import api from "@/lib/api";

export const createClientStatus = async (data: { name: string }) => {
  const response = await api.post("/client-status", data);
  return response.data;
};

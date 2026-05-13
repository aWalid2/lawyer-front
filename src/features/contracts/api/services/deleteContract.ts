import api from "@/lib/api";

export const deleteContract = async (contractId: string) => {
  const response = await api.delete(`/contracts/${contractId}`);
  return response.data;
};
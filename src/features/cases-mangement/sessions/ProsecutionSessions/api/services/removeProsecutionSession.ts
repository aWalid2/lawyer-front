import api from "@/lib/api";

export const removeProsecutionSession = async (id: number) => {
  const response = await api.delete(`/prosecution-sessions/${id}`);
  return response.data;
};

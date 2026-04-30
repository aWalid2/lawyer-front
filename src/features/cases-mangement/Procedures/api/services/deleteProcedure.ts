import api from "@/lib/api";

export const deleteProcedure = async (id: string | number): Promise<void> => {
  await api.delete(`/procedures/${id}`);
};
import api from "@/lib/api";

export const deleteOtherSession = async (id: string | number): Promise<void> => {
  await api.delete(`/procedures/${id}`);
};

import api from "@/lib/api";

export const deleteExpertSession = async (
  reportId: string | number,
): Promise<void> => {
  await api.delete(`/expert-reports/${reportId}`);
};

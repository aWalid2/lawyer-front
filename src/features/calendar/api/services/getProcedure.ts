import api from "@/lib/api";
import type { Procedure } from "@/features/cases-mangement/Procedures/types";
import { normalizeProcedure } from "@/features/cases-mangement/Procedures/api/services/normalizeProcedure";

export const getProcedure = async (id: string | number): Promise<Procedure> => {
  const response = await api.get(`/procedures/${id}`);
  return normalizeProcedure(response.data);
};
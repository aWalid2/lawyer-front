import api from "@/lib/api";
import type { Procedure } from "../../types";
import { normalizeProcedure } from "./normalizeProcedure";

export const getLastProcedure = async (
  caseId: string | number,
): Promise<Procedure> => {
  const response = await api.get(`/procedures/case/${caseId}/last`);
  return normalizeProcedure(response.data);
};
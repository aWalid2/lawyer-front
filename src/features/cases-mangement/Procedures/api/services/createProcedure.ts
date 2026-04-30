import api from "@/lib/api";
import type { Procedure, ProcedureRequest } from "../../types";
import { normalizeProcedure } from "./normalizeProcedure";

export const createProcedure = async ({
  caseId,
  data,
}: {
  caseId: string | number;
  data: ProcedureRequest;
}): Promise<Procedure> => {
  const response = await api.post(`/procedures/case/${caseId}`, data);
  return normalizeProcedure(response.data);
};
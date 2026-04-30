import api from "@/lib/api";
import type { Procedure, ProcedureRequest } from "../../types";
import { normalizeProcedure } from "./normalizeProcedure";

export const updateProcedure = async ({
  id,
  data,
}: {
  id: string | number;
  data: Partial<ProcedureRequest>;
}): Promise<Procedure> => {
  const response = await api.patch(`/procedures/${id}`, data);
  return normalizeProcedure(response.data);
};
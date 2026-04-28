import api from "@/lib/api";
import type { Procedure } from "../../types";
import { normalizeProcedure } from "./normalizeProcedure";

export const getProcedure = async (id: string | number): Promise<Procedure> => {
  const response = await api.get(`/procedures/${id}`);
  return normalizeProcedure(response.data);
};
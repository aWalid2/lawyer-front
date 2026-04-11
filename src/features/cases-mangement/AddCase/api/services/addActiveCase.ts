import api from "@/lib/api";
import type { ActivePayload } from "../../types/caseT";

export const addActiveCase = async (payload: ActivePayload) => {
  const response = await api.post("cases/active", payload);
  return response.data;
};

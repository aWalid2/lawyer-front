import api from "@/lib/api";
import type { OtherPayload } from "../../types/caseT";

export const addOtherCase = async (payload: OtherPayload) => {
  const response = await api.post("cases/other", payload);
  return response.data;
};

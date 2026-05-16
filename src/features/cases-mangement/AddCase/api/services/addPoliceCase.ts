import api from "@/lib/api";
import type { PolicePayload } from "../../types/caseT";

export const addPoliceCase = async (payload: PolicePayload) => {
  const response = await api.post("cases/police", payload);
  return response.data;
};

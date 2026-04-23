import api from "@/lib/api";
import type { OtherSession } from "../../types/typesOther";
import { normalizeOtherSession } from "./normalizeOtherSession";

export const getOtherSession = async (
  id: string | number
): Promise<OtherSession> => {
  const response = await api.get(`/procedures/${id}`);
  return normalizeOtherSession(response.data);
};

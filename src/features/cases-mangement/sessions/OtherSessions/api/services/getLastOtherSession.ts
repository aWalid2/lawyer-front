import api from "@/lib/api";
import type { OtherSession } from "../../components/typesOther";
import { normalizeOtherSession } from "./normalizeOtherSession";

export const getLastOtherSession = async (
  caseId: string | number,
): Promise<OtherSession> => {
  const response = await api.get(`/procedures/case/${caseId}/last`);
  return normalizeOtherSession(response.data);
};

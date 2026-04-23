import api from "@/lib/api";
import type { OtherSession, OtherSessionRequest } from "../../types/typesOther";
import { normalizeOtherSession } from "./normalizeOtherSession";

export const createOtherSession = async ({
  caseId,
  data,
}: {
  caseId: string | number;
  data: OtherSessionRequest;
}): Promise<OtherSession> => {
  const response = await api.post(`/procedures/case/${caseId}`, data);
  return normalizeOtherSession(response.data);
};

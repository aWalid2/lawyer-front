import api from "@/lib/api";
import type { OtherSession, OtherSessionRequest } from "../../types/typesOther";
import { normalizeOtherSession } from "./normalizeOtherSession";

export const updateOtherSession = async ({
  id,
  data,
}: {
  id: string | number;
  data: Partial<OtherSessionRequest>;
}): Promise<OtherSession> => {
  const response = await api.patch(`/procedures/${id}`, data);
  return normalizeOtherSession(response.data);
};

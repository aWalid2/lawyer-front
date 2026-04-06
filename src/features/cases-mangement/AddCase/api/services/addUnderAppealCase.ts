import api from "@/lib/api";

import type { UnderAppealPayload } from "../../types/caseT";

export const addUnderAppealCase = async (payload: UnderAppealPayload) => {
  const response = await api.post("cases/under-appeal", payload);
  return response.data;
};
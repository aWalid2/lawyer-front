// case-status/api/service/addCaseStatus.ts
import api from "@/lib/api";

export const addCaseStatus = async (data: any) => {
  const response = await api.post("/case-status", data);
  return response.data;
};
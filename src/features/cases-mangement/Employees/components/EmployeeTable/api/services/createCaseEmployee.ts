import api from "@/lib/api";
import type { CaseEmployeeRequest } from "../../types";

interface CreateCaseEmployeePayload {
  caseId: string | number;
  data: CaseEmployeeRequest;
}

export const createCaseEmployee = async ({
  caseId,
  data,
}: CreateCaseEmployeePayload) => {
  const response = await api.post(`/case-employee/${caseId}`, data);
  return response.data;
};
import api from "@/lib/api";
import type { CaseEmployeeRequest } from "../../types";

interface UpdateCaseEmployeePayload {
  id: number;
  data: CaseEmployeeRequest;
}

export const updateCaseEmployee = async ({
  id,
  data,
}: UpdateCaseEmployeePayload) => {
  const response = await api.patch(`/case-employee/${id}`, data);
  return response.data;
};
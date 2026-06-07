import api from "@/lib/api";


interface CreateCaseEmployeePayload {
  caseId: string | number;
  data: any;
}

export const createCaseEmployee = async ({
  caseId,
  data,
}: CreateCaseEmployeePayload) => {
  const response = await api.post(`/case-employee/${caseId}`, data);
  return response.data;
};
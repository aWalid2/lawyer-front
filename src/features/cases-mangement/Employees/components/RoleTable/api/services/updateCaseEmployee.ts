import api from "@/lib/api";

interface UpdateCaseEmployeePayload {
  id: number;
  data: any;
}

export const updateCaseEmployee = async ({
  id,
  data,
}: UpdateCaseEmployeePayload) => {
  const response = await api.patch(`/case-employee/${id}`, data);
  return response.data;
};
import api from "@/lib/api";

interface CreateCaseExpensePayload {
  caseId: string | number;
  data: FormData;
}

export const createCaseExpense = async ({
  caseId,
  data,
}: CreateCaseExpensePayload) => {
  const response = await api.post(`/case-expenses/${caseId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
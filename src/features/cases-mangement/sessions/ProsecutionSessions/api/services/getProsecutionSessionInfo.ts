import api from "@/lib/api";


export const getProsecutionSessionInfo = async (caseId: number) => {
  try {
    const response = await api.get(`/prosecution/case-data/${caseId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

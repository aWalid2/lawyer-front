import api from "@/lib/api";


export const getPoliceSessionInfo = async (caseId: number) => {
  try {
    const response = await api.get(`/police-department/${caseId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};
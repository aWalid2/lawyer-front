import api from "@/lib/api";


export const getPoliceSessionInfo = async (caseId: number) => {
  const response = await api.get(`/police-department/${caseId}`);
  return response.data;
};
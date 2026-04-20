import api from "@/lib/api";

export const getFirstInstanceSessionTable = async (caseId: string | number) => {
    const response = await api.get(`/first-instance/sessions/${caseId}`);
    return response.data;
};

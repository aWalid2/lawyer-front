import api from "@/lib/api";

export const getAppealSessionTable = async (caseId: string | number) => {
    const response = await api.get(`/appeal-session/${caseId}`);
    return response.data;
};

import api from "@/lib/api";

export const getFirstInstanceSessionTable = async (caseId: string | number) => {
    const response = await api.get(`/first-instance-session/${caseId}`);
    return response.data;
};

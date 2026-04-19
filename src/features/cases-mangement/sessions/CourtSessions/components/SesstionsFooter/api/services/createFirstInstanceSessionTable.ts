import api from "@/lib/api";

export const createFirstInstanceSessionTable = async (payload: { caseId: number; data: any }) => {
    const response = await api.post(`/first-instance-session`, {
        ...payload.data,
        case_id: payload.caseId,
    });
    return response.data;
};

import api from "@/lib/api";

export const createAppealSessionTable = async (payload: { caseId: number; data: any }) => {
    const response = await api.post(`/appeal-session`, {
        ...payload.data,
        case_id: payload.caseId,
    });
    return response.data;
};

import api from "@/lib/api";

export const createAppealSessionTable = async (case_id: number, data: any) => {
    const response = await api.post(`/appeal-session/${case_id}`, data);
    return response.data;
};

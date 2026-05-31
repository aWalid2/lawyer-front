import api from "@/lib/api";


export const getCaseStatus = async (
    page?: number,
    limit?: number
) => {
    const params: any = { page, limit };
    const response = await api.get(`case-status`, { params });
    return response.data;
};  
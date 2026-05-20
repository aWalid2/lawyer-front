import api from "@/lib/api";

export const getAllUserReports = async (params?: any) => {
    const response = await api.get("/reports/userReports", {
        params: {
            status: params?.status,
            role_id: params?.role_id,
        }
    });
    return response.data;
};
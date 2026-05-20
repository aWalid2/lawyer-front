import api from "@/lib/api";

export const getAllUserReportsExcel = async (params?: any) => {
    const response = await api.get("/reports/userReports/excel", {
        params,
        responseType: "blob",
    });
    return response.data;
};
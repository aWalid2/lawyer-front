import api from "@/lib/api";

export const getAllUserReportsPdf = async (params?: any) => {
    const response = await api.get("/reports/userReports/pdf", {
        params,
        responseType: "blob",
    });
    return response.data;
};
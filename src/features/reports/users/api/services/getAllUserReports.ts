import api from "@/lib/api";

type GetAllUserReportsParams = {
    status?: string;
    role_id?: string;
    page?: number;
    limit?: number;
};

export type PaginatedUserReportResponse = {
    data: unknown[];
    meta: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
};

export const getAllUserReports = async (params?: GetAllUserReportsParams): Promise<PaginatedUserReportResponse> => {
    const response = await api.get("/reports/userReports", {
        params: {
            status: params?.status,
            role_id: params?.role_id,
            page: params?.page,
            limit: params?.limit,
        }
    });

    return response.data;
};
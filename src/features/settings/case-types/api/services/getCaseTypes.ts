import api from "@/lib/api";
import type { CaseTypeT } from "../../types/casesT";

export const getCaseTypes = async (page?: number, limit?: number) => {
    const response = await api.get<{ data: CaseTypeT[], meta: { total_pages: number } }>(`/case-type?page=${page}&limit=${limit}`);
    return response.data;
};

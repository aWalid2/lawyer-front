import api from "@/lib/api";

export const createPoliceDepartment = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.post(`/police-department/${caseId}`, data);
    return response.data;
};

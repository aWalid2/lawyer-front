import api from "@/lib/api";

export const updatePoliceDepartment = async ({ caseId, data }: { caseId: number; data: any }) => {
    const response = await api.patch(`/police-department/${caseId}`, data);
    return response.data;
};

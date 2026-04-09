import api from "@/lib/api";

export const updateCaseType = async ({ id, data }: { id: string; data: { name: string } }) => {
    const response = await api.patch(`/case-type/${id}`, data);
    return response.data;
};

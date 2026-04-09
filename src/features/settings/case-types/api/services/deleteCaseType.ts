import api from "@/lib/api";

export const deleteCaseType = async (id: string) => {
    const response = await api.delete(`/case-type/${id}`);
    return response.data;
};

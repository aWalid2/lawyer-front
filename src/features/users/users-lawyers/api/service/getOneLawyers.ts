import api from "@/lib/api";

export const getOneLawyer = async ({ id }: { id: string }) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};
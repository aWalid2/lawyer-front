import api from "@/lib/api";

export const getOneLawyer = async ({ id }: { id: string }) => {
    const response = await api.get(`/users/lawyers/${id}`);
    return response.data;
};
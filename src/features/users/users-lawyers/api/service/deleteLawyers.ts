import api from "@/lib/api";

export const deleteLawyer = async ({ id }: { id: string }) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};
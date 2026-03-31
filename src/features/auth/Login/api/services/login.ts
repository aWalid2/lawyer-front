import api from "@/lib/api";

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await api.post("auth/login", credentials);
    return response.data;
};
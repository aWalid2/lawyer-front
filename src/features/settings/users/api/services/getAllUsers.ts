import api from "@/lib/api"


export const getAllUsers = async (role_id?: string) => {
    if (role_id) {
        const response = await api.get("/users/allUsers", {
            params: { role_id },
        });
        return response.data;
    }
    const response = await api.get("/users/allUsers");
    return response.data;
};
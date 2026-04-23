import api from "@/lib/api"


export const getAllUsers = async () => {
const response = await api.get("/users/allUsers");
return response.data;
}
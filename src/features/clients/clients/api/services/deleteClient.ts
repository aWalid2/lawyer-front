import axios from "axios";

export const deleteClient = async (id: string) => {
    const response = await axios.delete(`/client-profile/${id}`);
    return response.data;
};
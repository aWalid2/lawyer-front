import Cookies from "js-cookie";
import api from "../../../../lib/axios";

const getAuthHeader = () => {
  const token = Cookies.get("auth_token");
  if (!token) throw new Error("Authentication token not found");
  return { Authorization: `Bearer ${token}` };
};

export const fetchClients = async () => {
  try {
    const { data } = await api.get(`/clients`, {
      headers: getAuthHeader(),
    });
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch clients"
    );
  }
};
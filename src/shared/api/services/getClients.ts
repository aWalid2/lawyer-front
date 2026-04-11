import api from "@/lib/api";

export const fetchClients = async () => {
  const { data } = await api.get("/client-profile/all-Clients");
  return data;
};
import api from "@/lib/api";

export const fetchClients = async () => {
  const { data } = await api.get("/clients");
  return data;
};
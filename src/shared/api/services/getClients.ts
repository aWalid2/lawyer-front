import api from "@/lib/api";

export const fetchClients = async (page?: number, limit?: number, search?: string) => {
  const { data } = await api.get("/client-profile/all-Clients", {
    params: {
        page,
        limit,
        search
    }
  });
  return data;
};
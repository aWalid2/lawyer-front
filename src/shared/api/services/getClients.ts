import api from "@/lib/api";

type ClientRecord = {
  id?: number | string;
  user_id?: number | string;
  name?: string;
  user?: { first_name?: string; last_name?: string };
  [key: string]: unknown;
};

export const fetchClients = async (page?: number, limit?: number, search?: string) => {
  if (search && search.trim()) {
    const { data } = await api.get(`/client-profile/search?q=${search}`);
    if (data && data.data) {
      data.data = data.data.map((item: ClientRecord) => ({
        ...item,
        user_id: item.user_id || item.id,
        name: item.name || item.user?.first_name,
      }));
    }
    return data;
  }
  const { data } = await api.get("/client-profile/all-Clients", { params: { page, limit } });
  return data;
};
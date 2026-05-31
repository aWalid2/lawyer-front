import api from "@/lib/api";

export const fetchClients = async (page: number, search?: string, limit?: number) => {
  if (search) {
    const { data } = await api.get(`/client-profile/search?q=${search}`);
    if (data && data.data) {
      data.data = data.data.map((item: any) => ({
        ...item,
        user_id: item.user_id || item.id,
        user: {
          ...item.user,
          first_name: item.name || item.user?.first_name,
          phone: item.phone || item.user?.phone,
        },
        case_count: item.case_count || 0,
      }));
    }
    return data;
  }
  const { data } = await api.get(`/client-profile/all-Clients?page=${page}&limit=${limit || 15}`);
  return data;
};
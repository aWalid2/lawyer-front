import api from "@/lib/api";

export const fetchClients = async (page: number, limit: number, status?: string, search?: string) => {
    if (search && search.trim()) {
        const { data } = await api.get(`/client-profile/search?q=${search}`);
        if (data && data.data) {
            data.data = data.data.map((item: any) => ({
                ...item,
                case_count: item.case_count ?? 0,
                name: item.name || item.user?.first_name || "",
                phone: item.phone || item.user?.phone || "",
            }));
        }
        return data;
    }

    const params: any = { page, limit };
  
    if (status && status !== "all") {
      params.status = status;
    }

    const { data } = await api.get(`reports/clientReports`, { params });
    return data;
};





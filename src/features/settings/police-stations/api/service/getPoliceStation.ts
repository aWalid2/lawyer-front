import api from "@/lib/api";

export const fetchPoliceStations = async (page: number, limit: number, search?: string) => {
  const params: any = { page, limit };

  if (search && search.trim()) {
    params.search = search;
  }

  const { data } = await api.get("/police-station", { params });
  return data;
};
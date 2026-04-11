import api from "@/lib/api";

export const fetchPoliceStations = async (page?: number, limit?: number, search?: string) => {
  const { data } = await api.get("/police-station", {
    params: {
      page,
      limit,
      search
    }
  });
  return data;
};
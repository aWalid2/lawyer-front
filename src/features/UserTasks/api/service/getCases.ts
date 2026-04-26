import api from "@/lib/api";

export const fetchCases = async (page = 1, limit = 15) => {
  const { data } = await api.get("/cases/all-cases", {
    params: { page, limit },
  });

  return data;
};
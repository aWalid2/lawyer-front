import api from "@/lib/api";

export const fetchProsecutions = async (page?: number, limit?: number) => {
  const params: any = { page, limit };

  const { data } = await api.get("/prosecution", { params });
  return data;
};
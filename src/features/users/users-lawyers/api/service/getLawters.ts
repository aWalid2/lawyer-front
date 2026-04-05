import api from "@/lib/api";

export const fetchLawyers = async () => {
  const { data } = await api.get("/lawyer/all");
  return data;
};
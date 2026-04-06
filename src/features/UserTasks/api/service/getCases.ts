import api from "@/lib/api";

export const fetchCases = async () => {
  const { data } = await api.get("/cases/all-cases");
  return data; 
};
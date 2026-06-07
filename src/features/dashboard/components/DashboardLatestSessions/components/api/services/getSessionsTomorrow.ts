import api from "@/lib/api";

export const getSessionsTomorrow = async () => {
  const { data } = await api.get("/sessions/tomorrow");
  return data;
}
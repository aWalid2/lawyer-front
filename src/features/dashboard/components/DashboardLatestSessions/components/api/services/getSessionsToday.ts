import api from "@/lib/api";

export const getSessionsToday = async () => {
  const { data } = await api.get("/sessions/today");
  return data;
}
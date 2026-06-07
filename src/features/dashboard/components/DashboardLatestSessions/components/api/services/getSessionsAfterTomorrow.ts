import api from "@/lib/api";

export const getSessionsAfterTomorrow = async () => {
  const { data } = await api.get("/sessions/day-after-tomorrow");
  return data;
}
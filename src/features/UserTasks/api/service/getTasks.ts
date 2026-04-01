import api from "@/lib/api";

export const fetchTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};
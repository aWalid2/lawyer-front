import api from "@/lib/api";

export const fetchEmployees = async () => {
  const { data } = await api.get("/employee/all");
  return data;
};
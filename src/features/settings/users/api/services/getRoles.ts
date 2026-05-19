import api from "@/lib/api";

export const getRoles = async () => {
  const response = await api.get("/settings/roles");
  return response.data;
};

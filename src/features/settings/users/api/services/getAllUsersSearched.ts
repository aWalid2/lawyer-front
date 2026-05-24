import api from "@/lib/api";

export const getAllUsersSearched = async (searchTerm: string) => {
  const response = await api.get("/users/search", {
    params: {
      q: searchTerm,
    },
  });

  const content = response.data?.data ?? response.data;
  return Array.isArray(content) ? content : [];
};
import api from "@/lib/api";

export const getAllUsersSearched = async (searchTerm: string) => {
  const response = await api.get("/users/search", {
    params: {
      q: searchTerm,
    },
  });

  return response.data;
};
import api from "@/lib/api";

export const addClients = async (formData: FormData) => {
  try {
    const { data } = await api.post("/users/client", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};

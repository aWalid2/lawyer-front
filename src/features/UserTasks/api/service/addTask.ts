
import api from "@/lib/api";

export const taskUser = async (clientData: any) => {
  try {
    const { data } = await api.post("/task", clientData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
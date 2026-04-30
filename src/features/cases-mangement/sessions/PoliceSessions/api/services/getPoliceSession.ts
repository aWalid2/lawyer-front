import api from "@/lib/api";
import { isAxiosError } from "axios";

export const getPoliceSession = async (id: number | string) => {
  try {
    const response = await api.get(`/police-sessions/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
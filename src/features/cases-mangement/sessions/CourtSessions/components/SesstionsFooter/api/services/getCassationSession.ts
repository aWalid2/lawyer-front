import api from "@/lib/api";
import { isAxiosError } from "axios";

export const getCassationSession = async (sessionId: number | string) => {
  try {
    const response = await api.get(`/cassation-session/sessionId/${sessionId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
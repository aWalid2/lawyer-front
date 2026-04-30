import api from "@/lib/api";
import { isAxiosError } from "axios";

export const getAppealSession = async (sessionId: number | string) => {
  try {
    const response = await api.get(`/appeal-session/sesdionId/${sessionId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
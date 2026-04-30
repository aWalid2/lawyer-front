import api from "@/lib/api";
import { isAxiosError } from "axios";

export const getFirstInstanceSession = async (
  sessionId: number | string,
) => {
  try {
    const response = await api.get(`/first-instance/${sessionId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
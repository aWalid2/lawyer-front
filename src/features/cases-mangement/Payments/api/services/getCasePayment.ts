import api from "@/lib/api";
import { normalizeCasePayment } from "./normalizeCasePayment";

export const getCasePayment = async (paymentId: string | number) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return normalizeCasePayment(response.data.data || response.data);
  } catch (error) {
    console.error("Error fetching case payment:", error);
    throw error;
  }
};

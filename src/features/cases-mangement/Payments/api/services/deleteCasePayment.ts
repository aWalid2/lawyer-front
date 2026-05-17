import api from "@/lib/api";

export const deleteCasePayment = async (paymentId: string | number) => {
  try {
    await api.delete(`/payments/${paymentId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting case payment:", error);
    throw error;
  }
};

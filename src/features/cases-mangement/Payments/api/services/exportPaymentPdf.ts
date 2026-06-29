import api from "@/lib/api";

export const exportPaymentPdf = async (
  paymentId: string | number,
): Promise<Blob> => {
  const { data } = await api.get(`/payments/${paymentId}/export/pdf`, {
    responseType: "blob",
  });

  return data;
};

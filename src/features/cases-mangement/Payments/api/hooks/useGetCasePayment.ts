import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCasePayment } from "../services/getCasePayment";

export const useGetCasePayment = (paymentId: string | number | null, enabled = true) => {
  return useQuery({ queryKey: ["case-payment", paymentId], queryFn: () => getCasePayment(paymentId!), enabled: Boolean(paymentId) && enabled, retry: (failureCount, error) => { const axiosError = error as AxiosError; if (axiosError?.response?.status === 404) return false; return failureCount < 2; }, });
};

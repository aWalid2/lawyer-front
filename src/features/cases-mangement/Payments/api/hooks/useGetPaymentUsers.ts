import { useQuery } from "@tanstack/react-query";
import { getPaymentUsers } from "../services/getPaymentUsers";

export const useGetPaymentUsers = () => {
  return useQuery({ queryKey: ["payment-users"], queryFn: getPaymentUsers });
};

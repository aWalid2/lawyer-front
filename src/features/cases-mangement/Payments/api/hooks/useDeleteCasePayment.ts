import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCasePayment } from "../services/deleteCasePayment";

export const useDeleteCasePayment = (caseId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: any) => deleteCasePayment(paymentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-payments", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case-payments-summary", caseId] });
    },
  });
};

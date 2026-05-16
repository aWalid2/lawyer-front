import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCasePayment } from "../services/updateCasePayment";

export const useUpdateCasePayment = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paymentId, data }: any) => updateCasePayment({ paymentId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-payments", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case-payments-summary", caseId] });
    },
  });
};

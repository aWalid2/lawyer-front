import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCasePayment } from "../services/createCasePayment";

export const useCreateCasePayment = (caseId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createCasePayment({ caseId, data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-payments", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case-payments-summary", caseId] });
    },
  });
};

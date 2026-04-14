import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProsecutionSession } from "../services/createProsecutionSession";

export const useCreateProsecutionSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createProsecutionSession(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prosecution-sessions"] });
        },
    });
};
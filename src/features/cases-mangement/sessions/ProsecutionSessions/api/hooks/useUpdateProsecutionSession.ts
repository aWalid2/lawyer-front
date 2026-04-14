import { useMutation } from "@tanstack/react-query";
import { updateProsecutionSession } from "../services/updateProsecutionSession";

export const useUpdateProsecutionSession = () => {
    return useMutation({
        mutationFn: (data: any) => updateProsecutionSession(data),
    });
};
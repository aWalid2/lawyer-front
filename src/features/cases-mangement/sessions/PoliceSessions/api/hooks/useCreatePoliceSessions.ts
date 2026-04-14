import { useMutation } from "@tanstack/react-query";
import { createPoliceSessions } from "../services/createPoliceSessions";

export const useCreatePoliceSessions = () => {
    return useMutation({
        mutationFn: (data: any) => createPoliceSessions(data),
    });
}
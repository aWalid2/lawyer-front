import { useMutation } from "@tanstack/react-query";
import { rempovePoliceSessions } from "../services/removePoliceSession";

export const useRemovePoliceSessions= ({id}) => {
    return useMutation({
        mutationFn: () => rempovePoliceSessions(id),
    });
}
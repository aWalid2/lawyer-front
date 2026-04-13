import { useQuery } from "@tanstack/react-query";
import { getPoliceSessions } from "../services/getPoliceSessions";

export const useGetPoliceSessions = () => {
    return useQuery({
        queryKey: ["police-sessions"],
        queryFn: getPoliceSessions,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}
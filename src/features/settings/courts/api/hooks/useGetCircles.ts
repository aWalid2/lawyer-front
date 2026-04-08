import { useQuery } from "@tanstack/react-query"
import { getCircles } from "../services/getCircles"

export const useGetCircles = (court_id: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["circles", court_id],
        queryFn: () => getCircles(court_id),
        enabled,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

import { useQuery } from "@tanstack/react-query"
import { getCircles } from "../services/getCircles"

export const useGetCircles = (court_id: number, page: number, limit: number) => {
    return useQuery({
        queryKey: ["circles", court_id, page, limit],
        queryFn: () => getCircles(court_id, page, limit),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}

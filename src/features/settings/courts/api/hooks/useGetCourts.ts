import { useQuery } from "@tanstack/react-query"
import { getCourts } from "../services/getCourts"

export const useGetCourts = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["courts", page, limit],
        queryFn: () => getCourts(page, limit),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}
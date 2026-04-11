import { useQuery } from "@tanstack/react-query"
import { getCourts } from "../services/getCourts"

export const useGetCourts = (page?: number, limit?: number, search?: string) => {
    return useQuery({
        queryKey: ["courts", page, limit, search],
        queryFn: () => getCourts(page, limit, search),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    })
}
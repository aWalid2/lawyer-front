import { useQuery } from "@tanstack/react-query"
import { getCourts } from "../services/getCourts"

export const useGetCourts = () => {
    return useQuery({
        queryKey: ["courts"],
        queryFn: getCourts,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 1,
    })
}
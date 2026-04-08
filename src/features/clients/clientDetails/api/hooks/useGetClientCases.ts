import { useQuery } from "@tanstack/react-query";
import { getClientCases } from "../services/getClientCases";

export const useGetClientCases = ({ id, page, limit }: { id: string, page: number, limit: number }) => {
    return useQuery({
        queryKey: ["client-cases", id, page, limit],
        queryFn: () => getClientCases({ id, page, limit }),
        enabled: !!id,
    });
};
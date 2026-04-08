import { useQuery } from "@tanstack/react-query";
import { getClientCases } from "../services/getClientCases";

export const useGetClientCases = ({ id }: { id: string }) => {
    return useQuery({
        queryKey: ["client-cases", id],
        queryFn: () => getClientCases({ id }),
        enabled: !!id,
    });
};
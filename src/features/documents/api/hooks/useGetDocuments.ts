import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../service/getDocuments";

export const useFetchDocuments = (page: number, limit: number, documentType?: string, search?: string, classification?: string) => {
    return useQuery({
        queryKey: ["documents", page, limit, documentType, search, classification],
        queryFn: async () => {
            const response = await getDocuments(page, limit, documentType, search, classification);
            return response;
        },
    });
};
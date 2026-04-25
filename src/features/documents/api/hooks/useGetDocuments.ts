import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../service/getDocuments";

export const useFetchDocuments = (page: number, limit: number, documentType?: string, search?: string) => {
    return useQuery({
        queryKey: ["documents", page, limit, documentType, search],
        queryFn: async () => {
            const response = await getDocuments(page, limit, documentType, search);
            return response;
        },
    });
};
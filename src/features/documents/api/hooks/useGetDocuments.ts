// documents/api/hooks/useGetDocuments.ts
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../service/getDocuments";

export const useFetchDocuments = () => {
    return useQuery({
        queryKey: ["documents"],
        queryFn: async () => {
            const response = await getDocuments();
            console.log("API Response:", response);
            return response;
        },
    });
};
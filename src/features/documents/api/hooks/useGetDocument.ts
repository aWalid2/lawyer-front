import { useQuery } from "@tanstack/react-query";
import { getDocumentById } from "../service/getDocument";

export const useGetDocument = (id: string) => {
    return useQuery({
        queryKey: ["document", id],
        queryFn: () => getDocumentById(id),
        enabled: !!id,
    });
};
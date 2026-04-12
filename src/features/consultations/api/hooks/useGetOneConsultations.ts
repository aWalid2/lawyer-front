import { useQuery } from "@tanstack/react-query";
import { getOneConsultation } from "../service/getOneConsultations";

export const useGetOneConsultation = (id: string) => {
    return useQuery({
        queryKey: ["consultation", id],
        queryFn: () => getOneConsultation({ id }),
        enabled: !!id, 
        retry: 1,
    });
};
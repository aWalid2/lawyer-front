
import { useQuery } from "@tanstack/react-query";
import { getOneEmployee } from "../services/getOneEmployee";

export const useGetEmployee = (id: string) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => getOneEmployee(id),
        enabled: !!id,
    });
};
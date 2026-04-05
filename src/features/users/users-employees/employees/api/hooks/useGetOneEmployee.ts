// employees/api/hooks/useGetEmployee.ts
import { useQuery } from "@tanstack/react-query";
import { getOneEmployee } from "../service/getOneEmployee";

export const useGetEmployee = (id: string) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => getOneEmployee(id),
        enabled: !!id, // فقط ينفذ إذا كان الـ ID موجود
    });
};
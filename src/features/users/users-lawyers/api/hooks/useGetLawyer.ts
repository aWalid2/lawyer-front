import { useQuery } from "@tanstack/react-query";
import { getOneLawyer } from "../service/getOneLawyers";

export const useGetOneLawyer = (id: string) => {
    return useQuery({
        queryKey: ["lawyer", id],
        queryFn: () => getOneLawyer({ id }),
        enabled: !!id, // فقط يعمل إذا كان الـ id موجود
        retry: 1,
    });
};
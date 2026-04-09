import { useQuery } from "@tanstack/react-query";
import { getCaseTypes } from "../services/getCaseTypes";

export const useGetCaseTypes = (page?: number, limit?: number) => {
    return useQuery({
        queryKey: ["case-types", page, limit],
        queryFn: () => getCaseTypes(page, limit),
    });
};

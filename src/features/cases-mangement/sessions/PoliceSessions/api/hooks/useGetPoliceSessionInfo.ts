import { useQuery } from "@tanstack/react-query";
import { getPoliceSessionInfo } from "../services/getPoliceSessionInfo";

export const useGetPoliceSessionInfo = (caseId: number) => {
    return useQuery({
        queryKey: ["police-department", caseId],
        queryFn: () => getPoliceSessionInfo(caseId),
    });
};
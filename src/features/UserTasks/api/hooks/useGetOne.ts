// tasks/api/hooks/useGetOneTask.ts
import { useQuery } from "@tanstack/react-query";
import { getOneTask } from "../service/getTaskOne";

export const useGetOneTask = (id: string) => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: () => getOneTask({ id }),
        enabled: !!id,
        retry: 1,
    });
};
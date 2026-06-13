
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getOneTask } from "../service/getTaskOne";

export const useGetOneTask = (id: string, enabled = true) => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: () => getOneTask({ id }),
        enabled: !!id && enabled,
        retry: (failureCount, error) => {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 404) return false;
            return failureCount < 2;
        },
    });
};
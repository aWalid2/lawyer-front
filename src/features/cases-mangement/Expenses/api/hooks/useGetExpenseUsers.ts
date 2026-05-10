import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UserT } from "@/features/settings/users/types/userT";
import { getExpenseUsers } from "../services/getExpenseUsers";

export const useGetExpenseUsers = () => {
  const query = useQuery<UserT[]>({
    queryKey: ["expense-users"],
    queryFn: getExpenseUsers,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch users");
    }
  }, [query.error]);

  return query;
};
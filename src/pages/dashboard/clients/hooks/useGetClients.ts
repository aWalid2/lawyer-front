import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../services/getClients";
import { toast } from "sonner";


export const useFetchClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
    staleTime: 1000 * 60 * 2,
    retry: 2,
    onError: (error: any) => {

      toast.error(error.message || "Failed to fetch clients");
    },
  });
};

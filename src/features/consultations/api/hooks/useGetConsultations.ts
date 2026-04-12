
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { getConsultations } from "../service/getConsultations";

export const useFetchConsultations = () => {
  const query = useQuery({
    queryKey: ["consultations"],
    queryFn: getConsultations,
    staleTime: 1000 * 60 * 2,
    retry: 2,

  });

  useEffect(() => {
    if (query.error) {
      toast.error(query.error.message || "Failed to fetch consultations. Please try again later.");
    }
  }, [query.error]);
  

  return query;
};
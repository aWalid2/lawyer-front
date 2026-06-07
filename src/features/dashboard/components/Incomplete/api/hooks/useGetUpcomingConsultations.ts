import { useQuery } from "@tanstack/react-query";
import { getUpcomingConsultations } from "../services/getUpcomingConsultations";

export const useGetUpcomingConsultations = () => {
  return useQuery({
    queryKey: ["upcoming-consultations"],
    queryFn: getUpcomingConsultations,
    refetchOnWindowFocus: false,
  });
};

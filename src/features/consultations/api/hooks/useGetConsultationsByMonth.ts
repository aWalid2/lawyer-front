import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface ConsultationByMonthParams {
  month: number;
  year: number;
}

export const useGetConsultationsByMonth = ({
  month,
  year,
}: ConsultationByMonthParams) => {
  return useQuery({
    queryKey: ["consultations", "month", month, year],
    queryFn: async () => {
      const { data } = await api.get("/consultation", {
        params: { month, year, limit: 100 },
      });
      return data?.data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

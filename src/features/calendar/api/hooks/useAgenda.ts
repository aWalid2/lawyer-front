import { useQuery } from "@tanstack/react-query";
import { getAgenda } from "../services/getAgenda";
import type { AgendaParams } from "../services/agendaTypes";

export const useAgenda = (params: AgendaParams = {}, enabled = true) => {
  return useQuery({
    queryKey: ["agenda", params.month, params.year, params.date],
    queryFn: () => getAgenda(params),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

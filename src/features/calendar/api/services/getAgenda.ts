import api from "@/lib/api";
import type { AgendaParams, AgendaResponse } from "./agendaTypes";

export const getAgenda = async (
  params: AgendaParams = {},
): Promise<AgendaResponse> => {
  const queryParams: Record<string, string | number> = {};

  if (params.month) queryParams.month = params.month;
  if (params.year) queryParams.year = params.year;
  if (params.date) queryParams.date = params.date;

  const { data } = await api.get("/agenda", { params: queryParams });

  return {
    tasks: data?.tasks ?? [],
    procedures: data?.procedures ?? [],
    meta: data?.meta ?? {
      startDate: "",
      endDate: "",
      totalTasks: 0,
      totalProcedures: 0,
    },
  };
};

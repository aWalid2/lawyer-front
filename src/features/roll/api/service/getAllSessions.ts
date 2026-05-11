import api from "@/lib/api";
import type { RollSessionApiResponse, RollSessionsParams } from "../../types";

const formatDateParam = (date?: Date) => {
  if (!date) {
    return undefined;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const fetchAllRollSessions = async (
  params: RollSessionsParams,
): Promise<RollSessionApiResponse[]> => {
  const queryParams: Record<string, string> = {};

  if (params.sessionSource && params.sessionSource !== "all") {
    queryParams.session_source =
      params.sessionSource === "PROCEDURE"
        ? "procedure"
        : params.sessionSource;
  }

  const dateFrom = formatDateParam(params.dateFrom);
  const dateTo = formatDateParam(params.dateTo);

  if (dateFrom) {
    queryParams.date_from = dateFrom;
  }

  if (dateTo) {
    queryParams.date_to = dateTo;
  }

  const { data } = await api.get("/sessions/all-sessions", {
    params: queryParams,
  });

  return data;
};
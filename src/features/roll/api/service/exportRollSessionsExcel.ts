import api from "@/lib/api";
import type { RollSessionsParams } from "../../types";
import { buildQueryParams } from "./getAllSessions";

export const exportRollSessionsExcel = async (
  params: RollSessionsParams,
): Promise<Blob> => {
  const queryParams = buildQueryParams(params);

  const { data } = await api.get("/sessions/export/excel", {
    params: queryParams,
    responseType: "blob",
  });

  return data;
};

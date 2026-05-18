import { useMutation } from "@tanstack/react-query";
import { exportRollSessionsExcel } from "../service/exportRollSessionsExcel";
import type { RollSessionsParams } from "../../types";

export const useExportRollSessionsExcel = () => {
  return useMutation({
    mutationFn: (params: RollSessionsParams) => exportRollSessionsExcel(params),
  });
};

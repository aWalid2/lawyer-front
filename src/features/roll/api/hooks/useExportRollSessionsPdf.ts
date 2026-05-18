import { useMutation } from "@tanstack/react-query";
import { exportRollSessionsPdf } from "../service/exportRollSessionsPdf";
import type { RollSessionsParams } from "../../types";

export const useExportRollSessionsPdf = () => {
  return useMutation({
    mutationFn: (params: RollSessionsParams) => exportRollSessionsPdf(params),
  });
};

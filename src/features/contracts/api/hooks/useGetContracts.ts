import { useQuery } from "@tanstack/react-query";
import { getContracts, type GetContractsParams } from "../services/getContracts";

export const useGetContracts = (params: GetContractsParams) => {
  return useQuery({
    queryKey: [
      "contracts",
      params.page,
      params.limit,
      params.endDateFrom?.toISOString(),
      params.endDateTo?.toISOString(),
      params.contractValueMin,
      params.contractValueMax,
    ],
    queryFn: () => getContracts(params),
  });
};
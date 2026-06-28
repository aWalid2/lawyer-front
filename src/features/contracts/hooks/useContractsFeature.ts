import { useMemo, useState } from "react";
import type { Contract, ContractFormValues } from "../types";
import { useGetContracts } from "../api/hooks/useGetContracts";
import { useSearchContracts } from "../api/hooks/useSearchContracts";
import { useCreateContract } from "../api/hooks/useCreateContract";
import { useUpdateContract } from "../api/hooks/useUpdateContract";
import { useDeleteContract } from "../api/hooks/useDeleteContract";
import { buildContractFormData } from "../api/services/buildContractFormData";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import type { ContractApiItem } from "../api/services/getContracts";

const FALLBACK_TEXT = "-";
const ITEMS_PER_PAGE = 15;

const normalizeContract = (item: ContractApiItem): Contract => ({
  id: String(item.id ?? ""),
  clientId: item.client_id ? String(item.client_id) : "",
  clientName: item.client_profile?.name ?? "",
  startDate: item.start_date ? item.start_date.split("T")[0] : "",
  endDate: item.end_date ? item.end_date.split("T")[0] : "",
  contractValue: String(item.contract_value ?? ""),
  contractDuration: String(item.contract_duration ?? ""),
  documentFile: item.document_file ?? "",
  createdAt: item.created_at ? item.created_at.split("T")[0] : "",
  contractTitle:item?.contract_title || FALLBACK_TEXT
});

interface Filters {
  endDateFrom?: Date;
  endDateTo?: Date;
  contractValueMin: string;
  contractValueMax: string;
}

export const useContractsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    contractValueMin: "",
    contractValueMax: "",
  });

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);
  const isSearching = debouncedSearchTerm.length > 0;

  const {
    data: contractsResponse,
    isPending: isContractsPending,
    isError: isContractsError,
    error: contractsError,
  } = useGetContracts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    endDateFrom: filters.endDateFrom,
    endDateTo: filters.endDateTo,
    contractValueMin: filters.contractValueMin,
    contractValueMax: filters.contractValueMax,
  });

  const {
    data: searchResponse,
    isPending: isSearchPending,
    isError: isSearchError,
    error: searchError,
  } = useSearchContracts({
    q: debouncedSearchTerm,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    enabled: isSearching,
  });

  const isPending = isSearching ? isSearchPending : isContractsPending;
  const isError = isSearching ? isSearchError : isContractsError;
  const error = isSearching ? searchError : contractsError;

  const activeResponse = isSearching ? searchResponse : contractsResponse;

  const createContractMutation = useCreateContract();
  const updateContractMutation = useUpdateContract();
  const deleteContractMutation = useDeleteContract();

  const contracts = useMemo(
    () => (activeResponse?.data ?? []).map((item) => normalizeContract(item)),
    [activeResponse?.data],
  );

  const effectiveLimit = activeResponse?.meta?.limit ?? ITEMS_PER_PAGE;
  const indexedContracts = useIndexedData(
    contracts,
    currentPage,
    effectiveLimit,
  ) as Contract[];
  const totalPages = activeResponse?.meta?.totalPages ?? 1;

  const handleFilterChange = (
    key: "endDateFrom" | "endDateTo" | "contractValueMin" | "contractValueMax",
    value: string | Date | undefined,
  ) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async (values: ContractFormValues) => {
    await createContractMutation.mutateAsync({
      clientId: values.clientId,
      data: buildContractFormData(values),
    });
  };

  const handleUpdate = async (
    values: ContractFormValues,
    contractId: string,
  ) => {
    await updateContractMutation.mutateAsync({
      contractId,
      data: buildContractFormData(values),
    });
  };

  const handleDelete = async (contractId: string) => {
    await deleteContractMutation.mutateAsync(contractId);
  };

  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  return {
    currentPage,
    setCurrentPage,
    searchTerm,
    isPending,
    isError,
    error,
    indexedContracts,
    totalPages,
    FALLBACK_TEXT,
    handleFilterChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleSearchChange,
    filters,
    createContractMutation,
    updateContractMutation,
  };
};

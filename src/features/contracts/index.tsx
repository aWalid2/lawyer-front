import { useMemo, useState } from "react";
import { HeaderPageContracts } from "./componnents/HeaderPageContracts";
import type { Contract, ContractFormValues } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { TableContractsActions } from "./componnents/TableContractsActions";
import PageLayout from "@/shared/components/PageLayout";
import { useGetContracts } from "./api/hooks/useGetContracts";
import { useSearchContracts } from "./api/hooks/useSearchContracts";
import { useCreateContract } from "./api/hooks/useCreateContract";
import { useUpdateContract } from "./api/hooks/useUpdateContract";
import { useDeleteContract } from "./api/hooks/useDeleteContract";
import { buildContractFormData } from "./api/services/buildContractFormData";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { useIndexedData } from "@/shared/utils/useIndexedData";

import type { ContractApiItem } from "./api/services/getContracts";

const FALLBACK_TEXT = "-";

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
});

const ContractsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    endDateFrom?: Date;
    endDateTo?: Date;
    contractValueMin: string;
    contractValueMax: string;
  }>({ contractValueMin: "", contractValueMax: "" });
  const itemsPerPage = 15;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);
  const isSearching = debouncedSearchTerm.length > 0;

  const {
    data: contractsResponse,
    isPending: isContractsPending,
    isError: isContractsError,
    error: contractsError,
  } = useGetContracts({
    page: currentPage,
    limit: itemsPerPage,
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
    limit: itemsPerPage,
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

  const handleFilterChange = (
    key: "endDateFrom" | "endDateTo" | "contractValueMin" | "contractValueMax",
    value: string | Date | undefined,
  ) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const effectiveLimit = activeResponse?.meta?.limit ?? itemsPerPage;
  const indexedContracts = useIndexedData(
    contracts,
    currentPage,
    effectiveLimit,
  ) as Contract[];
  const totalPages = activeResponse?.meta?.totalPages ?? 1;

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

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Error message="حدث خطأ في تحميل العقود" error={error} />;
  }

  const columns: Column<Contract>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber || 0,
      headerClassName: "w-15",
    },
    {
      header: "كود العقد",
      accessor: "id",
    },
    {
      header: "اسم الموكل",
      accessor: (item) => item.clientName || FALLBACK_TEXT,
    },
    {
      header: "قيمة العقد",
      accessor: (item) => item.contractValue || FALLBACK_TEXT,
    },
    {
      header: "مدة العقد",
      accessor: (item) =>
        item.contractDuration ? `${item.contractDuration} شهر` : FALLBACK_TEXT,
    },
    {
      header: "تاريخ بداية العقد",
      accessor: (item) => formatDateToYYYYMMDD(item.startDate) || FALLBACK_TEXT,
    },
    {
      header: "تاريخ نهاية العقد",
      accessor: (item) => formatDateToYYYYMMDD(item.endDate) || FALLBACK_TEXT,
    },
    {
      header: "ملف العقد",
      accessor: (item) =>
        item.documentFile ? (
          <a
            href={item.documentFile}
            target="_blank"
            rel="noreferrer"
            className="text-[#BF9A61] underline"
          >
            عرض الملف
          </a>
        ) : (
          FALLBACK_TEXT
        ),
    },
    {
      header: "تاريخ الإنشاء",
      accessor: (item) => formatDateToYYYYMMDD(item.createdAt) || FALLBACK_TEXT,
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableContractsActions
          contract={item}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          isPending={updateContractMutation.isPending}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <HeaderPageContracts
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        onFilterChange={handleFilterChange}
        filters={filters}
        onCreate={handleCreate}
        isCreatePending={createContractMutation.isPending}
      />

      {indexedContracts.length === 0 ? (
        <EmptyTable message="لا توجد عقود متاحة" />
      ) : (
        <DataTable columns={columns} data={indexedContracts} rowIdField="id" />
      )}

      {totalPages > 1 && (
        <PaginationApi
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ContractsFeature;

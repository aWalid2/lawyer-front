import type { Contract } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";

import { HeaderPageContracts } from "./componnents/HeaderPageContracts";
import { TableContractsActions } from "./componnents/TableContractsActions";
import PageLayout from "@/shared/components/PageLayout";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";

import { Pagination } from "@/shared/components/Pagination";
import { useContractsFeature } from "./hooks/useContractsFeature";

const ContractsFeature = () => {
  const {
    currentPage,
    setCurrentPage,
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
    searchTerm,
    filters,
    createContractMutation,
    updateContractMutation,
  } = useContractsFeature();

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
      header: "عنوان العقد",
      accessor: (item) => item.contractTitle || FALLBACK_TEXT,
    },
    {
      header: "قيمة العقد",
      accessor: (item) => item.contractValue || FALLBACK_TEXT,
    },
    {
      header: "اجمالي المدفوع",
      accessor: (item) => item.contractPayment || FALLBACK_TEXT,
    },
    {
      header: "مدة العقد",
      accessor: (item) =>
        item.contractDuration ? `${item.contractDuration} شهر` : FALLBACK_TEXT,
    },
    {
      header: "عدد القضايا المرتبطه بالعقد",
      accessor: (item) =>
        item.contractRelatedCases
          ? `${item.contractRelatedCases} `
          : FALLBACK_TEXT,
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ContractsFeature;

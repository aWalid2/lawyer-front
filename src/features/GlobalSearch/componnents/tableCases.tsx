import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableCasesActions } from "@/features/cases-mangement/MainCases/componnents/TableCasesActions";
import { useSearchCases } from "@/features/cases-mangement/MainCases/api/hooks/useGetCases";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";
import type { Case } from "@/features/cases-mangement/MainCases/types/casesTypes";

interface TableCasesProps {
  searchTerm: string;
}

const TableCases: React.FC<TableCasesProps> = ({ searchTerm }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const hasSearched = searchTerm.length > 0;

  const handleCaseClick = (caseItem: Case) => {
    navigate(`/dashboard/case-management/${caseItem.id}`);
  };

  const { data: casesData, isPending } = useSearchCases(page, searchTerm);
  const totalPages = casesData?.meta?.total_pages ?? 1;
  const limit = casesData?.meta?.limit || 15;
  const indexedData = useIndexedData(casesData?.data || [], page, limit);

  const columns: Column<Case>[] = [
    {
      header: "#",
      accessor: (item: Case) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case_sequence,
      className: "font-medium text-black",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: (item) => item.reference_number,
    },
    {
      header: "اسم الموكل",
      accessor: (item: any) =>
        item.client_name || item.client?.first_name || "-",
    },
    {
      header: "عنوان القضية",
      accessor: (item: any) => item.case_title || "-",
    },
    {
      header: "نوع القضية",
      accessor: (item: any) => item.case_type?.name || "-",
    },
    {
      header: "الحالة",
      accessor: (item: any) => (
        <span className="rounded-main px-3 py-1 text-xs font-medium whitespace-nowrap">
          {item?.caseStatus?.name || item?.case_Status}
        </span>
      ),
    },
    {
      header: "إجراء",
      accessor: (item) => <TableCasesActions caseItem={item} />,
    },
  ];

  return (
    <div className="w-full space-y-6 pt-6">
      <div className="rounded-main border border-gray-200 p-4">
        <h1 className="mt-4 mb-8 text-xl font-semibold">قائمة القضايا</h1>

        {!hasSearched ? (
          <EmptyTable message="ابحث عن قضية لعرض النتائج" />
        ) : isPending ? (
          <LoadingPage fullScreen={false} />
        ) : indexedData.length === 0 ? (
          <EmptyTable message="لا توجد نتائج تطابق بحثك" />
        ) : (
          <>
            <DataTable
              data={indexedData}
              columns={columns}
              rowKey={"id"}
              onRowClick={handleCaseClick}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TableCases;

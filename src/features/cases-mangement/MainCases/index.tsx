import { useState } from "react";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./types/casesTypes";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableCasesActions } from "./componnents/TableCasesActions";
import { useGetCases } from "./api/hooks/useGetCases";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { PaginationApi } from "@/shared/components/PaginationApi";


const getStatusStyles = (status: string) => {
  switch (status) {
    case "قيد التنفيذ":
      return "bg-[#937F12]/20 text-[#937F12]";
    case "تم الإغلاق":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "تم الإغلاق":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};


const MainCases = () => {
  const columns: Column<Case>[] = [
    {
      header: "#",
      accessor: (item: Case) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case_sequence
      ,
      className: "font-medium text-black",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: (item) => item.case_number,
    },
    {
      header: "اسم الموكل",
      accessor: (item: any) => item.client?.first_name,
      className: "font-medium text-black",
    },
    {
      header: "عنوان القضية",
      accessor: (item: any) => item.case_type.name,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(item?.caseStatus?.name || "")} `}
        >
          {item?.caseStatus?.name}
        </span>
      ),
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableCasesActions
          caseItem={item}
        />
      ),
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data: cases, isPending, isError } = useGetCases(page);
  const totalPages = cases?.meta?.total_pages ?? 1;
  const limit = cases?.meta?.limit || 15;
  const indexedData = useIndexedData(cases?.data || [], page, limit);


  if (isPending) return <LoadingPage />
  if (isError) return <EmptyTable message="حدث خطأ في تحميل البيانات" />
  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageCase
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={(value) => console.log(value)}
        />

        {indexedData?.length === 0 ? <EmptyTable message="لا توجد بيانات حالية لادارة القضايا" /> : (
          <DataTable
            rowKey="id"
            data={indexedData}
            columns={columns}
          />
        )}
        {totalPages > 1 && (
          <PaginationApi
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

      </div>
    </div>
  );
};

export default MainCases;

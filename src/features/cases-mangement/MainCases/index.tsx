import { useState } from "react";
import { usePagination } from "@/shared/hooks/usePagination";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./types/casesTypes";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableCasesActions } from "./componnents/TableCasesActions";
import { Pagination } from "@/shared/components/Pagination";
import { useGetCases } from "./api/hooks/useGetCases";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";


const getStatusStyles = (status: string) => {
  switch (status) {
    case "active":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "تحت الرفع":
      return "bg-[#937F12]/20 text-[#937F12]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};


const MainCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cases, isPending, isError } = useGetCases();
  const indexedData = useIndexedData(cases);
  const {
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination<Case>(indexedData || [], 15);



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
      accessor: (item) => item.client_name,
      className: "font-medium text-black",
    },
    {
      header: "عنوان القضية",
      accessor: (item) => item.case_type,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(
            item.case_situation
          )}`}
        >
          {item.case_situation}
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
            rowIdField="id"
          />
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

      </div>
    </div>
  );
};

export default MainCases;

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

    case "UNDER_APPEAL":
      return "bg-[#937F12]/20 text-[#937F12]";
    case "PUBLIC_PROSECUTION":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "AT_PROSECUTOR_OFFICE":
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
      accessor: (item) => item.client_name,
      className: "font-medium text-black",
    },
    {
      header: "عنوان القضية",
      accessor: (item) => item.case_type === 'criminal' ? 'قضية جنائية' : item.case_type === 'civil' ? 'قضية مدنية' : item.case_type === 'commercial' ? 'قضية تجارية' : item.case_type === 'family' ? 'قضية أسرية' : item.case_type === 'administrative' ? 'قضية إدارية' : item.case_type === 'labor' ? 'قضية عمالية' : item.case_type === 'tax' ? 'قضية ضريبية' : item.case_type === 'real_estate' ? 'قضية عقارية' : item.case_type === 'intellectual_property' ? 'قضية ملكية فكرية' : item.case_type === 'international' ? 'قضية دولية' : item.case_type === 'other' ? 'قضية أخرى' : item.case_type,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`px-3 py-1 rounded-main text-xs font-medium whitespace-nowrap ${getStatusStyles(
            item.case_situation
          )}`}
        >
          {item.case_situation === "UNDER_APPEAL" ? "تحت الرفع" : item.case_situation === "PUBLIC_PROSECUTION" ? "الادعاء العام" : item.case_situation === "AT_PROSECUTOR_OFFICE" ? "في النيابة" : item.case_situation}
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
  const limit = 15;

  const { data: cases, isPending, isError } = useGetCases(page, limit);

  const indexedData = useIndexedData(cases?.data || []);
  const totalPages = cases?.meta?.total_pages ?? 1;


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

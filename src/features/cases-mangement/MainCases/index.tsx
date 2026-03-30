import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@/shared/hooks/usePagination";
import { HeaderPageCase } from "./componnents/HeaderPageCase";
import type { Case } from "./componnents/casesTypes";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableCasesActions } from "./componnents/TableCasesActions";
import { Pagination } from "@/shared/components/Pagination";
import { useGetCases } from "./hooks/useGetCases";
import Loading from "@/shared/Loading";




const MainCases = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cases, isLoading, isPending } = useGetCases();
  console.log(cases);

  const handleEdit = (caseItem: Case) => {
    console.log("Edit case:", caseItem);
  };

  const handleCaseClick = (caseItem: Case) => {
    navigate(`/dashboard/case-management/${caseItem.id}`);
  };



  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination<Case>(cases?.data || [], 15);

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

  const columns: Column<Case>[] = [
    {
      header: "#",
      accessor: (item) =>
        (currentPage - 1) * 15 +
        currentData.findIndex((c) => c.id === item.id) +
        1,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case_number_at_prosecution
      ,
      className: "font-medium text-black",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: (item) => item.case_number,
    },
    {
      header: "اسم الموكل",
      accessor: (item) => item.detective_name,
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
          onEdit={(c) => handleEdit(c)}
        />
      ),
    },
  ];


  // if (isLoading || isPending) return <Loading />
  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageCase
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={(value) => console.log(value)}
        />


        <DataTable
          data={cases}
          columns={columns}
          rowIdField="id"
          onRowClick={handleCaseClick}
        />
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

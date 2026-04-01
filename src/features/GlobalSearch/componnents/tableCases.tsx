import { useNavigate } from "react-router-dom";
import { usePagination } from "@/shared/hooks/usePagination";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableCasesActions } from "@/features/cases-mangement/MainCases/componnents/TableCasesActions";
import type { Case } from "@/features/cases-mangement/MainCases/types/casesTypes";

const MOCK_CASES: Case[] = Array.from({ length: 19 }, (_, i) => ({
  id: `${i + 1}`,
  rowNumber: i + 1,
  case_number: `#634${(i % 5) + 1}`,
  case_number_at_prosecution: `P-${i + 1}`,
  detective_name: "محقق افتراضي",
  case_type: "سرقة",
  case_situation: i % 2 === 0 ? "متداولة" : "تحت الرفع",
}));

const TableCases = () => {
  const navigate = useNavigate();

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
  } = usePagination<Case>(MOCK_CASES, 15);

  const getStatusStyles = (situation: string) => {
    switch (situation) {
      case "متداولة":
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
      accessor: (item) => MOCK_CASES.findIndex((c) => c.id === item.id) + 1,
      headerClassName: "w-16",
    },
    {
      header: "كود القضية",
      accessor: "case_number",
      className: "font-medium text-black",
    },
    {
      header: "رقم القضية بالنيابة",
      accessor: "case_number_at_prosecution",
    },
    {
      header: "اسم المحقق",
      accessor: "detective_name",
      className: "font-medium text-black",
    },
    {
      header: "نوع القضية",
      accessor: "case_type",
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

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="border rounded-main border-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-8 mt-4 ">قائمة القضايا</h1>
        <DataTable
          data={currentData}
          columns={columns}
          rowKey={'id'}
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

export default TableCases;
import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsExpenses } from "./components/HeaderPageReportsExpenses";
import type { ReportExpense } from "./types";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";

const MOCK_REPORT_EXPENSES: ReportExpense[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  invoiceNumber: i === 0 ? "1" : "2",
  category: ["قضائية", "تشغيلية", "تسويقية", "طارئة"][i % 4],
  description: "رسوم خبراء",
  amount: "5000 ر.س",
  responsibleEmployee: "علي العتيبي",
  date: "14/10/2025",
  status: i % 3 === 0 ? "paid" : i % 3 === 1 ? "rejected" : "inactive",
}));

const ReportsExpensesFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status: string; date?: Date }>({ status: "all" });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredExpenses = useMemo(() => {
    return MOCK_REPORT_EXPENSES.filter((x) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        x.invoiceNumber.includes(searchStr) || 
        x.category.toLowerCase().includes(searchStr) ||
        x.description.toLowerCase().includes(searchStr);
      
      const matchesStatus = filters.status === "all" || x.status === filters.status;

      let matchesDate = true;
      if (filters.date) {
        const expenseDate = new Date(x.date.split("/").reverse().join("-"));
        matchesDate = 
          expenseDate.getDate() === filters.date.getDate() &&
          expenseDate.getMonth() === filters.date.getMonth() &&
          expenseDate.getFullYear() === filters.date.getFullYear();
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const paginatedExpenses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(start, start + itemsPerPage);
  }, [filteredExpenses, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const columns: Column<ReportExpense>[] = [
    {
      header: "#",
      accessor: (item) => filteredExpenses.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "رقم الفاتورة",
      accessor: "invoiceNumber",
    },
    {
      header: "الفئة",
      accessor: "category",
    },
    {
      header: "الوصف",
      accessor: "description",
    },
    {
      header: "المبلغ",
      accessor: "amount",
    },
    {
      header: "الموظف المسؤول",
      accessor: "responsibleEmployee",
    },
    {
      header: "التاريخ",
      accessor: "date",
    },
    {
      header: "الحالة",
      accessor: (item) => {
        const statusMap = {
          paid: { label: "مدفوعة", color: "bg-success/20 text-success" },
          rejected: { label: "مرفوضة", color: "bg-error/20 text-error" },
          inactive: { label: "غير نشط", color: "bg-gray-200 text-gray-500" },
        };
        const config = statusMap[item.status];
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-regular ${config.color}`}>
            {config.label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageReportsExpenses
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedExpenses}
          rowIdField="id"
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

export default ReportsExpensesFeature;

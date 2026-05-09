import { useState, useMemo } from "react";
import { HeaderPageReportsExpenses } from "./components/HeaderPageReportsExpenses";
import type { ReportExpense } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import PageLayout from "@/shared/components/PageLayout";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { toast } from "sonner";

const MOCK_REPORT_EXPENSES: ReportExpense[] = Array.from(
  { length: 45 },
  (_, i) => ({
    id: `${i + 1}`,
    expenseType: [
      "رسوم محكمة",
      "رسوم إدارية",
      "انتقالات",
      "طباعة وتصوير",
      "مصاريف أخرى",
    ][i % 5],
    employeeName: `موظف ${i + 1}`,
    description: ["رسوم خبراء", "رسوم تسجيل", "مصاريف انتقال للمحكمة"][i % 3],
    amount: 500 + i * 125,
    expenseDate: `2025-10-${String((i % 28) + 1).padStart(2, "0")}`,
    attachments:
      i % 3 === 0
        ? [`receipt-${i + 1}.pdf`, `note-${i + 1}.jpg`]
        : i % 2 === 0
          ? [`receipt-${i + 1}.pdf`]
          : [],
    notes: "بيانات تجريبية لعرض تقرير المصروفات",
  }),
);

const ReportsExpensesFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    expenseType: string;
    fromDate?: Date;
    toDate?: Date;
  }>({ expenseType: "all" });
  const itemsPerPage = 15;

  const handleFilterChange = (
    key: string,
    value: string | Date | undefined,
  ) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  const filteredExpenses = useMemo(() => {
    return MOCK_REPORT_EXPENSES.filter((x) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        x.expenseType.toLowerCase().includes(searchStr) ||
        x.employeeName.toLowerCase().includes(searchStr) ||
        x.description.toLowerCase().includes(searchStr);

      const matchesExpenseType =
        filters.expenseType === "all" || x.expenseType === filters.expenseType;

      const expenseDate = new Date(x.expenseDate);
      const matchesFromDate =
        !filters.fromDate || expenseDate >= filters.fromDate;
      const matchesToDate = !filters.toDate || expenseDate <= filters.toDate;

      return (
        matchesSearch && matchesExpenseType && matchesFromDate && matchesToDate
      );
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedExpenses = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(start, start + itemsPerPage);
  }, [filteredExpenses, safeCurrentPage]);

  const columns: Column<ReportExpense>[] = [
    {
      header: "#",
      accessor: (item) =>
        filteredExpenses.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "نوع المصروف",
      accessor: "expenseType",
    },
    {
      header: "اسم الموظف المسؤول",
      accessor: "employeeName",
    },
    {
      header: "وصف المصروف",
      accessor: "description",
    },
    {
      header: "قيمة المصروف",
      accessor: (item) => `${item.amount.toLocaleString("en-US")} ج.م`,
    },
    {
      header: "تاريخ المصروف",
      accessor: (item) => formatDateToYYYYMMDD(item.expenseDate) || "-",
    },
    {
      header: "المرفقات",
      accessor: (item) =>
        item.attachments.length > 0
          ? item.attachments.length === 1
            ? item.attachments[0]
            : `${item.attachments[0]} +${item.attachments.length - 1}`
          : "-",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <div className="flex items-center justify-center gap-2">
          <ButtonViewTable
            onClick={(event) => {
              event.stopPropagation();
              toast.info(`عرض المصروف: ${item.description}`);
            }}
          />

          <ButtonUpdateTable
            onClick={(event) => {
              event.stopPropagation();
              toast.info(`تعديل المصروف: ${item.description}`);
            }}
          />

          <ButtonDeleteTable
            onClick={(event) => {
              event.stopPropagation();
              toast.info(`حذف المصروف: ${item.description}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <HeaderPageReportsExpenses
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <DataTable columns={columns} data={paginatedExpenses} rowIdField="id" />

      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsExpensesFeature;

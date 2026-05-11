import { DataTable, type Column } from "@/shared/components/DataTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useMemo, useState } from "react";
import { useGetAllCaseExpenses } from "./api/hooks/useGetAllCaseExpenses";
import type { ReportExpenseApiItem } from "./api/service/getAllCaseExpenses";
import { HeaderPageReportsExpenses } from "./components/HeaderPageReportsExpenses";
import type { ReportExpense } from "./types";

const FALLBACK_TEXT = "-";

const toAttachments = (attachment?: string | null) => {
  if (!attachment || typeof attachment !== "string") {
    return [];
  }

  return [attachment];
};

const normalizeReportExpense = (
  item?: ReportExpenseApiItem,
): ReportExpense => ({
  id: String(item?.id ?? ""),
  caseId: item?.case_id ?? null,
  caseTitle: item?.case?.case_title ?? FALLBACK_TEXT,
  caseSequence: item?.case?.case_sequence ?? FALLBACK_TEXT,
  expenseType: item?.expense_type ?? FALLBACK_TEXT,
  employeeName:
    item?.employee_id !== undefined && item?.employee_id !== null
      ? String(item.employee_id)
      : FALLBACK_TEXT,
  description: item?.description ?? FALLBACK_TEXT,
  amount: Number(item?.amount ?? 0),
  expenseDate: item?.expense_date ?? "",
  attachments: toAttachments(item?.attachment),
  notes: item?.notes ?? "",
});

const ReportsExpensesFeature = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    expenseType: string;
    fromDate?: Date;
    toDate?: Date;
  }>({ expenseType: "all" });
  const limit = 15;

  const {
    data: expensesData,
    isPending,
    isError,
    error,
  } = useGetAllCaseExpenses(page, limit);

  const expenses = useMemo(
    () =>
      (expensesData?.data ?? []).map((item) => normalizeReportExpense(item)),
    [expensesData?.data],
  );

  const effectiveLimit = expensesData?.meta?.limit ?? limit;

  const indexedExpenses = useIndexedData(expenses, page, effectiveLimit);

  const handleFilterChange = (
    key: string,
    value: string | Date | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredExpenses = useMemo(() => {
    return indexedExpenses.filter((x) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        x.expenseType.toLowerCase().includes(searchStr) ||
        x.employeeName.toLowerCase().includes(searchStr) ||
        x.description.toLowerCase().includes(searchStr) ||
        x.caseTitle.toLowerCase().includes(searchStr) ||
        x.caseSequence.toLowerCase().includes(searchStr);

      return matchesSearch;
    });
  }, [indexedExpenses, searchTerm]);

  const totalPages =
    expensesData?.meta?.totalPages ?? expensesData?.meta?.totalPages ?? 1;

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;
  }

  const columns: Column<ReportExpense>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber || 0,
      headerClassName: "w-15",
    },
    {
      header: "رقم القضية داخل المكتب",
      accessor: "caseSequence",
    },
    {
      header: "عنوان القضية",
      accessor: "caseTitle",
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
  ];

  return (
    <PageLayout>
      <HeaderPageReportsExpenses
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <DataTable columns={columns} data={filteredExpenses} rowIdField="id" />

      {totalPages > 1 && (
        <PaginationApi
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsExpensesFeature;

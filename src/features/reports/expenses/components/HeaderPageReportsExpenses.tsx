import { HeaderDatePicker } from "@/shared/components/Header/HeaderDatePicker";
import { HeaderExportMenu } from "@/shared/components/Header/HeaderExportMenu";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { REPORT_EXPENSE_TYPE_OPTIONS } from "@/shared/constants/ExpensesOptions";
import { formatDateToYYYYMMDD } from "@/shared/utils";
import React from "react";
import { toast } from "sonner";
import { exportCaseExpenses } from "../api/service/exportCaseExpenses";

interface HeaderPageReportsExpensesProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    key: "expenseType" | "fromDate" | "toDate",
    value: string | Date,
  ) => void;
  searchTerm: string;
  filters: {
    expenseType: string;
    fromDate?: Date | string | undefined | null;
    toDate?: Date | string | undefined | null;
  };
}

export const HeaderPageReportsExpenses: React.FC<
  HeaderPageReportsExpensesProps
> = ({ onSearch, onFilterChange, searchTerm, filters }) => {
  const handleExport = async (type: "pdf" | "excel") => {
    try {
      const params: {
        expense_type?: string;
        date_from?: string;
        date_to?: string;
        page?: number;
        limit?: number;
      } = {};
      if (filters.expenseType !== "all")
        params.expense_type = filters.expenseType;
      if (filters.fromDate)
        params.date_from = formatDateToYYYYMMDD(
          filters.fromDate instanceof Date
            ? filters.fromDate.toISOString()
            : filters.fromDate,
        );
      if (filters.toDate)
        params.date_to = formatDateToYYYYMMDD(
          filters.toDate instanceof Date
            ? filters.toDate.toISOString()
            : filters.toDate,
        );
      const blob =
        type === "pdf"
          ? await exportCaseExpenses("pdf", params)
          : await exportCaseExpenses("excel", params);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `case-expenses.${type === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("حدث خطأ أثناء تصدير تقرير المصروفات " + type);
    }
  };

  const toDate = (
    value: string | Date | null | undefined,
  ): Date | undefined => {
    if (!value) return undefined;
    return value instanceof Date ? value : new Date(value);
  };
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderDatePicker
          date={toDate(filters.fromDate)}
          onDateChange={(date) => date && onFilterChange("fromDate", date)}
          placeholder="من تاريخ"
        />

        <HeaderDatePicker
          date={toDate(filters.toDate)}
          onDateChange={(date) => date && onFilterChange("toDate", date)}
          placeholder="إلى تاريخ"
        />

        <HeaderFilter
          placeholder="بحث..."
          value={filters.expenseType}
          onFilterChange={(value) => onFilterChange("expenseType", value)}
          options={REPORT_EXPENSE_TYPE_OPTIONS}
        />

        <HeaderExportMenu onSelect={handleExport} />
      </div>
    </HeaderPageLayout>
  );
};

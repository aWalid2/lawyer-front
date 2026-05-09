import React from "react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/HeaderFilter";

interface HeaderPageReportsExpensesProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    key: "expenseType" | "fromDate" | "toDate",
    value: string | Date | undefined,
  ) => void;
  searchTerm: string;
  filters: {
    expenseType: string;
    fromDate?: Date;
    toDate?: Date;
  };
}

export const HeaderPageReportsExpenses: React.FC<
  HeaderPageReportsExpensesProps
> = ({ onSearch, onFilterChange, searchTerm, filters }) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير المصروفات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderDatePicker
          date={filters.fromDate}
          onDateChange={(date) => onFilterChange("fromDate", date)}
          placeholder="من تاريخ"
        />

        <HeaderDatePicker
          date={filters.toDate}
          onDateChange={(date) => onFilterChange("toDate", date)}
          placeholder="إلى تاريخ"
        />

        <HeaderFilter
          placeholder="نوع المصروف"
          value={filters.expenseType}
          onFilterChange={(value) => onFilterChange("expenseType", value)}
          options={[
            { value: "all", label: "نوع المصروف" },
            { value: "رسوم محكمة", label: "رسوم محكمة" },
            { value: "رسوم إدارية", label: "رسوم إدارية" },
            { value: "انتقالات", label: "انتقالات" },
            { value: "طباعة وتصوير", label: "طباعة وتصوير" },
            { value: "مصاريف أخرى", label: "مصاريف أخرى" },
          ]}
        />

        <HeaderActionButton
          label="تصدير"
          variant="gradient"
          className="rounded-main h-12.5 px-8"
        />
      </div>
    </HeaderPageLayout>
  );
};

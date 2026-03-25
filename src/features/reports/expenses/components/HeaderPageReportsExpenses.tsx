import React from "react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderDatePicker } from "@/components/shared/components/HeaderDatePicker";

interface HeaderPageReportsExpensesProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: any) => void;
  searchTerm: string;
  filters: {
    status: string;
    date?: Date;
  };
}

export const HeaderPageReportsExpenses: React.FC<HeaderPageReportsExpensesProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير المصروفات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <HeaderDatePicker
          date={filters.date}
          onDateChange={(date) => onFilterChange("date", date)}
        />

        <HeaderFilter
          placeholder="الحالة"
          value={filters.status}
          onFilterChange={(v) => onFilterChange("status", v)}
          options={[
            { value: "all", label: "الحالة" },
            { value: "paid", label: "مدفوعة" },
            { value: "rejected", label: "مرفوضة" },
            { value: "inactive", label: "غير نشط" },
          ]}
          className="md:w-[110px]"
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

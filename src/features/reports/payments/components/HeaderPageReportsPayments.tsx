import { HeaderActionButton } from "@/shared/components/Header/HeaderActionButton";
import { HeaderDatePicker } from "@/shared/components/Header/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import React from "react";

interface HeaderPageReportsPaymentsProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: any) => void;
  searchTerm: string;
  filters: {
    status: string;
    date?: Date;
  };
}

export const HeaderPageReportsPayments: React.FC<
  HeaderPageReportsPaymentsProps
> = ({ onSearch, onFilterChange, searchTerm, filters }) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
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

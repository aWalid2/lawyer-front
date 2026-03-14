import React from "react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { CalendarIcon } from "lucide-react";

interface HeaderPageReportsExpensesProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  searchTerm: string;
  filters: {
    status: string;
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
        className="lg:ms-15"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button className="flex items-center gap-2 px-4 h-12.5 rounded-[18px] border border-[#E2E8F0] bg-white text-[#4A5568] text-sm hover:border-[#BF9A61] transition-all min-w-[110px]">
          <CalendarIcon size={18} className="text-[#A0AEC0]" />
          <span>التاريخ</span>
        </button>

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

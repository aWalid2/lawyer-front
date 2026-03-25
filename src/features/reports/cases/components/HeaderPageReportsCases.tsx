import React from "react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";

interface HeaderPageReportsCasesProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filter: string;
}

export const HeaderPageReportsCases: React.FC<HeaderPageReportsCasesProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filter,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير القضايا" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <HeaderFilter
          placeholder="الحالة"
          value={filter}
          onFilterChange={onFilterChange}
          options={[
            { value: "all", label: "الكل" },
            { value: "pending", label: "متداولة" },
            { value: "closed", label: "مغلقة" },
            { value: "active", label: "نشط" },
            { value: "on_hold", label: "غير نشط" },
          ]}
          className="md:w-[120px]"
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

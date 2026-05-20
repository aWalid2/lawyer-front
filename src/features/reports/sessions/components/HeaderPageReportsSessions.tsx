import React from "react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import { HeaderExportMenu } from "@/shared/components/HeaderExportMenu";

interface HeaderPageReportsSessionsProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  onExport: (type: "pdf" | "excel") => void;
  searchTerm: string;
  filters: {
    type: string;
    status: string;
  };
}

export const HeaderPageReportsSessions: React.FC<HeaderPageReportsSessionsProps> = ({
  onSearch,
  onFilterChange,
  onExport,
  searchTerm,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير الجلسات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <HeaderFilter
          placeholder="نوع الجلسة"
          value={filters.type}
          onFilterChange={(v) => onFilterChange("type", v)}
          options={[
            { value: "all", label: "نوع الجلسة" },
            { value: "court", label: "محكمة" },
            { value: "prosecution", label: "نيابة" },
            { value: "police", label: "مخفر" },
          ]}
          className="md:w-27.5"
        />
        <HeaderFilter
          placeholder="الدرجة القضائية"
          value={filters.status}
          onFilterChange={(v) => onFilterChange("status", v)}
          options={[{ value: "all", label: "الدرجة القضائية" }, ...LITIGATION_LEVEL_OPTIONS]}
          className="md:w-[150px]"
        />
        <HeaderExportMenu onSelect={onExport} />
      </div>
    </HeaderPageLayout>
  );
};

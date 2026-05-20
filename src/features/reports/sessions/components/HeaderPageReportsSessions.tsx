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
    session_source: string;
    session_type: string;
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
          value={filters.session_type}
          onFilterChange={(v) => onFilterChange("session_type", v)}
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
          value={filters.session_source}
          onFilterChange={(v) => onFilterChange("session_source", v)}
          options={[{ value: "all", label: "الدرجة القضائية" }, ...LITIGATION_LEVEL_OPTIONS]}
          className="md:w-[150px]"
        />
        <HeaderExportMenu onSelect={onExport} />
      </div>
    </HeaderPageLayout>
  );
};

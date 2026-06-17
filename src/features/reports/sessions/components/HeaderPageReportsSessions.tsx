import { HeaderExportMenu } from "@/shared/components/Header/HeaderExportMenu";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import React from "react";

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

export const HeaderPageReportsSessions: React.FC<
  HeaderPageReportsSessionsProps
> = ({ onSearch, onFilterChange, onExport, searchTerm, filters }) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
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
          options={[
            { value: "all", label: "الدرجة القضائية" },
            ...LITIGATION_LEVEL_OPTIONS,
          ]}
          className="md:w-[150px]"
        />
        <HeaderExportMenu onSelect={onExport} />
      </div>
    </HeaderPageLayout>
  );
};

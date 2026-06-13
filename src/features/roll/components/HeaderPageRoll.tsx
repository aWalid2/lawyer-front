import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import React from "react";
import {
  HeaderExportMenu,
  type HeaderExportType,
} from "../../../shared/components/HeaderExportMenu";
import { ButtonShowAll } from "@/shared/components/ButtonShowAll";

interface HeaderPageRollProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    key: "sessionSource" | "fromDate" | "toDate",
    value: string | Date | undefined,
  ) => void;
  onExport: (type: HeaderExportType) => void;
  searchTerm: string;
  filters: {
    sessionSource: string;
    fromDate?: Date;
    toDate?: Date;
  };
}

export const HeaderPageRoll: React.FC<HeaderPageRollProps> = ({
  onSearch,
  onFilterChange,
  onExport,
  searchTerm,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="ابحث في رول الجلسات..."
      />

      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-4 lg:flex lg:w-auto lg:flex-row">
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
          placeholder="نوع الجلسة"
          value={filters.sessionSource}
          onFilterChange={(v) => onFilterChange("sessionSource", v)}
          options={[
            { value: "all", label: "نوع الجلسة" },
            { value: "court", label: "محكمة" },
            { value: "prosecution", label: "نيابة" },
            { value: "police", label: "مخفر" },
            { value: "procedure", label: "إجراءات" },
          ]}
          className="md:w-27.5"
        />
        <HeaderExportMenu onSelect={onExport} />
        <ButtonShowAll text={"عرض جميع الجلسات"} />
      </div>
    </HeaderPageLayout>
  );
};

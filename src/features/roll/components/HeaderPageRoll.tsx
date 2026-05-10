import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import {
  HeaderExportMenu,
  type HeaderExportType,
} from "../../../shared/components/HeaderExportMenu";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import React from "react";

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
      <HeaderTitle innerPage title="رول الجلسات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
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
            { value: "PROCEDURE", label: "إجراءات" },
          ]}
          className="md:w-27.5"
        />
        <HeaderExportMenu onSelect={onExport} />
      </div>
    </HeaderPageLayout>
  );
};

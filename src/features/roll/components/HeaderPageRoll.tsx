import { ButtonShowAll } from "@/shared/components/buttons/ButtonShowAll";
import { HeaderDatePicker } from "@/shared/components/Header/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderMultiFilter } from "@/shared/components/Header/HeaderMultiFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import React from "react";
import {
  HeaderExportMenu,
  type HeaderExportType,
} from "../../../shared/components/Header/HeaderExportMenu";

interface HeaderPageRollProps {
  onFilterChange: (
    key: "sessionSource" | "fromDate" | "toDate",
    value: string | Date | undefined,
  ) => void;
  onCourtLevelChange: (values: string[]) => void;
  onExport: (type: HeaderExportType) => void;
  filters: {
    sessionSource: string;
    courtLevel: string[];
    fromDate?: Date;
    toDate?: Date;
  };
}

export const HeaderPageRoll: React.FC<HeaderPageRollProps> = ({
  onFilterChange,
  onCourtLevelChange,
  onExport,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <div className="flex w-full flex-wrap justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
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
            ]}
            className="md:w-27.5"
          />

          <HeaderMultiFilter
            placeholder="درجة التقاضي"
            selectedValues={filters.courtLevel}
            onSelectionChange={onCourtLevelChange}
            options={LITIGATION_LEVEL_OPTIONS}
            className="md:w-27.5"
          />
          <HeaderFilter
            placeholder="اسم الجهة"
            value={""}
            onFilterChange={() => onFilterChange("sessionSource", "")}
            options={[{ value: "all", label: "اسم الجهة" }]}
            className="md:w-27.5"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <HeaderExportMenu onSelect={onExport} />
          <ButtonShowAll text={"عرض جميع الجلسات"} />
        </div>
      </div>
    </HeaderPageLayout>
  );
};

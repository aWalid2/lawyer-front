import { ButtonShowAll } from "@/shared/components/buttons/ButtonShowAll";
import { HeaderDatePicker } from "@/shared/components/Header/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import React from "react";
import {
  HeaderExportMenu,
  type HeaderExportType,
} from "../../../shared/components/Header/HeaderExportMenu";

interface HeaderPageRollProps {
  onFilterChange: (
    key: "sessionSource" | "courtLevel" | "fromDate" | "toDate",
    value: string | Date | undefined,
  ) => void;
  onExport: (type: HeaderExportType) => void;
  filters: {
    sessionSource: string;
    courtLevel: string;
    fromDate?: Date;
    toDate?: Date;
  };
}

export const HeaderPageRoll: React.FC<HeaderPageRollProps> = ({
  onFilterChange,
  onExport,
  filters,
}) => {
  return (
    <HeaderPageLayout>
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
          ]}
          className="md:w-27.5"
        />

        <HeaderFilter
          placeholder="درجة التقاضي"
          value={filters.courtLevel}
          onFilterChange={(v) => onFilterChange("courtLevel", v)}
          options={[
            { value: "all", label: "درجة التقاضي" },
            ...LITIGATION_LEVEL_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            })),
          ]}
          className="md:w-27.5"
        />

        <HeaderExportMenu onSelect={onExport} />
        <ButtonShowAll text={"عرض جميع الجلسات"} />
      </div>
    </HeaderPageLayout>
  );
};

import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import React from "react";

interface HeaderPageRollProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    key: "type" | "fromDate" | "toDate",
    value: string | Date | undefined,
  ) => void;
  searchTerm: string;
  filters: {
    type: string;
    fromDate?: Date;
    toDate?: Date;
  };
}

export const HeaderPageRoll: React.FC<HeaderPageRollProps> = ({
  onSearch,
  onFilterChange,
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
          value={filters.type}
          onFilterChange={(v) => onFilterChange("type", v)}
          options={[
            { value: "all", label: "نوع الجلسة" },
            { value: "court", label: "محكمة" },
            { value: "niyaba", label: "نيابة" },
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

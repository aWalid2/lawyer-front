import React from "react";
import { Plus } from "lucide-react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { HeaderDatePicker } from "@/components/shared/components/HeaderDatePicker";
import { RollSessionDialog } from "./RollSessionDialog";

interface HeaderPageRollProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: any) => void;
  searchTerm: string;
  filters: {
    type: string;
    date?: Date;
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
      {/* العنوان - في الموبايل أول عنصر */}
      <HeaderTitle innerPage title="رول الجلسات" />

      {/* السيرش - في الموبايل ثاني عنصر */}
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      {/* مجموعة الأزرار */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-row gap-3 w-full lg:w-auto">
        {/* تاريخ الجلسة */}
        <HeaderDatePicker
          date={filters.date}
          onDateChange={(date) => onFilterChange("date", date)}
        />

        {/* نوع الجلسة */}
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

        {/* زر جلسة جديدة */}
        <RollSessionDialog
          onSave={(values) => console.log("Adding session:", values)}
          trigger={
            <HeaderActionButton
              label="جلسة جديدة"
              icon={<Plus size={18} />}
              variant="gradient"
              className="rounded-main h-12.5 px-8 w-full md:w-auto"
            />
          }
        />
      </div>
    </HeaderPageLayout>
  );
};
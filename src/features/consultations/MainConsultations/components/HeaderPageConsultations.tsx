import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { ConsultationsDialog } from "./ConsultationsDialog";

interface HeaderPageConsultationsProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filters: {
    status: string;
  };
}

export const HeaderPageConsultations: React.FC<HeaderPageConsultationsProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
}) => {
  // Add logging to debug
  const handleFilterChange = (value: string) => {
    console.log("Filter changed to:", value); // Debug log
    onFilterChange(value);
  };

  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="الاستشارات" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <HeaderFilter
          placeholder="اختر الحالة"
          value={filters.status}
          onFilterChange={handleFilterChange}
          options={[
            { value: "all", label: "جميع الحالات" },
            { value: "pending", label: "قيد الانتظار" },
            { value: "completed", label: "مكتملة" },
          ]}
          className="md:w-[150px]"
        />

        <ConsultationsDialog
          onSave={(values) => console.log("New Consultation:", values)}
          trigger={
            <HeaderActionButton
              label="استشارة جديدة"
              icon={<Plus size={18} />}
              variant="gradient"
              className="rounded-main h-12.5 px-8"
            />
          }
        />
      </div>
    </HeaderPageLayout>
  );
};
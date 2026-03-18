import React from "react";
import { Plus } from "lucide-react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";
import { ContractDialog } from "./ContractDialog";

interface HeaderPageContractsProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: any) => void;
  searchTerm: string;
  filters: {
    contractType: string;
    status: string;
  };
}

export const HeaderPageContracts: React.FC<HeaderPageContractsProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="العقود" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث  ..."
        className="lg:ms-15"
      />

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">

        <HeaderFilter
          placeholder="نوع العقد"
          value={filters.contractType}
          onFilterChange={(v) => onFilterChange("contractType", v)}
          options={[
            { value: "all", label: "كل الأنواع" },
            { value: "بيع", label: "بيع" },
            { value: "إيجار", label: "إيجار" },
            { value: "صيانة", label: "صيانة" },
            { value: "استشارات", label: "استشارات" },
            { value: "خدمات", label: "خدمات" },
          ]}
          className="md:w-[130px]"
        />


        <HeaderFilter
          placeholder="الحالة"
          value={filters.status}
          onFilterChange={(v) => onFilterChange("status", v)}
          options={[
            { value: "all", label: "كل الحالات" },
            { value: "نشط", label: "نشط" },
            { value: "منتهي", label: "منتهي" },
            { value: "ملغي", label: "ملغي" },
            { value: "معلق", label: "معلق" },
          ]}
          className="md:w-[130px]"
        />


        <ContractDialog
          onSave={(values) => console.log("Adding contract:", values)}
          trigger={
            <HeaderActionButton
              label="إضافة عقد جديد"
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
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { Plus } from "lucide-react";
import React from "react";
import type { ContractFormValues } from "../types";
import { ContractDialog } from "./ContractDialog";
import { ContractValueFilters } from "./ContractValueFilters";

interface HeaderPageContractsProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    key: "endDateFrom" | "endDateTo" | "contractValueMin" | "contractValueMax",
    value: string | Date | undefined,
  ) => void;
  onCreate: (values: ContractFormValues) => Promise<void> | void;
  searchTerm: string;
  filters: {
    endDateFrom?: Date;
    endDateTo?: Date;
    contractValueMin: string;
    contractValueMax: string;
  };
  isCreatePending?: boolean;
}

export const HeaderPageContracts: React.FC<HeaderPageContractsProps> = ({
  onSearch,
  onFilterChange,
  onCreate,
  searchTerm,
  filters,
  isCreatePending = false,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="ابحث باسم الموكل"
      />

      <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">
        <HeaderDatePicker
          date={filters.endDateFrom}
          onDateChange={(date) => onFilterChange("endDateFrom", date)}
          placeholder="نهاية العقد من"
        />

        <HeaderDatePicker
          date={filters.endDateTo}
          onDateChange={(date) => onFilterChange("endDateTo", date)}
          placeholder="نهاية العقد إلى"
        />

        <ContractValueFilters
          contractValueMin={filters.contractValueMin}
          contractValueMax={filters.contractValueMax}
          onFilterChange={(key, value) => onFilterChange(key, value)}
        />

        <ContractDialog
          onSave={onCreate}
          isPending={isCreatePending}
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

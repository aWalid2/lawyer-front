import React from "react";
import { Plus } from "lucide-react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { ContractDialog } from "./ContractDialog";
import type { ContractFormValues } from "../types";

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
      <HeaderTitle innerPage title="العقود" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث  ..."
        className="lg:ms-0"
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

        <input
          type="number"
          value={filters.contractValueMin}
          onChange={(event) =>
            onFilterChange("contractValueMin", event.target.value)
          }
          placeholder="أقل قيمة"
          className="h-12.5 w-full rounded-[18px] border border-[#E2E8F0] bg-white px-4 text-right text-sm transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 md:w-32.5"
        />

        <input
          type="number"
          value={filters.contractValueMax}
          onChange={(event) =>
            onFilterChange("contractValueMax", event.target.value)
          }
          placeholder="أعلى قيمة"
          className="h-12.5 w-full rounded-[18px] border border-[#E2E8F0] bg-white px-4 text-right text-sm transition-all outline-none focus:border-[#BF9A61] focus:ring-2 focus:ring-[#BF9A61]/10 md:w-32.5"
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

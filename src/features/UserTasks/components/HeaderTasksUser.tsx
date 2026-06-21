import { HeaderDatePicker } from "@/shared/components/Header/HeaderDatePicker";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import type { SelectOption } from "@/shared/hooks/useCachedPaginatedOptions";
import React from "react";
import { AddTask } from "./AddTask";
import { UserTaskFilter } from "./UserTasksFilter";
import { ButtonShowAll } from "@/shared/components/buttons/ButtonShowAll";

interface HeaderTasksUserProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  onDateFilterChange: (
    key: "deliverDateFrom" | "deliverDateTo",
    value: Date | undefined,
  ) => void;
  searchTerm: string;
  statusFilter: string;
  deliverDateFrom?: Date;
  deliverDateTo?: Date;
  filterOptions?: SelectOption[];
  context?: "tasks" | "procedures";
}

export const HeaderTasksUser: React.FC<HeaderTasksUserProps> = ({
  onSearch,
  onFilterChange,
  onDateFilterChange,
  searchTerm,
  statusFilter,
  deliverDateFrom,
  deliverDateTo,
  filterOptions,
  context = "tasks",
}) => {
  return (
    <HeaderPageLayout>
      <HeaderSearch value={searchTerm} onChange={onSearch} />

      <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">
        <HeaderDatePicker
          date={deliverDateFrom}
          onDateChange={(date) => onDateFilterChange("deliverDateFrom", date)}
          placeholder="تاريخ التسليم من"
        />

        <HeaderDatePicker
          date={deliverDateTo}
          onDateChange={(date) => onDateFilterChange("deliverDateTo", date)}
          placeholder="تاريخ التسليم إلى"
        />

        <UserTaskFilter
          onFilterChange={onFilterChange}
          currentFilter={statusFilter}
          filterOptions={filterOptions}
        />
        <AddTask context={context} />
      </div>
      <ButtonShowAll
        text={context === "tasks" ? "عرض جميع المهمام" : "عرض جميع الاجراءات"}
      />
    </HeaderPageLayout>
  );
};

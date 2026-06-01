import React from "react";
import { UserTaskFilter } from "./UserTasksFilter";
import { AddTask } from "./AddTask";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderDatePicker } from "@/shared/components/HeaderDatePicker";

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
  filterOptions?: Array<{ value: string; label: string }>;
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
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="مهام المستخدم" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        className="lg:ms-0"
      />

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
        <AddTask />
      </div>
    </HeaderPageLayout>
  );
};

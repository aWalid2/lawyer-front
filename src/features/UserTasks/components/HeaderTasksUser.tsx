import React from "react";
import { UserTaskFilter } from "./UserTasksFilter";
import { AddTask } from "./AddTask";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";

interface HeaderTasksUser {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  statusFilter: string;
  filterOptions?: Array<{ value: string; label: string }>; // أضف هذا السطر
}

export const HeaderTasksUser: React.FC<HeaderTasksUser> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  statusFilter,
  filterOptions, 
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="مهام المستخدم" />

      <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:ms-0" />

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
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
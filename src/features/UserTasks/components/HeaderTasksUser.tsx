import React from "react";
import { UserTaskFilter } from "./UserTasksFilter";
import { AddTask } from "./AddTask";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";

interface HeaderTasksUser {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  statusFilter: string;
}

export const HeaderTasksUser: React.FC<HeaderTasksUser> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  statusFilter,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="مهام المستخدم" />

      
        <HeaderSearch value={searchTerm} onChange={onSearch} className="lg:ms-15"/>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <UserTaskFilter
          onFilterChange={onFilterChange}
          currentFilter={statusFilter}
        />
        <AddTask />
      </div>
    </HeaderPageLayout>
  );
};
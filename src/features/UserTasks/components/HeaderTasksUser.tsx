import React from "react";
import { UserTaskFilter } from "./UserTasksFilter";
import { TaskUserSearch } from "./TaskUserSerch";
import { AddTask } from "./AddTask";

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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
      <h1 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap self-start md:self-center">
        مهام المستخدم
      </h1>

      <TaskUserSearch value={searchTerm} onChange={onSearch} />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end max-sm:justify-center">
        <UserTaskFilter 
          onFilterChange={onFilterChange}
          currentFilter={statusFilter}  
        />
          <AddTask />
      </div>
    </div>
  );
};
import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { useDebounce } from "@/shared/hooks/useDebounce";
import React from "react";
import { useGetAllUsers } from "./api/hooks/useGetAllUsers";
import { UserManagementHeader } from "./components/UserManagementHeader";
import { UsersAction } from "./components/UsersAction";
import type { UserT } from "./types/userT";
import { Error } from "@/shared/components/Error";
import { useGetAllUsersSearched } from "./api/hooks/useGetAllUsersSearched";

export const UserManagementFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { data: allUsers = [], isLoading, isError, error } = useGetAllUsers();
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);

  const isSearching = debouncedSearchTerm.length > 0;
  const {
    data: allUsersSearched = [],
    isFetching: isSearchingUsers,
    isError: isSearchError,
    error: searchError,
  } = useGetAllUsersSearched(debouncedSearchTerm);

  const displayedUsers = isSearching ? allUsersSearched : allUsers;

  if (isLoading) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب المستخدمين." error={error} />;
  if (isSearchError)
    return (
      <Error
        message="حدث خطأ أثناء البحث عن المستخدمين."
        error={searchError}
      />
    );

  const columns: Column<UserT>[] = [
    {
      header: "#",
      accessor: (item: UserT) => {
        const index = displayedUsers.findIndex((u) => u.id === item.id);
        return index + 1;
      },
      headerClassName: "w-16",
      className: "w-16 text-center font-medium",
    },
    {
      header: "اسم المستخدم",
      accessor: "first_name",
      className: "font-medium",
    },
    {
      header: "البريد الإلكتروني",
      accessor: "email",
      className: "text-gray-600",
    },

    {
      header: "الدور",
      accessor: (user) => user.role.role_name || "-",
      className: "text-center",
    },
    {
      header: "الحالة",
      accessor: (user) => (
        <span className="rounded-main bg-success/20 text-success inline-flex items-center px-4 py-2 text-xs font-medium">
          {user.user_status}
        </span>
      ),
      className: "text-center",
    },
    {
      header: "إجراء",
      accessor: (user) => (
        <UsersAction
          user={user}
          onUserUpdated={() => console.log("User updated")}
        />
      ),
      headerClassName: "w-24 text-center",
      className: "w-24 text-center",
    },
  ];

  return (
    <div className="space-y-6">
      <UserManagementHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onUserUpdated={() => console.log("User added")}
      />

      {isSearchingUsers ? (
        <LoadingPage />
      ) : (
        <DataTable data={displayedUsers} columns={columns} rowIdField="id" />
      )}

      {/* {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )} */}
    </div>
  );
};

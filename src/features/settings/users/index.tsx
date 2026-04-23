import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import React from "react";
import { useGetAllUsers } from "./api/hooks/useGetAllUsers";
import { UserManagementHeader } from "./components/UserManagementHeader";
import { UsersAction } from "./components/UsersAction";
import type { UserT } from "./types/userT";
import { Error } from "@/shared/components/Error";

export const UserManagementFeature: React.FC = () => {
  const { data: allUsers = [], isLoading, isError, error } = useGetAllUsers();

  if (isLoading) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب المستخدمين." error={error} />;

  const columns: Column<UserT>[] = [
    {
      header: "#",
      accessor: (item: UserT) => {
        const index = allUsers.findIndex((u) => u.id === item.id);
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
        searchTerm={""}
        onSearch={() => {}}
        onUserUpdated={() => console.log("User added")}
      />

      <DataTable data={allUsers} columns={columns} rowIdField="id" />

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

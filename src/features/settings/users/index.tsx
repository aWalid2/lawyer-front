import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { useDebounce } from "@/shared/hooks/useDebounce";
import React from "react";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import {
  getUserStatusBadgeClass,
  getUserStatusLabel,
} from "@/shared/utils/userStatus";
import { useGetAllUsers } from "./api/hooks/useGetAllUsers";
import { UserManagementHeader } from "./components/UserManagementHeader";
import { UsersAction } from "./components/UsersAction";
import type { UserFormValues, UserT } from "./types/userT";
import { Error } from "@/shared/components/Error";
import { useGetAllUsersSearched } from "./api/hooks/useGetAllUsersSearched";

export const UserManagementFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [localUsers, setLocalUsers] = React.useState<UserT[]>([]);
  const { data: allUsers = [], isLoading, isError, error } = useGetAllUsers();
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);

  const isSearching = debouncedSearchTerm.length > 0;
  const {
    data: allUsersSearched = [],
    isFetching: isSearchingUsers,
    isError: isSearchError,
    error: searchError,
  } = useGetAllUsersSearched(debouncedSearchTerm);

  const displayedUsers = React.useMemo(() => {
    const apiUsers = (isSearching ? allUsersSearched : allUsers) as UserT[];
    const apiUserIds = new Set(apiUsers.map((user) => user.id));
    const overrides = new Map(localUsers.map((user) => [user.id, user]));

    const mergedApiUsers = apiUsers.map(
      (user) => overrides.get(user.id) ?? user,
    );
    const createdUsers = localUsers.filter((user) => !apiUserIds.has(user.id));

    return [...createdUsers, ...mergedApiUsers];
  }, [allUsers, allUsersSearched, isSearching, localUsers]);

  const handleUserUpdated = React.useCallback(
    (values?: UserFormValues, userId?: number) => {
      if (!values) {
        return;
      }

      const nextUser: UserT = {
        id: userId ?? Date.now(),
        name: values.first_name,
        first_name: values.first_name,
        email: values.email,
        phone: values.phone,
        hire_date: values.hire_date,
        civil_id: values.civil_id,
        password: values.password,
        role: {
          role_name: values.role_name,
        },
        userType: "",
        user_status: values.user_status,
        fullName: values.first_name,
      };

      setLocalUsers((prev) => {
        const nextUsers = prev.filter((user) => user.id !== nextUser.id);
        return [...nextUsers, nextUser];
      });
    },
    [],
  );

  if (isLoading) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب المستخدمين." error={error} />;
  if (isSearchError)
    return (
      <Error message="حدث خطأ أثناء البحث عن المستخدمين." error={searchError} />
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
      header: "رقم التليفون",
      accessor: (user) => user.phone || "-",
      className: "text-center",
    },
    {
      header: "تاريخ التعيين",
      accessor: (user) =>
        user.hire_date ? formatDateToYYYYMMDD(user.hire_date) : "-",
      className: "text-center",
    },
    {
      header: "الرقم المدني",
      accessor: (user) => user.civil_id || "-",
      className: "text-center",
    },

    {
      header: "الدور",
      accessor: (user) => user.role.role_name || "-",
      className: "text-center",
    },
    {
      header: "الحالة",
      accessor: (user) => (
        <span
          className={`rounded-main inline-flex items-center px-4 py-2 text-xs font-medium ${getUserStatusBadgeClass(
            user.user_status,
          )}`}
        >
          {getUserStatusLabel(user.user_status)}
        </span>
      ),
      className: "text-center",
    },
    {
      header: "إجراء",
      accessor: (user) => (
        <UsersAction user={user} onUserUpdated={handleUserUpdated} />
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
        onUserUpdated={handleUserUpdated}
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

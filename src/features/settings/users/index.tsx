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
import type { UserT } from "./types/userT";
import { Error } from "@/shared/components/Error";
import { useGetAllUsersSearched } from "./api/hooks/useGetAllUsersSearched";
import { Pagination } from "@/shared/components/Pagination";

export const UserManagementFeature: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsers();
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);
  const itemsPerPage = 15;

  const isSearching = debouncedSearchTerm.length > 0;
  const {
    data: allUsersSearched = [],
    isFetching: isSearchingUsers,
    isError: isSearchError,
    error: searchError,
    refetch: refetchSearched,
  } = useGetAllUsersSearched(debouncedSearchTerm);

  const displayedUsers = React.useMemo(() => {
    const apiUsers = (isSearching ? allUsersSearched : allUsers) as UserT[];
    return apiUsers;
  }, [allUsers, allUsersSearched, isSearching]);

  const totalPages = Math.max(
    1,
    Math.ceil(displayedUsers.length / itemsPerPage),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = React.useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return displayedUsers.slice(start, start + itemsPerPage);
  }, [displayedUsers, itemsPerPage, safeCurrentPage]);

  const handleSearch = React.useCallback((value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  }, []);

  const handleUserUpdated = React.useCallback(() => {
    if (isSearching) {
      refetchSearched();
    } else {
      refetch();
    }
    setCurrentPage(1);
  }, [isSearching, refetch, refetchSearched]);

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
      accessor: (user) => user.ssn || "-",
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
        onSearch={handleSearch}
        onUserUpdated={handleUserUpdated}
      />

      {isSearchingUsers ? (
        <LoadingPage />
      ) : (
        <DataTable data={paginatedUsers} columns={columns} rowIdField="id" />
      )}

      {totalPages > 1 && !isSearchingUsers && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

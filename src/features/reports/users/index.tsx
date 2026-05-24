import { useGetAllRoles } from "@/features/settings/permissions/api";
import { useGetAllUsersSearched } from "@/features/settings/users/api/hooks/useGetAllUsersSearched";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import { Pagination } from "@/shared/components/Pagination";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  getUserStatusBadgeClass,
  getUserStatusLabel,
} from "@/shared/utils/userStatus";
import { useMemo, useState } from "react";
import { useGetAllUserReports } from "./api/hooks/useGetAllUserReports";
import { HeaderPageReportsUsers } from "./components/HeaderPageReportsUsers";
import type { ReportUser } from "./types";

const mapUserToReportUser = (user: any, index: number): ReportUser => ({
  id: String(user.id),
  name: user.name ?? "",
  role: user.role ?? "-",
  email: user.email ?? "",
  status: user.status ?? "inactive",
  rowNumber: index + 1,
});

const ReportsUsersFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "all", status: "all" });
  const itemsPerPage = 15;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);
  const { data: roles = [] } = useGetAllRoles();

  const {
    data: allUsersResponse,
    isLoading,
    isError,
    error,
  } = useGetAllUserReports({
    status: filters.status === "all" ? undefined : filters.status,
    role_id: filters.role === "all" ? undefined : filters.role,
    page: currentPage,
    limit: itemsPerPage,
  });
  const isSearching = debouncedSearchTerm.length > 0;
  const {
    data: searchedUsers = [],
    isFetching: isSearchingUsers,
    isError: isSearchError,
    error: searchError,
  } = useGetAllUsersSearched(debouncedSearchTerm);

  const allUsers = useMemo(() => {
    return Array.isArray(allUsersResponse?.data) ? allUsersResponse.data : [];
  }, [allUsersResponse]);

  const displayedUsers = useMemo(() => {
    const source = isSearching ? searchedUsers : allUsers;
    return Array.isArray(source) ? source : [];
  }, [isSearching, searchedUsers, allUsers]);

  const reportUsers = useMemo(
    () =>
      displayedUsers.map((u, i) =>
        mapUserToReportUser(u, i + (currentPage - 1) * itemsPerPage),
      ),
    [displayedUsers, currentPage, itemsPerPage],
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const roleOptions = useMemo(() => {
    return roles.map((role) => ({
      value: String(role.id),
      label: role.role_name,
    }));
  }, [roles]);

  const handleFilterChange = (key: string, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredUsers = useMemo(() => {
    return reportUsers.filter((u) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(searchStr) ||
        u.email.toLowerCase().includes(searchStr);

      const selectedOption = roleOptions.find(
        (opt) => String(opt.value) === filters.role,
      );
      const matchesRole =
        filters.role === "all" ||
        (selectedOption && u.role === selectedOption.label);
      const matchesStatus =
        filters.status === "all" || u.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [reportUsers, searchTerm, filters, roleOptions]);

  const totalPages = isSearching
    ? Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage))
    : (allUsersResponse?.meta?.total_pages ?? 1);

  const paginatedUsers = useMemo(() => {
    if (isSearching) {
      const start = (currentPage - 1) * itemsPerPage;
      return filteredUsers.slice(start, start + itemsPerPage);
    }

    return filteredUsers;
  }, [filteredUsers, currentPage, isSearching, itemsPerPage]);

  if (isLoading) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب المستخدمين." error={error} />;
  if (isSearchError)
    return (
      <Error message="حدث خطأ أثناء البحث عن المستخدمين." error={searchError} />
    );

  const columns: Column<ReportUser>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-15",
    },
    {
      header: "اسم المستخدم",
      accessor: "name",
    },
    {
      header: "الدور",
      accessor: "role",
    },
    {
      header: "البريد الإلكتروني",
      accessor: "email",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span
          className={`font-regular rounded-full px-3 py-1 text-xs ${getUserStatusBadgeClass(
            item.status,
          )}`}
        >
          {getUserStatusLabel(item.status)}
        </span>
      ),
    },
  ];

  return (
    <PageLayout>
      <HeaderPageReportsUsers
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
        roleOptions={roleOptions}
      />

      {isSearchingUsers ? (
        <LoadingPage />
      ) : (
        <DataTable columns={columns} data={paginatedUsers} rowIdField="id" />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

export default ReportsUsersFeature;

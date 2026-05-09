import { useMemo, useState } from "react";
import { HeaderPageReportsUsers } from "./components/HeaderPageReportsUsers";
import type { ReportUser } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import PageLayout from "@/shared/components/PageLayout";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetAllUsers } from "@/features/settings/users/api/hooks/useGetAllUsers";
import { useGetAllUsersSearched } from "@/features/settings/users/api/hooks/useGetAllUsersSearched";
import type { UserT } from "@/features/settings/users/types/userT";

const ROLE_FILTER_MAP: Record<string, string[]> = {
  lawyer: ["lawyer", "محامي"],
  manager: ["manager", "admin", "مدير"],
  employee: ["employee", "موظف"],
};

const mapUserToReportUser = (user: UserT): ReportUser => ({
  id: String(user.id),
  name: [user.first_name, user.last_name].filter(Boolean).join(" ").trim(),
  role: user.role?.role_name || "-",
  email: user.email,
  status: user.user_status === "active" ? "active" : "inactive",
});

const ReportsUsersFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ role: "all", status: "all" });
  const itemsPerPage = 15;
  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 400);

  const { data: allUsers = [], isLoading, isError, error } = useGetAllUsers();
  const isSearching = debouncedSearchTerm.length > 0;
  const {
    data: searchedUsers = [],
    isFetching: isSearchingUsers,
    isError: isSearchError,
    error: searchError,
  } = useGetAllUsersSearched(debouncedSearchTerm);

  const displayedUsers = isSearching ? searchedUsers : allUsers;

  const reportUsers = useMemo(
    () => displayedUsers.map(mapUserToReportUser),
    [displayedUsers],
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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

      const allowedRoles = ROLE_FILTER_MAP[filters.role] ?? [];
      const normalizedRole = u.role.toLowerCase();
      const matchesRole =
        filters.role === "all" || allowedRoles.includes(normalizedRole);
      const matchesStatus =
        filters.status === "all" || u.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [reportUsers, searchTerm, filters]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

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
      accessor: (item) => filteredUsers.findIndex((d) => d.id === item.id) + 1,
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
          className={`font-regular rounded-full px-3 py-1 text-xs ${
            item.status === "active"
              ? "bg-success/20 text-success"
              : "bg-error/20 text-error"
          }`}
        >
          {item.status === "active" ? "نشط" : "غير نشط"}
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

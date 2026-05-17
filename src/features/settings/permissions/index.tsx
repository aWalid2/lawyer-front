import React, { useState, useMemo } from "react";
import { PermissionsHeader } from "./components/PermissionsHeader";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { PermissionsAction } from "./components/PermissionsAction";
import { usePagination } from "@/shared/hooks/usePagination";
import PageLayout from "@/shared/components/PageLayout";
import type { RoleT } from "./types";
import { useGetAllRoles } from "./api";
import LoadingPage from "@/shared/components/LoadingPage";

export const PermissionsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedRoleIds, setDeletedRoleIds] = useState<string[]>([]);

  const { data: apiRoles, isLoading, error } = useGetAllRoles();

  const roles = useMemo<RoleT[]>(() => {
    if (!apiRoles) return [];
    return apiRoles.map((role) => ({
      id: role.id.toString(),
      name: role.role_name,
      userCount: role._count?.users ?? 0,
    }));
  }, [apiRoles]);

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (p) =>
        !deletedRoleIds.includes(p.id) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm, deletedRoleIds]);

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredRoles, 15);

  const handleDelete = (id: string) => {
    setDeletedRoleIds((prev) => [...prev, id]);
  };

  const columns: Column<RoleT>[] = [
    {
      header: "#",
      accessor: (p: RoleT) =>
        filteredRoles.indexOf(p) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "الدور",
      accessor: "name" as keyof RoleT,
    },
    {
      header: "عدد المستخدمين",
      accessor: (role: RoleT) => (
        <div className="flex justify-center">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {role.userCount}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessor: (role: RoleT) => (
        <PermissionsAction
          role={role}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <PermissionsHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      {isLoading ? (
        <LoadingPage fullScreen={false} />
      ) : error ? (
        <div className="text-center py-8 text-red-500 font-semibold">
          حدث خطأ أثناء تحميل الأدوار. يرجى المحاولة مرة أخرى.
        </div>
      ) : (
        <DataTable data={currentData} columns={columns} rowIdField="id" />
      )}

      {!isLoading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
};

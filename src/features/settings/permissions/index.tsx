import React, { useState } from "react";
import { PermissionsHeader } from "./components/PermissionsHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { PermissionsAction } from "./components/PermissionsAction";
import { usePagination } from "@/hooks/usePagination";
import PageLayout from "@/components/shared/components/PageLayout";
import type { RoleT } from "./types";

const initialRoles: RoleT[] = [
  { id: "1", name: "محامي", userCount: 3 },
  { id: "2", name: "مدير عام", userCount: 3 },
  { id: "3", name: "مستشار", userCount: 3 },
  { id: "4", name: "محاسب", userCount: 3 },
  { id: "5", name: "موكل", userCount: 3 },
  { id: "6", name: "سكرتير", userCount: 3 },
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: (i + 7).toString(),
    name: `دور اختبار ${i + 7}`,
    userCount: Math.floor(Math.random() * 10),
  })),
];

export const PermissionsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<RoleT[]>(initialRoles);

  const filteredRoles = roles.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredRoles, 15);

  const handleDelete = (id: string) => {
    setRoles(roles.filter((p) => p.id !== id));
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

      <DataTable data={currentData} columns={columns} rowIdField="id" />

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

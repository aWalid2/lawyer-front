import React, { useState, useMemo } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { UserManagementHeader } from "./components/UserManagementHeader";
import { UsersAction } from "./components/UsersAction";
import type { UserT } from "./types";

const mockUsers: UserT[] = [
  { id: "1", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "2", name: "محمد علي", email: "mohalia4@gmail.com", userType: "موظف", role: "محاسب", status: "نشط" },
  { id: "3", name: "محمد علي", email: "mohalia4@gmail.com", userType: "موكل", role: "-", status: "نشط" },
  { id: "4", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "5", name: "محمد علي", email: "mohalia4@gmail.com", userType: "موظف", role: "سكرتير", status: "نشط" },
  { id: "6", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "7", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "8", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "9", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
  { id: "10", name: "محمد علي", email: "mohalia4@gmail.com", userType: "محامي", role: "-", status: "نشط" },
];

export const UserManagementFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return mockUsers.filter(
      (user) =>
        user.name.includes(searchTerm) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns: Column<UserT>[] = [
    {
      header: "#",
      accessor: (item: UserT) => {
        const index = filteredUsers.findIndex((u) => u.id === item.id);
        return index + 1;
      },
      headerClassName: "w-16",
      className: "w-16 text-center font-medium",
    },
    {
      header: "اسم المستخدم",
      accessor: "name",
      className: "font-medium",
    },
    {
      header: "البريد الإلكتروني",
      accessor: "email",
      className: "text-gray-600",
    },
    {
      header: "نوع المستخدم",
      accessor: "userType",
      className: "text-center",
    },
    {
      header: "الدور",
      accessor: "role",
      className: "text-center",
    },
    {
      header: "الحالة",
      accessor: (user) => (
        <span className="inline-flex items-center px-4 py-2 rounded-main text-xs font-medium bg-success/20 text-success">
          {user.status}
        </span>
      ),
      className: "text-center",
    },
    {
      header: "إجراء",
      accessor: (user) => (
        <UsersAction user={user} onUserUpdated={() => console.log("User updated")} />
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

      <DataTable data={currentUsers} columns={columns} rowIdField="id" />

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

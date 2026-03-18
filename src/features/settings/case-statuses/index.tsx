import React, { useState } from "react";
import { CaseStatusesHeader } from "./components/CaseStatusesHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { CaseStatusesAction } from "./components/CaseStatusesAction";
import type { CaseStatusT } from "./types";

const initialStatuses: CaseStatusT[] = [
  { id: "1", name: "متداولة", count: 3 },
  { id: "2", name: "تحت الرفع", count: 3 },
  { id: "3", name: "منتهية", count: 3 },
  { id: "4", name: "قيد التنفيذ", count: 3 },
  { id: "5", name: "موقوفة", count: 3 },
  { id: "6", name: "مضمونة", count: 3 },
  { id: "7", name: "مشطوبة", count: 3 },
  { id: "8", name: "محجوزة للحكم", count: 3 },
  { id: "9", name: "بدون متابعة", count: 3 },
  { id: "10", name: "تحقيقات", count: 3 },
];

export const CaseStatusesFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [statuses, setStatuses] = useState<CaseStatusT[]>(initialStatuses);

  const filteredStatuses = statuses.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStatuses.length / itemsPerPage);
  const currentStatuses = filteredStatuses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    setStatuses(statuses.filter((s) => s.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<CaseStatusT>) => {
    setStatuses(
      statuses.map((s) => (s.id === id ? { ...s, ...values } : s))
    );
  };

  const columns: Column<CaseStatusT>[] = [
    {
      header: "#",
      accessor: (status: CaseStatusT) =>
        statuses.indexOf(status) + 1 + (currentPage - 1) * itemsPerPage,
    },
    {
      header: "حالة القضية",
      accessor: "name" as keyof CaseStatusT,
    },
    {
      header: "عدد القضايا",
      accessor: (status: CaseStatusT) => (
        <div className="flex justify-center">
          <span className="flex items-center justify-center size-8 bg-[#94A3B8] text-white rounded-md text-xs font-bold leading-none">
            {status.count}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessor: (status: CaseStatusT) => (
        <CaseStatusesAction
          status={status}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <CaseStatusesHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onStatusAdded={() => console.log("Status added")}
      />

      <DataTable data={currentStatuses} columns={columns} rowIdField="id" />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

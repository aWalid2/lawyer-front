import React, { useState } from "react";
import { CaseStatusesHeader } from "./components/CaseStatusesHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { CaseStatusesAction } from "./components/CaseStatusesAction";
import { usePagination } from "@/hooks/usePagination";
import type { CaseStatusT } from "./types";
import PageLayout from "@/components/shared/components/PageLayout";

const initialStatuses: CaseStatusT[] = [
  {
    id: "1",
    name: "قيد الانتظار",
    count: 0,
  },
  {
    id: "2",
    name: "منتهي",
    count: 0,
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 3).toString(),
    name: `حالة اختبار ${i + 3}`,
    count: 0,
  })),
];

export const CaseStatusesFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statuses, setStatuses] = useState<CaseStatusT[]>(initialStatuses);

  const filteredStatuses = statuses.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredStatuses, 15);

  const handleDelete = (id: string) => {
    setStatuses(statuses.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<CaseStatusT>) => {
    setStatuses(statuses.map((p) => (p.id === id ? { ...p, ...values } : p)));
  };

  const columns: Column<CaseStatusT>[] = [
    {
      header: "#",
      accessor: (p: CaseStatusT) =>
        statuses.indexOf(p) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "اسم الحالة",
      accessor: "name" as keyof CaseStatusT,
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
    <PageLayout>
      <CaseStatusesHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onStatusAdded={() => console.log("Status added")}
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

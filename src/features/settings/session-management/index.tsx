import React, { useState } from "react";
import { LitigationDegreesHeader } from "./components/LitigationDegreesHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { LitigationDegreesAction } from "./components/LitigationDegreesAction";
import PageLayout from "@/components/shared/components/PageLayout";
import { usePagination } from "@/hooks/usePagination";
import type { LitigationDegreeT } from "./types";

const initialDegrees: LitigationDegreeT[] = [
  {
    id: "1",
    name: "أول درجة",
    createdAt: "2025-05-01 17:31",
    updatedAt: "2025-05-01 17:31",
  },
  {
    id: "2",
    name: "استئناف",
    createdAt: "2025-05-01 17:31",
    updatedAt: "2025-05-01 17:31",
  },
  {
    id: "3",
    name: "تميز",
    createdAt: "2025-05-01 17:31",
    updatedAt: "2025-05-01 17:31",
  },
];

export const SessionManagementFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [degrees, setDegrees] = useState<LitigationDegreeT[]>(initialDegrees);

  const filteredDegrees = degrees.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination<LitigationDegreeT>(filteredDegrees, 15);

  const handleDelete = (id: string) => {
    setDegrees(degrees.filter((d) => d.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<LitigationDegreeT>) => {
    setDegrees(
      degrees.map((d) => (d.id === id ? { ...d, ...values, updatedAt: new Date().toLocaleString() } : d))
    );
  };

  const columns: Column<LitigationDegreeT>[] = [
    {
      header: "#",
      accessor: (d: LitigationDegreeT) =>
        degrees.indexOf(d) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "نوع درجة التقاضي",
      accessor: "name" as keyof LitigationDegreeT,
    },
    {
      header: "تاريخ الانشاء",
      accessor: "createdAt" as keyof LitigationDegreeT,
    },
    {
      header: "آخر تحديث",
      accessor: "updatedAt" as keyof LitigationDegreeT,
    },
    {
      header: "الحالة",
      accessor: (degree: LitigationDegreeT) => (
        <LitigationDegreesAction
          degree={degree}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <LitigationDegreesHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onTypeAdded={() => console.log("Type added")}
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

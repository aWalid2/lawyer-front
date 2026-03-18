import React, { useState } from "react";
import { CaseTypesHeader } from "./components/CaseTypesHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { CaseTypesAction } from "./components/CaseTypesAction";
import { usePagination } from "@/hooks/usePagination";
import PageLayout from "@/components/shared/components/PageLayout";
import type { CaseTypeT } from "./types";

const initialTypes: CaseTypeT[] = [
  { id: "1", name: "جنائي", caseCount: 3 },
  { id: "2", name: "مدني", caseCount: 3 },
  { id: "3", name: "تجاري", caseCount: 3 },
  { id: "4", name: "عمالي", caseCount: 3 },
  { id: "5", name: "أحوال شخصية", caseCount: 3 },
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: (i + 6).toString(),
    name: `نوع اختبار ${i + 6}`,
    caseCount: Math.floor(Math.random() * 10),
  })),
];

export const CaseTypesFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState<CaseTypeT[]>(initialTypes);

  const filteredTypes = types.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredTypes, 15);

  const handleDelete = (id: string) => {
    setTypes(types.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<CaseTypeT>) => {
    setTypes(types.map((p) => (p.id === id ? { ...p, ...values } : p)));
  };

  const columns: Column<CaseTypeT>[] = [
    {
      header: "#",
      accessor: (p: CaseTypeT) =>
        filteredTypes.indexOf(p) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "نوع القضية",
      accessor: "name" as keyof CaseTypeT,
    },
    {
      header: "عدد القضايا",
      accessor: (type: CaseTypeT) => (
        <div className="flex justify-center">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {type.caseCount}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessor: (caseType: CaseTypeT) => (
        <CaseTypesAction
          caseType={caseType}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <CaseTypesHeader
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

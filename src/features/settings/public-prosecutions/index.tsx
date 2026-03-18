import React, { useState } from "react";
import { ProsecutionsHeader } from "./components/ProsecutionsHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { ProsecutionsAction } from "./components/ProsecutionsAction";
import { usePagination } from "@/hooks/usePagination";
import type { PublicProsecutionT } from "./types";
import PageLayout from "@/components/shared/components/PageLayout";

const initialProsecutions: PublicProsecutionT[] = [
  {
    id: "1",
    name: "نيابة جنوب الجيزة",
    address: "الجيزة - شارع الوفاء",
  },
  {
    id: "2",
    name: "نيابة شمال الجيزة",
    address: "الجيزة - المهندسين",
  },
  // Add more mock data if needed
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 3).toString(),
    name: `نيابة اختبار ${i + 3}`,
    address: `عنوان اختبار ${i + 3}`,
  })),
];

export const PublicProsecutionsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [prosecutions, setProsecutions] = useState<PublicProsecutionT[]>(initialProsecutions);

  const filteredProsecutions = prosecutions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredProsecutions, 15);

  const handleDelete = (id: string) => {
    setProsecutions(prosecutions.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<PublicProsecutionT>) => {
    setProsecutions(
      prosecutions.map((p) => (p.id === id ? { ...p, ...values } : p))
    );
  };

  const columns: Column<PublicProsecutionT>[] = [
    {
      header: "#",
      accessor: (p: PublicProsecutionT) =>
        prosecutions.indexOf(p) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "اسم النيابة",
      accessor: "name" as keyof PublicProsecutionT,
    },
    {
      header: "العنوان",
      accessor: "address" as keyof PublicProsecutionT,
    },
    {
      header: "الحالة",
      accessor: (prosecution: PublicProsecutionT) => (
        <ProsecutionsAction
          prosecution={prosecution}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <ProsecutionsHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onProsecutionAdded={() => console.log("Prosecution added")}
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

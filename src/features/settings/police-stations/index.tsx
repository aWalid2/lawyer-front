import React, { useState } from "react";
import { PoliceStationsHeader } from "./components/PoliceStationsHeader";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { Pagination } from "@/components/shared/components/Pagination";
import { PoliceStationsAction } from "./components/PoliceStationsAction";
import PageLayout from "@/components/shared/components/PageLayout";
import { usePagination } from "@/hooks/usePagination";
import type { PoliceStationT } from "./types";

const initialStations: PoliceStationT[] = [
  {
    id: "1",
    name: "مخفر الجيزة",
    address: "الجيزة - شارع الوفاء",
  },
  {
    id: "2",
    name: "مخفر الدقي",
    address: "الجيزة - الدقي",
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 3).toString(),
    name: `مخفر اختبار ${i + 3}`,
    address: `عنوان اختبار ${i + 3}`,
  })),
];

export const PoliceStationsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState<PoliceStationT[]>(initialStations);

  const filteredStations = stations.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredStations, 15);

  const handleDelete = (id: string) => {
    setStations(stations.filter((p) => p.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<PoliceStationT>) => {
    setStations(
      stations.map((p) => (p.id === id ? { ...p, ...values } : p))
    );
  };

  const columns: Column<PoliceStationT>[] = [
    {
      header: "#",
      accessor: (p: PoliceStationT) =>
        stations.indexOf(p) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "اسم المخفر",
      accessor: "name" as keyof PoliceStationT,
    },
    {
      header: "العنوان",
      accessor: "address" as keyof PoliceStationT,
    },
    {
      header: "الحالة",
      accessor: (station: PoliceStationT) => (
        <PoliceStationsAction
          station={station}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <PoliceStationsHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onStationAdded={() => console.log("Station added")}
      />

      <DataTable data={currentData} columns={columns} rowIdField="id" />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageLayout>
  );
};

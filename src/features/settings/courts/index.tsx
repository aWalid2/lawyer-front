import React, { useState } from "react";
import { CourtsHeader } from "./components/CourtsHeader";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { CourtsAction } from "./components/CourtsAction";
import { DistrictsDialog } from "./components/DistrictsDialog";
import { Button } from "@/components/ui/button";
import type { CourtT, DistrictT } from "./types";
import PageLayout from "@/shared/components/PageLayout";
import { usePagination } from "@/shared/hooks/usePagination";

const mockDistricts: DistrictT[] = [
  { id: "1", name: "محامي", status: "نشط" },
  { id: "2", name: "سكرتير", status: "نشط" },
];

const initialCourts: CourtT[] = [
  {
    id: "1",
    name: "محكمة جنوب الجيزة",
    address: "شارع فؤاد- الاسكندرية",
    caseCount: 4,
    districts: [...mockDistricts],
  },
  {
    id: "2",
    name: "محكمة شمال الجيزة",
    address: "الجيزة - الدقي",
    caseCount: 2,
    districts: [...mockDistricts],
  },
  // Add more mock data to test pagination if needed
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: (i + 3).toString(),
    name: `محكمة اختبار ${i + 3}`,
    address: `عنوان اختبار ${i + 3}`,
    caseCount: Math.floor(Math.random() * 10),
    districts: [...mockDistricts],
  })),
];

export const CourtsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [courts, setCourts] = useState<CourtT[]>(initialCourts);

  const filteredCourts = courts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination(filteredCourts, 15);

  const handleDelete = (id: string) => {
    setCourts(courts.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, values: Partial<CourtT>) => {
    setCourts(
      courts.map((c) => (c.id === id ? { ...c, ...values } : c))
    );
  };

  const columns: Column<CourtT>[] = [
    {
      header: "#",
      accessor: (court: CourtT) => filteredCourts.indexOf(court) + 1 + (currentPage - 1) * 15,
    },
    {
      header: "اسم المحكمة",
      accessor: "name" as keyof CourtT,
    },
    {
      header: "العنوان",
      accessor: "address" as keyof CourtT,
    },
    {
      header: "عدد القضايا",
      accessor: (court: CourtT) => (
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {court.caseCount}
          </span>
          <DistrictsDialog
            court={court}
            trigger={
              <Button
                variant="outline"
                className="h-8 px-3.5 py-4.5 rounded-md  bg-[#5570F1]/20 text-[#5570F1] text-sm font-regular hover:bg-[#5570F1]/20 hover:text-[#5570F1]"
              >
                عرض الدوائر
              </Button>
            }
          />
        </div>
      ),
    },
    {
      header: "إجراء",
      accessor: (court: CourtT) => (
        <CourtsAction
          court={court}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <PageLayout>
      <CourtsHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onCourtAdded={() => console.log("Court added")}
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

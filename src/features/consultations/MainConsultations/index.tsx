import { useState, useMemo, useEffect } from "react";
import { HeaderPageConsultations } from "./components/HeaderPageConsultations";
import type { Consultation, ConsultationStatus } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableConsultationsActions } from "./components/TableConsultationsActions";

const MOCK_CONSULTATIONS: Consultation[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  title: "نزاع عقاري",
  clientName: "خالد العمودي",
  lawyerName: "أ. محمد العشري",
  consultationType: "أحوال شخصية",
  contactMethod: "حضوري",
  details: "تفاصيل الاستشارة هنا...",
  status: (["approved", "rejected", "under_study"][i % 3]) as ConsultationStatus,
  requestDate: "2025-09-30",
}));

const ConsultationsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status: string }>({
    status: "all",
  });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return MOCK_CONSULTATIONS.filter((item) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchStr) ||
        item.clientName.toLowerCase().includes(searchStr) ||
        item.lawyerName.toLowerCase().includes(searchStr);

      const matchesStatus = filters.status === "all" || item.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const statusLabels: Record<ConsultationStatus, { text: string; className: string }> = {
    approved: { text: "مكتملة", className: "bg-[#E6F9F0] text-[#00C566]" },
    rejected: { text: "مرفوضة", className: "bg-[#FFF0F0] text-[#FF4D4D]" },
    under_study: { text: "قيد المراجعة", className: "bg-[#FFF9E6] text-[#FFC107]" },
  };

  const columns: Column<Consultation>[] = [
    {
      header: "#",
      accessor: (item) => filteredData.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "عنوان الاستشارة",
      accessor: "title",
    },
    {
      header: "الموكل",
      accessor: "clientName",
    },
    {
      header: "اسم المستشار",
      accessor: "lawyerName",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[item.status].className}`}>
          {statusLabels[item.status].text}
        </span>
      ),
    },
    {
      header: "تاريخ الطلب",
      accessor: "requestDate",
    },
    {
      header: "الحالة", // Actually Actions column in the screenshot
      accessor: (item) => (
        <TableConsultationsActions
          consultation={item}
          onEdit={(c) => console.log("Editing:", c)}
          onDelete={(c) => console.log("Deleting:", c)}
        />
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageConsultations
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedData}
          rowIdField="id"
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationsFeature;

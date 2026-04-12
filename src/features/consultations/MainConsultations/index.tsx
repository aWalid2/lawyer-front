import { useState, useMemo, useEffect } from "react";
import { HeaderPageConsultations } from "./components/HeaderPageConsultations";
import type { Consultation } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableConsultationsActions } from "./components/TableConsultationsActions";
import { useFetchConsultations } from "../api/hooks/useGetConsultations";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";

// Status labels configuration - بس حالتين
const statusLabels: Record<string, { text: string; className: string }> = {
  pending: { text: "قيد الانتظار", className: "bg-yellow-100 text-yellow-800" },
  completed: { text: "مكتملة", className: "bg-green-100 text-green-800" },
};

const ConsultationsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status: string }>({
    status: "all",
  });
  const itemsPerPage = 15;

  const { data: consultationsData, isPending, isError, error } = useFetchConsultations();

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    if (!consultationsData) return [];

    return consultationsData.filter((item: Consultation) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        item.consultation_details?.toLowerCase().includes(searchStr) ||
        item.client?.first_name?.toLowerCase().includes(searchStr) ||
        `${item.client?.first_name} ${item.client?.last_name}`.toLowerCase().includes(searchStr);

      const matchesStatus = filters.status === "all" || item.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [consultationsData, searchTerm, filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const columns: Column<Consultation>[] = [
    {
      header: "#",
      accessor: (item) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const indexInPage = paginatedData.findIndex((d: Consultation) => d.id === item.id);
        return startIndex + indexInPage + 1;
      },
      headerClassName: "w-15",
    },
    {
      header: "عنوان الاستشارات",
      accessor: (item) => item.consultation_details || "-",
    },
    {
      header: "الموكل",
      accessor: (item) => item.client?.first_name || "-",
    },
    {
      header: "اسم المستشار",
      accessor: (item) => item.lawyer?.first_name || "-",
    },

    {
      header: "نوع الحاله",
      accessor: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[item.status]?.className || "bg-gray-100 text-gray-800"}`}>
          {statusLabels[item.status]?.text || item.status}
        </span>
      ),
    },
    {
      header: "تاريخ الطلب",
      accessor: (item) => formatDate(item.request_date),
    },
    {
      header: "الإجراءات",
      accessor: (item) => (
        <TableConsultationsActions
          consultation={item}
          onEdit={(c) => console.log("Editing:", c)}
          onDelete={(c) => console.log("Deleting:", c)}
        />
      ),
    },
  ];

  if (isPending) { <LoadingPage />}
  if (isError) {<Error message={error?.message || "حدث خطأ أثناء جلب البيانات"} />}

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
import { useState } from "react";
import { HeaderPageConsultations } from "./components/HeaderPageConsultations";
import type { Consultation } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableConsultationsActions } from "./components/TableConsultationsActions";
import { useFetchConsultations } from "../api/hooks/useGetConsultations";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";

const formatDateToArabic = (dateString: string): string => {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const statusLabels: Record<string, { text: string; className: string }> = {
  pending: { text: "قيد الانتظار", className: "bg-yellow-100 text-yellow-800" },
  completed: { text: "مكتملة", className: "bg-green-100 text-green-800" },
};

const ConsultationsFeature = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 15;
  
  const { data: consultationsData, isPending, isError, error } = useFetchConsultations(
    page, 
    limit, 
    statusFilter, 
    searchTerm
  );
  
  const consultations = consultationsData?.data ?? [];
  const totalPages = consultationsData?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(consultations, page, limit);
  const columns: Column<Consultation>[] = [
    {
      header: "#",
      accessor: (_item: Consultation, index: number) => index + 1,
      headerClassName: "w-16",
    },
    {
      header: "عنوان الاستشارة",
      accessor: (item) => item.consultation_title || "-",
    },
    {
      header: "نوع الاستشارة",
      accessor: (item) => item.consultation_type || "-",
    },
    {
      header: "طريقة التواصل",
      accessor: (item) => item.contact_method || "-",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[item.status]?.className || "bg-gray-100 text-gray-800"}`}>
          {statusLabels[item.status]?.text || item.status}
        </span>
      ),
    },
    {
      header: "تاريخ الطلب",
      accessor: (item) => formatDateToArabic(item.request_date),
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
  if (isPending) {
    return <LoadingPage />;
  }
  
  if (isError) {
    return <Error message={error?.message || "حدث خطأ أثناء جلب البيانات"} />;
  }

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageConsultations
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setStatusFilter} // Pass setStatusFilter directly
          filters={{ status: statusFilter }}
        />

        <DataTable
          columns={columns}
          data={indexedData}
          rowIdField="id"
        />

        {totalPages > 1 && (
          <PaginationApi
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationsFeature;
import { useState, useMemo, useEffect } from "react";
import { HeaderPageReportsPayments } from "./components/HeaderPageReportsPayments";
import type { ReportPayment } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";

const MOCK_REPORT_PAYMENTS: ReportPayment[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  invoiceNumber: `${i + 1}`,
  clientName: "محمد علي",
  paymentMethod: ["تحويل", "نقدي", "بطاقة"][i % 3],
  amount: "5000 ر.س",
  responsibleEmployee: "علي العتيبي",
  date: "14/10/2025",
  status: i % 3 === 0 ? "paid" : i % 3 === 1 ? "rejected" : "inactive",
}));

const ReportsPaymentsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ status: string; date?: Date }>({ status: "all" });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredPayments = useMemo(() => {
    return MOCK_REPORT_PAYMENTS.filter((x) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        x.invoiceNumber.includes(searchStr) ||
        x.clientName.toLowerCase().includes(searchStr) ||
        x.paymentMethod.toLowerCase().includes(searchStr);

      const matchesStatus = filters.status === "all" || x.status === filters.status;

      let matchesDate = true;
      if (filters.date) {
        const paymentDate = new Date(x.date.split("/").reverse().join("-"));
        matchesDate =
          paymentDate.getDate() === filters.date.getDate() &&
          paymentDate.getMonth() === filters.date.getMonth() &&
          paymentDate.getFullYear() === filters.date.getFullYear();
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const columns: Column<ReportPayment>[] = [
    {
      header: "#",
      accessor: (item) => filteredPayments.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "رقم الفاتورة",
      accessor: "invoiceNumber",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
    },
    {
      header: "طريقة الدفع",
      accessor: "paymentMethod",
    },
    {
      header: "المبلغ",
      accessor: "amount",
    },
    {
      header: "الموظف المسؤول",
      accessor: "responsibleEmployee",
    },
    {
      header: "التاريخ",
      accessor: "date",
    },
    {
      header: "الحالة",
      accessor: (item) => {
        const statusMap = {
          paid: { label: "مدفوعة", color: "bg-success/20 text-success" },
          rejected: { label: "مرفوضة", color: "bg-error/20 text-error" },
          inactive: { label: "غير نشط", color: "bg-gray-200 text-gray-500" },
        };
        const config = statusMap[item.status];
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-regular ${config.color}`}>
            {config.label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageReportsPayments
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedPayments}
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

export default ReportsPaymentsFeature;

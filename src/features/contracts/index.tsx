import { useState, useMemo, useEffect } from "react";
import { HeaderPageContracts } from "./componnents/HeaderPageContracts";
import type { Contract } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableContractsActions } from "./componnents/TableContractsActions";

// بيانات تجريبية للعقود
const MOCK_CONTRACTS: Contract[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  contractNumber: `CONT-${String(i + 1).padStart(3, '0')}`,
  clientName: ["أحمد محمد", "فاطمة علي", "محمد إبراهيم", "سارة خالد", "عمر حسن"][i % 5],
  contractType: ["بيع", "إيجار", "صيانة", "استشارات", "خدمات"][i % 5],
  status: ["نشط", "منتهي", "ملغي", "معلق"][i % 4],
  startDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
  endDate: `2025-${String((i % 12) + 1).padStart(2, '0')}-01`,
}));

const ContractsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ contractType: string; status: string }>({
    contractType: "all",
    status: "all",
  });
  const itemsPerPage = 15;

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredContracts = useMemo(() => {
    return MOCK_CONTRACTS.filter((contract) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        contract.contractNumber.toLowerCase().includes(searchStr) ||
        contract.clientName.includes(searchStr);

      const matchesContractType = filters.contractType === "all" || contract.contractType === filters.contractType;
      const matchesStatus = filters.status === "all" || contract.status === filters.status;

      return matchesSearch && matchesContractType && matchesStatus;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  const paginatedContracts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContracts.slice(start, start + itemsPerPage);
  }, [filteredContracts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case "نشط":
        return "bg-[#11B32433] text-[#0B6E1F]";
      case "منتهي":
        return "bg-[#C600001F] text-[#C60000]";
      case "ملغي":
        return "bg-gray-100 text-gray-700";
      case "معلق":
        return "bg-[#DBC33B29] text-[#9E7F0F]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns: Column<Contract>[] = [
    {
      header: "#",
      accessor: (item) => filteredContracts.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    {
      header: "رقم العقد",
      accessor: "contractNumber",
    },
    {
      header: "اسم الموكل",
      accessor: "clientName",
    },
    {
      header: "نوع العقد",
      accessor: "contractType",
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(item.status)}`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "تاريخ بداية العقد",
      accessor: "startDate",
    },
    {
      header: "تاريخ نهاية العقد",
      accessor: "endDate",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableContractsActions
          contract={item}
          onEdit={(c) => console.log("Editing contract:", c)}
          onDelete={(c) => console.log("Deleting contract:", c)}
        />
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageContracts
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={handleFilterChange}
          filters={filters}
        />

        <DataTable
          columns={columns}
          data={paginatedContracts}
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

export default ContractsFeature;
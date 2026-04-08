import React, { useMemo } from "react";
import { DataTable } from "@/shared/components/DataTable";
import type { Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { TableCasesActions } from "./components/TableCasesActions";
import type { ClientCase } from "../../types/typesClientDetails";

export const ClientCases: React.FC<{ clientData: ClientCase[]; onEdit?: (client: ClientCase) => void }> = ({
  clientData = [],
  onEdit,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(clientData.length / itemsPerPage);

  const currentClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return clientData.slice(startIndex, startIndex + itemsPerPage);
  }, [clientData, currentPage]);

  const columns: Column<ClientCase>[] = useMemo(
    () => [
      {
        header: "#",
        accessor: (_: ClientCase, index: number) => (currentPage - 1) * itemsPerPage + index + 1,
        className: "w-16",
      },
      {
        header: "كود القضية",
        accessor: "code",
      },
      {
        header: "الرقم الآلي للقضية",
        accessor: "autoNumber",
      },
      {
        header: "موضوع القضية",
        accessor: "subject",
      },
      {
        header: "الحالة",
        accessor: (item) => (
          <span className="px-4 py-2 h-[30px] rounded-xl bg-[#5570F1]/20 text-[#5570F1] text-xs font-normal shadow-sm">
            {item.status}
          </span>
        ),
      },
      {
        header: "الصفة",
        accessor: "role",
      },
      {
        header: "تاريخ القضية",
        accessor: "date",
      },
      {
        header: "الإجراءات",
        accessor: (item) => (
          <TableCasesActions client={item} onEdit={onEdit} />
        ),
      },
    ],
    [currentPage, onEdit]
  );



  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-[#F1F1F4]">
        <div className="container pt-6">
          <DataTable
            data={currentClients}
            columns={columns}
            rowKey="id"
          />
        </div>

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

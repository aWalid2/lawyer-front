import type { Column } from "@/shared/components/DataTable";
import { DataTable } from "@/shared/components/DataTable";
import React from "react";
import type { ClientCase } from "../../types/typesClientDetails";
import { TableCasesActions } from "./components/TableCasesActions";
import { useIndexedData } from "@/shared/utils/useIndexedData";

export const ClientCases: React.FC<{ clientData: ClientCase[]; onEdit?: (client: ClientCase) => void }> = ({
  clientData = [],
  onEdit,
}) => {


  const columns: Column<ClientCase>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      className: "w-16",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case_sequence,
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: (item) => item.case_number,
    },
    {
      header: "موضوع القضية",
      accessor: (item) => item.case_title,
    },
    {
      header: "الحالة",
      accessor: (item) => (
        <span className="px-4 py-2 h-[30px] rounded-xl bg-[#5570F1]/20 text-[#5570F1] text-xs font-normal shadow-sm">
          {item.case_status_id}
        </span>
      ),
    },
    {
      header: "الصفة",
      accessor: (item) => item.client_type,
    },
    {
      header: "تاريخ القضية",
      accessor: (item) => item.created_at,
    },
    {
      header: "الإجراءات",
      accessor: (item) => (
        <TableCasesActions client={item} onEdit={onEdit} />
      ),
    },
  ]

  const indexedClientData = useIndexedData(clientData)

  return (

    <div className="container pt-6">
      <DataTable
        data={indexedClientData}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

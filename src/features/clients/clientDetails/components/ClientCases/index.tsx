import type { Column } from "@/shared/components/DataTable";
import { DataTable } from "@/shared/components/DataTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetClientCases } from "../../api/hooks/useGetClientCases";
import type { ClientCase } from "../../types/typesClientDetails";
import { TableCasesActions } from "./components/TableCasesActions";

export const ClientCases: React.FC = () => {
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
        <TableCasesActions client={item} />
      ),
    },
  ]

  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const limit = 15;
  const { data: clientCases, isPending: isClientCasesPending, isError: isClientCasesError, error } = useGetClientCases({ id: id!, page, limit });
  const indexedClientData = useIndexedData(clientCases?.data || [], page, limit)
  const totalPages = clientCases?.meta?.last_page ?? 1;



  if (isClientCasesPending) {
    return <LoadingPage />
  }
  if (isClientCasesError) {
    return <Error error={error} />
  }
  return (

    <div className="container pt-6">
      <DataTable
        data={indexedClientData}
        columns={columns}
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
  );
};

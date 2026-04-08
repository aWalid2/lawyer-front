import type { Column } from "@/shared/components/DataTable";
import { DataTable } from "@/shared/components/DataTable";
import React, { useState } from "react";
import type { ClientCase } from "../../types/typesClientDetails";
import { TableCasesActions } from "./components/TableCasesActions";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";
import { useParams } from "react-router-dom";
import { useGetClientCases } from "../../api/hooks/useGetClientCases";
import Loading from "@/shared/Loading";
import { Error } from "@/shared/components/Error";

export const ClientCases: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: clientCases, isPending: isClientCasesPending, isError: isClientCasesError } = useGetClientCases({ id: id!, page, limit });
  const totalPages = clientCases?.meta?.last_page;


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

  const indexedClientData = useIndexedData(clientCases?.data || [])


  if (isClientCasesPending) {
    return <Loading />
  }
  if (isClientCasesError) {
    return <Error />
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

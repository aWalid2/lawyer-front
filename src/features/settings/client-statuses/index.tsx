import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import React, { useState } from "react";
import { useGetClientStatuses } from "./api/hooks/useGetClientStatuses";
import { ClientStatusesAction } from "./components/ClientStatusesAction";
import { ClientStatusCount } from "./components/ClientStatusCount";
import { ClientStatusesHeader } from "./components/ClientStatusesHeader";
import type { ClientStatusT } from "./types/clientStatusT";

import { useIndexedData } from "@/shared/utils/useIndexedData";
import { Pagination } from "@/shared/components/Pagination";

export const ClientStatusesFeature: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const { data, isPending, isError, error } = useGetClientStatuses(page, limit);
  const statuses = data?.data || [];
  const totalPage = data?.meta?.total_pages || 1;

  const indexedData = useIndexedData(statuses, page, limit);

  const columns: Column<ClientStatusT>[] = [
    {
      header: "#",
      accessor: (status: ClientStatusT) => status.rowNumber,
    },
    {
      header: "صفة الموكل",
      accessor: (status: ClientStatusT) => status.name,
    },
    {
      header: "عدد الموكلين",
      accessor: (status: ClientStatusT) => (
        <ClientStatusCount
          id={status.id}
          fallbackCount={status._count?.clients ?? 0}
        />
      ),
    },
    {
      header: "الصفة",
      accessor: (clientStatus: ClientStatusT) => (
        <ClientStatusesAction clientStatus={clientStatus} />
      ),
    },
  ];

  if (isPending) return <LoadingPage />;
  if (isError) return <Error error={error} />;

  return (
    <PageLayout>
      <ClientStatusesHeader searchTerm={""} onSearch={() => {}} />

      {indexedData.length > 0 ? (
        <DataTable data={indexedData} columns={columns} rowKey="id" />
      ) : (
        <EmptyTable message="لا توجد صفات موكل حالياً" />
      )}

      {totalPage > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

import React, { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { UserClientsAction } from "@/features/users/users-clients/clients/UserClientsAction";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import type { ClientRelatedT } from "@/features/users/users-clients/types/types";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useFetchClients } from "@/features/clients/clients/api/hooks/useGetClients";
import { EmptyTable } from "@/shared/components/EmptyTable";

interface TableClientsProps {
  searchTerm: string;
}

export const TableClients: React.FC<TableClientsProps> = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const hasSearched = searchTerm.length > 0;
  const {
    data: clientsData,
    isPending,
    isError,
    error,
  } = useFetchClients(page, searchTerm, hasSearched);
  const indexedData = useIndexedData(clientsData?.data, page, limit);
  const totalPages = clientsData?.meta?.total_pages;

  const columns: Column<ClientRelatedT>[] = [
    {
      header: "#",
      accessor: (item: ClientRelatedT) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center font-medium",
    },
    {
      header: "كود الموكل",
      accessor: (item: ClientRelatedT) => item.id,
      headerClassName: "w-35 text-center",
      className: "w-35 text-center",
    },
    {
      header: "اسم الموكل",
      accessor: (item: any) => item.name || "-",
      headerClassName: "w-50",
      className: "w-50 font-medium",
    },

    {
      header: "رقم الهاتف",
      accessor: (item: any) => (
        <div className="flex items-center justify-center" dir="ltr">
          <span className="text-left">{item.phone}</span>
        </div>
      ),
      headerClassName: "w-40",
      className: "w-40",
    },
    {
      header: "الإجراءات",
      accessor: (item: ClientRelatedT) => (
        <UserClientsAction client={item} onClientUpdated={() => {}} />
      ),
      headerClassName: "w-35 text-center",
      className: "w-35 text-center",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-main border border-gray-200 p-4">
        <h1 className="mt-4 mb-8 text-xl font-semibold">قائمة الموكلين</h1>

        {!hasSearched ? (
          <EmptyTable message="ابحث عن موكل لعرض النتائج" />
        ) : isPending ? (
          <LoadingPage />
        ) : isError ? (
          <Error message="حدث خطأ في تحميل البيانات" error={error} />
        ) : indexedData?.length === 0 ? (
          <EmptyTable message="لا توجد نتائج تطابق بحثك" />
        ) : (
          <>
            <DataTable data={indexedData} columns={columns} rowKey="user_id" />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

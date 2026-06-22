import React, { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { ProsecutionsAction } from "./components/ProsecutionsAction";
import { ProsecutionsHeader } from "./components/ProsecutionsHeader";
import { useFetchProsecutions } from "./api/hooks/useGetProsecutions";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import type { ProsecutionT } from "./types/prosecutionsTypes";
import PageLayout from "@/shared/components/PageLayout";
import { Pagination } from "@/shared/components/Pagination";

export const PublicProsecutionsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    data: prosecutionsResponse,
    isPending,
    isError,
    refetch,
  } = useFetchProsecutions(page, limit);

  const prosecutions = prosecutionsResponse?.data || [];
  const totalPages = prosecutionsResponse?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(prosecutions || []);

  const columns: Column<ProsecutionT>[] = [
    {
      header: "#",
      accessor: (item: ProsecutionT) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center",
    },
    {
      header: "اسم النيابة",
      accessor: "name",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "العنوان",
      accessor: "address",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "الإجراءات",
      accessor: (item: ProsecutionT) => (
        <ProsecutionsAction
          prosecution={item}
          onProsecutionUpdated={() => {
            refetch();
          }}
        />
      ),
      headerClassName: "w-35",
      className: "w-35",
    },
  ];

  if (isPending) return <LoadingPage />;
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <PageLayout>
      <ProsecutionsHeader
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onProsecutionAdded={() => {
          refetch();
        }}
      />

      {indexedData.length > 0 ? (
        <>
          <DataTable data={indexedData} columns={columns} rowIdField="id" />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <EmptyTable message="لا توجد نيابات تطابق معايير البحث" />
      )}
    </PageLayout>
  );
};

import { DataTable, type Column } from "@/shared/components/DataTable";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import PageLayout from "@/shared/components/PageLayout";
import React, { useState } from "react";
import { useGetCaseTypes } from "./api/hooks/useGetCaseTypes";
import { CaseTypesAction } from "./components/CaseTypesAction";
import { CaseTypesHeader } from "./components/CaseTypesHeader";
import type { CaseTypeT } from "./types/casesT";

import { useIndexedData } from "@/shared/utils/useIndexedData";
import { PaginationApi } from "@/shared/components/PaginationApi";

export const CaseTypesFeature: React.FC = () => {

  const [page, setPage] = useState(1);
  const limit = 15;
  const { data, isPending, isError, error } = useGetCaseTypes(page, limit);
  const types = data?.data || [];
  const indexedData = useIndexedData(types, page, limit);
  const totalPage = data?.meta?.total_pages || 1;



  const columns: Column<CaseTypeT>[] = [
    {
      header: "#",
      accessor: (type: CaseTypeT) => type.rowNumber
    },
    {
      header: "نوع القضية",
      accessor: (type: CaseTypeT) => type.name,
    },
    {
      header: "عدد القضايا",
      accessor: (type: CaseTypeT) => (
        <div className="flex justify-center">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {type._count?.cases ?? 0}
          </span>
        </div>
      ),
    },
    {
      header: "الحالة",
      accessor: (caseType: CaseTypeT) => (
        <CaseTypesAction
          caseType={caseType}
        />
      ),
    },
  ];

  if (isPending) return <LoadingPage />;
  if (isError) return <Error error={error} />;

  return (
    <PageLayout>
      <CaseTypesHeader
        searchTerm={''}
        onSearch={() => { }}
      />

      {indexedData ? (

        <DataTable data={indexedData} columns={columns} rowKey="id" />

      ) : (

        <EmptyTable message="لا توجد أنواع قضايا حالياً" />


      )}
      {totalPage > 1 && (
        <PaginationApi
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

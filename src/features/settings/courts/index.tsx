import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/shared/components/DataTable";
import PageLayout from "@/shared/components/PageLayout";
import React, { useState } from "react";
import { CourtsAction } from "./components/CourtsAction";
import { CourtsHeader } from "./components/CourtsHeader";
import { DistrictsDialog } from "./components/DistrictsDialog";
import type { CourtT } from "./types/courtTypes";

import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useGetCourts } from "./api/hooks/useGetCourts";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { PaginationApi } from "@/shared/components/PaginationApi";


export const CourtsFeature: React.FC = () => {
  const columns: Column<CourtT>[] = [
    {
      header: "#",
      accessor: (court: CourtT) => court.rowNumber
    },
    {
      header: "اسم المحكمة",
      accessor: (court: CourtT) => court.name
    },
    {
      header: "العنوان",
      accessor: (court: CourtT) => court.address,
    },
    {
      header: "عدد الدوائر",
      accessor: (court: CourtT) => (
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {court.circles_count}
          </span>
          <DistrictsDialog
            court={court}
            trigger={
              <Button
                variant="outline"
                className="h-8 px-3.5 py-4.5 rounded-md  bg-[#5570F1]/20 text-[#5570F1] text-sm font-regular hover:bg-[#5570F1]/20 hover:text-[#5570F1]"
              >
                عرض الدوائر
              </Button>
            }
          />
        </div>
      ),
    },
    {
      header: "إجراء",
      accessor: (court: CourtT) => (
        <CourtsAction
          court={court}

        />
      ),
    },
  ];

  const [page, setPage] = useState(1);
  const limit = 15;

  const { data: courts, isPending, isError } = useGetCourts(page, limit);
  const indexedData = useIndexedData(courts?.data || []);
  const totalPages = courts?.meta?.total_pages ?? 1;

  if (isPending) return <LoadingPage />
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />

  return (
    <PageLayout>
      <CourtsHeader
        onCourtAdded={() => console.log("Court added")}
      />

      {indexedData?.length > 0 ? (
        <DataTable data={indexedData} columns={columns} rowIdField="id" />
      ) : (
        <EmptyTable message="لا يوجد محاكم" />
      )}
      {indexedData?.length > 0 && totalPages > 1 && (
        <PaginationApi
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </PageLayout>
  );
};

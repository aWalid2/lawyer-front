import React from "react";
import { CourtsHeader } from "./components/CourtsHeader";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { CourtsAction } from "./components/CourtsAction";
import { DistrictsDialog } from "./components/DistrictsDialog";
import { Button } from "@/components/ui/button";
import type { CourtT } from "./types/courtTypes";
import PageLayout from "@/shared/components/PageLayout";
import { usePagination } from "@/shared/hooks/usePagination";
import { useGetCourts } from "./api/hooks/useGetCourts";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { Pagination } from "@/shared/components/Pagination";
import { EmptyTable } from "@/shared/components/EmptyTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";


export const CourtsFeature: React.FC = () => {


  const { data: courts, isPending, isError } = useGetCourts();
  const indexedData = useIndexedData(courts);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination<CourtT>(indexedData || [], 15);
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
      header: "عدد القضايا",
      accessor: (court: CourtT) => (
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center justify-center size-8 bg-[#A6A6A6] text-white rounded-md text-xs font-bold leading-none">
            {court.cases_count ? court.cases_count : 0}
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


  if (isPending) return <LoadingPage />
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />

  return (
    <PageLayout>
      <CourtsHeader
        onCourtAdded={() => console.log("Court added")}
      />

      <DataTable data={indexedData} columns={columns} rowIdField="id" />
      {courts?.length > 0 ? (
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )
      ) : (
        <EmptyTable message="لا يوجد محاكم" />
      )}
    </PageLayout>
  );
};

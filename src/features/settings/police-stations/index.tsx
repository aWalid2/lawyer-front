import React, { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/DataTable'
import { PoliceStationsAction } from './components/PoliceStationsAction';
import { PoliceStationsHeader } from './components/PoliceStationsHeader';
import { useFetchPoliceStations } from './api/hooks/useGetStation';
import { Error } from '@/shared/components/Error';
import LoadingPage from '@/shared/components/LoadingPage';
import { PaginationApi } from '@/shared/components/PaginationApi';
import type { PoliceStationT } from './types/policeStationTypes';
import PageLayout from '@/shared/components/PageLayout';
import { useIndexedData } from '@/shared/utils/useIndexedData';

interface PoliceStationWithRowNumber extends PoliceStationT {
  rowNumber: number;
}

export const PoliceStationsFeature: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data: stationsResponse, isPending, isError, refetch } = useFetchPoliceStations(page, limit, searchTerm);

  const stations = stationsResponse?.data || [];
  const totalPages = stationsResponse?.meta?.total_pages ?? 1;

    const indexedData = useIndexedData(stations || []);

    

  const columns: Column<PoliceStationWithRowNumber>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center",
    },
    {
      header: "اسم المخفر",
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
      accessor: (item) => (
        <PoliceStationsAction
          station={item}
          onStationUpdated={() => {
            refetch();
          }}
        />
      ),
      headerClassName: "w-35",
      className: "w-35",
    },
  ];

  if (isPending) return <LoadingPage />
  if (isError) return <Error message="حدث خطأ في تحميل البيانات" />;

  return (
    <PageLayout>
        <PoliceStationsHeader
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onStationAdded={() => {
            refetch();
          }}
        />

        <DataTable
          data={indexedData}
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

        {indexedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد مراكز شرطة تطابق معايير البحث
          </div>
        )}
    </PageLayout>
  );
};
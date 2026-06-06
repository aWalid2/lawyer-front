import { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { useSearchSessions } from "@/features/roll/api/hooks/useSearchSessions";
import { useRoll } from "@/features/roll/hooks/useRoll";
import LoadingPage from "@/shared/components/LoadingPage";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { formatDateToYYYYMMDD } from "@/shared/utils";
import type { RollSession } from "@/features/roll/types";

interface TableSessionsProps {
  searchTerm: string;
}

export const TableSessions: React.FC<TableSessionsProps> = ({ searchTerm }) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const hasSearched = searchTerm.length > 0;
  const { mapRollSession } = useRoll();

  const { data: sessionsData, isPending } = useSearchSessions({
    q: searchTerm,
    page,
    limit,
    enabled: hasSearched,
  });

  const totalPages = sessionsData?.meta?.total_pages ?? 1;
  const sessions: RollSession[] = (sessionsData?.data || []).map(
    (session, index) => mapRollSession(session, index),
  );

  const columns: Column<RollSession>[] = [
    {
      header: "#",
      accessor: (_item: RollSession, index: number) =>
        (page - 1) * limit + index + 1,
      headerClassName: "w-13",
      className: "w-13 text-center font-medium",
    },
    {
      header: "رقم القضية",
      accessor: (item: RollSession) => item.caseSequence,
      headerClassName: "w-35",
      className: "w-35 font-medium",
    },
    {
      header: "اسم الموكل",
      accessor: (item: RollSession) => item.clientName,
      headerClassName: "w-40",
      className: "w-40",
    },
    {
      header: "عنوان القضية",
      accessor: (item: RollSession) => item.caseTitle,
      headerClassName: "w-40",
      className: "w-40",
    },
    {
      header: "تاريخ الجلسة",
      accessor: (item: RollSession) => formatDateToYYYYMMDD(item.sessionDate),
      headerClassName: "w-35 text-center",
      className: "w-35 text-center",
    },
    {
      header: "المصدر",
      accessor: (item: RollSession) => item.sessionSource,
      headerClassName: "w-30 text-center",
      className: "w-30 text-center",
    },
    {
      header: "القرار",
      accessor: (item: RollSession) => item.session_decision,
      headerClassName: "w-30 text-center",
      className: "w-30 text-center",
    },
  ];

  return (
    <div className="w-full space-y-6 pt-6">
      <div className="rounded-main border border-gray-200 p-4">
        <h1 className="mt-4 mb-8 text-xl font-semibold">قائمة الجلسات</h1>

        {!hasSearched ? (
          <EmptyTable message="ابحث عن جلسة لعرض النتائج" />
        ) : isPending ? (
          <LoadingPage fullScreen={false} />
        ) : sessions.length === 0 ? (
          <EmptyTable message="لا توجد نتائج تطابق بحثك" />
        ) : (
          <>
            <DataTable data={sessions} columns={columns} rowKey={"id"} />
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

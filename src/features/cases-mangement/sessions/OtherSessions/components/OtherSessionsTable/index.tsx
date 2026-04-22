import React, { useState } from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import {
  getOtherSessionLawyerName,
  type OtherSession,
  type OtherSessionFormValues,
  toOtherSessionRequest,
} from "../../types/typesOther";
import { AddOtherSessionDialog } from "./components/AddOtherSessionDialog";
import { OtherActions } from "./components/OtherActions";
import { useParams } from "react-router-dom";
import { useGetOtherSessions } from "../../api/hooks/useGetOtherSessions";
import { useCreateOtherSession } from "../../api/hooks/useCreateOtherSession";
import { useUpdateOtherSession } from "../../api/hooks/useUpdateOtherSession";
import { useDeleteOtherSession } from "../../api/hooks/useDeleteOtherSession";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { OtherSessionDetailsDialog } from "./components/OtherSessionDetailsDialog";

export const OtherSessionsTable: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const {
    data: sessionsResponse,
    isPending,
    isError,
    error,
  } = useGetOtherSessions(caseId, page, 5);

  const sessionsData: OtherSession[] = sessionsResponse?.data ?? [];
  const indexedSessionsData = useIndexedData(sessionsData, page, 5);
  const totalPages =
    sessionsResponse?.meta?.totalPages ??
    (Math.ceil((sessionsResponse?.meta?.total ?? 0) / 5) || 1);

  const createMutation = useCreateOtherSession(caseId!);
  const updateMutation = useUpdateOtherSession(caseId!);
  const deleteMutation = useDeleteOtherSession(caseId!);

  const handleSave = async (values: OtherSessionFormValues, id?: number) => {
    const payload = toOtherSessionRequest(values);

    if (id) {
      await updateMutation.mutateAsync({ id, data: payload });
    } else {
      await createMutation.mutateAsync({ caseId: caseId!, data: payload });
    }
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleOpenEdit = (id: number) => {
    setSelectedSessionId(id);
    setIsFormOpen(true);
  };

  const handleOpenView = (id: number) => {
    setSelectedSessionId(id);
    setIsViewOpen(true);
  };

  if (isPending) return <LoadingPage />;
  if (isError) {
    return (
      <Error message="حدث خطأ أثناء جلب الجلسات الإدارية." error={error} />
    );
  }
  const columns: Column<OtherSession>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-[60px]",
    },
    {
      header: "نوع الإجراء",
      accessor: "actionType",
    },
    {
      header: "تاريخ الجلسة",
      accessor: (item) => {
        const date = formatDateToYYYYMMDD(item.session_date);
        const time = formatDateToTime(item.session_date);
        return [date, time].filter(Boolean).join(" - ") || "-";
      },
    },
    {
      header: "المحامي المسؤول",
      accessor: (item) => getOtherSessionLawyerName(item),
      className: "font-medium text-gray-800",
    },
    {
      header: "قرار الجلسة",
      accessor: "session_decision",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <OtherActions
          item={item}
          onView={() => handleOpenView(item.id)}
          onEdit={() => handleOpenEdit(item.id)}
          onDelete={() => handleDelete(item.id)}
        />
      ),
    },
  ];

  return (
    <div className="rounded-2xl border border-[#eeeeee] bg-white p-4 md:p-6">
      <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold sm:w-auto">
          الجلسات الإدارية
        </h1>
        <AddOtherSessionDialog
          onSave={handleSave}
          isPending={createMutation.isPending}
          trigger={
            <button
              type="button"
              className="font-cairo flex h-12.5 w-full items-center justify-center gap-2 rounded-md bg-[#CBA46226] px-6 font-semibold text-[#CBA462] transition-all duration-200 hover:bg-[#CBA46240] sm:w-auto"
            >
              + إضافة جلسة إدارية
            </button>
          }
        />
      </div>

      <div className="overflow-hidden">
        {indexedSessionsData.length === 0 ? (
          <EmptyTable message="لا يوجد جلسات إدارية" />
        ) : (
          <>
            <DataTable
              data={indexedSessionsData}
              columns={columns}
              rowIdField="id"
            />
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

      {isFormOpen && (
        <AddOtherSessionDialog
          open={isFormOpen}
          onOpenChange={(open: boolean) => {
            setIsFormOpen(open);
            if (!open) {
              setSelectedSessionId(null);
            }
          }}
          sessionId={selectedSessionId ?? undefined}
          onSave={handleSave}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {selectedSessionId && (
        <OtherSessionDetailsDialog
          open={isViewOpen}
          onOpenChange={(open: boolean) => {
            setIsViewOpen(open);
            if (!open) {
              setSelectedSessionId(null);
            }
          }}
          sessionId={selectedSessionId}
          onEdit={() => {
            setIsViewOpen(false);
            setIsFormOpen(true);
          }}
        />
      )}
    </div>
  );
};

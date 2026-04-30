import React from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import {
  getOtherSessionLawyerName,
  type OtherSession,
} from "../../types/typesOther";
import { AddOtherSessionDialog } from "./components/AddOtherSessionDialog";
import { OtherActions } from "./components/OtherActions";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { EmptyTable } from "@/shared/components/EmptyTable";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { OtherSessionDetailsDialog } from "./components/OtherSessionDetailsDialog";
import { useOtherSessionsTable } from "./hooks/useOtherSessionsTable";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";

export const OtherSessionsTable: React.FC = () => {
  const {
    page,
    setPage,
    selectedSessionId,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedSessionsData,
    totalPages,
    handleSave,
    handleDelete,
    handleOpenEdit,
    handleOpenView,
    handleFormOpenChange,
    handleViewOpenChange,
    handleEditFromView,
    isCreatePending,
    isSubmitting,
  } = useOtherSessionsTable();

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
      accessor: (item) => formatDateToYYYYMMDD(item.session_date),
    },
    {
      header: "وقت الجلسة",
      accessor: (item) => formatDateToTime(item.session_date),
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
    <CustomLayoutBorder>
      <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
        <h1 className="text-secondary font-cairo w-full text-right text-[18px] font-semibold sm:w-auto">
          الجلسات الإدارية
        </h1>
        <AddOtherSessionDialog
          onSave={handleSave}
          isPending={isCreatePending}
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
          onOpenChange={handleFormOpenChange}
          sessionId={selectedSessionId ?? undefined}
          onSave={handleSave}
          isPending={isSubmitting}
        />
      )}

      {selectedSessionId && (
        <OtherSessionDetailsDialog
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          sessionId={selectedSessionId}
          onEdit={handleEditFromView}
        />
      )}
    </CustomLayoutBorder>
  );
};

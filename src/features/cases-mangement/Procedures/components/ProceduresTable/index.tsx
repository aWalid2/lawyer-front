import React from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { CustomLayoutBorder } from "@/shared/components/CustomLayoutBorder";
import { EmptyTable } from "@/shared/components/EmptyTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import {
  formatDateToTime,
  formatDateToYYYYMMDD,
} from "@/shared/utils/convertDate";
import { AddProcedureDialog } from "./components/AddProcedureDialog";
import { ProcedureActions } from "./components/ProcedureActions";
import { ProcedureDetailsDialog } from "./components/ProcedureDetailsDialog";
import { useProceduresTable } from "./hooks/useProceduresTable";
import { getProcedureLawyerName, type Procedure } from "../../types";

export const ProceduresTable: React.FC = () => {
  const {
    page,
    setPage,
    selectedProcedureId,
    isFormOpen,
    isViewOpen,
    isPending,
    isError,
    error,
    indexedProceduresData,
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
  } = useProceduresTable();

  if (isPending) return <LoadingPage />;
  if (isError) {
    return <Error message="حدث خطأ أثناء جلب الإجراءات." error={error} />;
  }

  const columns: Column<Procedure>[] = [
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
      header: "تاريخ الإجراء",
      accessor: (item) => formatDateToYYYYMMDD(item.session_date),
    },
    {
      header: "وقت الإجراء",
      accessor: (item) => formatDateToTime(item.session_date),
    },
    {
      header: "المحامي المسؤول",
      accessor: (item) => getProcedureLawyerName(item),
      className: "font-medium text-gray-800",
    },
    {
      header: "قرار الإجراء",
      accessor: "session_decision",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <ProcedureActions
          procedure={item}
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
          الإجراءات
        </h1>
        <AddProcedureDialog
          onSave={handleSave}
          isPending={isCreatePending}
          trigger={
            <button
              type="button"
              className="font-cairo flex h-12.5 w-full items-center justify-center gap-2 rounded-md bg-[#CBA46226] px-6 font-semibold text-[#CBA462] transition-all duration-200 hover:bg-[#CBA46240] sm:w-auto"
            >
              + إضافة إجراء
            </button>
          }
        />
      </div>

      <div className="overflow-hidden">
        {indexedProceduresData.length === 0 ? (
          <EmptyTable message="لا يوجد إجراءات" />
        ) : (
          <>
            <DataTable
              data={indexedProceduresData}
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
        <AddProcedureDialog
          open={isFormOpen}
          onOpenChange={handleFormOpenChange}
          procedureId={selectedProcedureId ?? undefined}
          onSave={handleSave}
          isPending={isSubmitting}
        />
      )}

      {selectedProcedureId && (
        <ProcedureDetailsDialog
          open={isViewOpen}
          onOpenChange={handleViewOpenChange}
          procedureId={selectedProcedureId}
          onEdit={handleEditFromView}
        />
      )}
    </CustomLayoutBorder>
  );
};

import { DataTable, type Column } from "@/shared/components/DataTable";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { UsersTaskActions } from "./UsersTaskActions";
import UpdateStatusTaskModal from "./UpdateStatusTaskModal";
import { useState } from "react";
import { getStatusStyle, statusMapping } from "../types/types";
import type { TaskWithCase } from "../types/types";
import { useGetAllProcedures } from "../api/hooks/useGetAllProcedures";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import { Error } from "@/shared/components/Error";

interface ProceduresTableProps {
  searchTerm: string;
  deliverDateFrom?: Date;
  deliverDateTo?: Date;
}

const ProcedureStatusCell: React.FC<{ status: string }> = ({ status }) => {
  const cleanStatus = status?.trim() || "";
  const arabicStatus = statusMapping[cleanStatus] || cleanStatus;
  return (
    <span
      className={`inline-block rounded-full px-3 py-1.5 text-sm font-medium underline-offset-4 hover:underline ${getStatusStyle(cleanStatus)}`}
    >
      {arabicStatus}
    </span>
  );
};

export const ProceduresTable: React.FC<ProceduresTableProps> = ({
  searchTerm,
  deliverDateFrom,
  deliverDateTo,
}) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const {
    data: proceduresResponse,
    isFetching,
    isPending,
    isError,
    error,
  } = useGetAllProcedures(
    page,
    limit,
    deliverDateFrom,
    deliverDateTo,
    searchTerm,
  );
  const procedures = proceduresResponse?.data ?? [];
  const totalPages = proceduresResponse?.meta?.total_pages ?? 1;

  const [
    selectedProcedureForStatusUpdate,
    setSelectedProcedureForStatusUpdate,
  ] = useState<TaskWithCase | null>(null);

  if (isPending && procedures.length === 0) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const handleStatusSave = () => {
    setSelectedProcedureForStatusUpdate(null);
  };

  const columns: Column<TaskWithCase>[] = [
    {
      header: "#",
      accessor: (_item, index) => index + 1,
      headerClassName: "w-13",
      className: "w-13 text-center",
    },
    {
      header: "كود القضية",
      accessor: (item) => item.case?.case_sequence || "-",
    },
    {
      header: "الرقم الالي ",
      accessor: (item) => item.case?.reference_number || "-",
    },
    {
      header: "عنوان القضية",
      accessor: (item) => item.case?.case_title || "-",
    },
    {
      header: "عنوان الإجراء",
      accessor: (item) => item.task_title || "-",
    },
    {
      header: "تاريخ الانشاء ",
      accessor: (item) => formatDateToYYYYMMDD(item.created_at) || "-",
    },
    {
      header: "الموظف المسئول ",
      accessor: (item) =>
        item.assignee?.first_name
          ? `${item.assignee.first_name}${item.assignee.last_name ? ` ${item.assignee.last_name}` : ""}`
          : "-",
    },
    {
      header: "حالة الاجراء",
      accessor: (item) => (
        <button
          type="button"
          className="text-primary underline-offset-4 hover:underline"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedProcedureForStatusUpdate(item);
          }}
        >
          <ProcedureStatusCell status={item.status} />
        </button>
      ),
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "إجراء",
      accessor: (item) => <UsersTaskActions caseItem={item} />,
      headerClassName: "w-35",
      className: "w-35",
    },
  ];

  return (
    <>
      <div className="relative">
        {isFetching ? (
          <div className="dark:bg-backgroundDark/70 absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <LoadingPage fullScreen={false} />
          </div>
        ) : null}

        <DataTable data={procedures} columns={columns} rowIdField="id" />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {procedures.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          لا توجد إجراءات تطابق معايير البحث
        </div>
      )}

      {selectedProcedureForStatusUpdate && (
        <UpdateStatusTaskModal
          taskId={String(selectedProcedureForStatusUpdate.id)}
          initialValues={{ status: selectedProcedureForStatusUpdate.status }}
          onClose={() => setSelectedProcedureForStatusUpdate(null)}
          onSave={handleStatusSave}
        />
      )}
    </>
  );
};

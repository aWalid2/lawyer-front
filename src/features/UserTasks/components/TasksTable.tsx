import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useState } from "react";
import { UsersTaskActions } from "./UsersTaskActions";
import UpdateStatusTaskModal from "./UpdateStatusTaskModal";
import { useFetchTasks } from "../api/hooks/useGetTasks";
import type { TaskRelatedT } from "../types/types";
import { getStatusStyle, statusMapping } from "../types/types";
import { Error } from "@/shared/components/Error";

const StatusCell: React.FC<{ status: string }> = ({ status }) => {
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

interface TasksTableProps {
  searchTerm: string;
  deliverDateFrom?: Date;
  deliverDateTo?: Date;
}

export const TasksTable: React.FC<TasksTableProps> = ({
  searchTerm,
  deliverDateFrom,
  deliverDateTo,
}) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const {
    data: tasksResponse,
    isPending,
    isError,
    error,
    isFetching,
  } = useFetchTasks(page, limit, deliverDateFrom, deliverDateTo, searchTerm);
  const tasks = tasksResponse?.data;
  const totalPages = tasksResponse?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(tasks || [], page, limit);

  const [selectedTaskForStatusUpdate, setSelectedTaskForStatusUpdate] =
    useState<TaskRelatedT | null>(null);

  if (isPending && !tasks) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  const columns: Column<TaskRelatedT>[] = [
    {
      header: "#",
      accessor: (item: TaskRelatedT) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13 text-center",
    },
    {
      header: "عنوان المهمة",
      accessor: "task_title",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "مُسند المهمة",
      accessor: (item: TaskRelatedT) =>
        item.assigner?.first_name || item.assigner?.name || "-",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "المكلف بالمهمة",
      accessor: (item: TaskRelatedT) =>
        item.assignee?.first_name || String(item.assigned_to || "-"),
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "الحالة",
      accessor: (item: TaskRelatedT) => (
        <button
          type="button"
          className="text-primary underline-offset-4 hover:underline"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedTaskForStatusUpdate(item);
          }}
        >
          <StatusCell status={item.status} />
        </button>
      ),
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "تاريخ التسليم",
      accessor: (item: TaskRelatedT) =>
        formatDateToYYYYMMDD(item.delivery_date) || "-",
      headerClassName: "w-35 text-center",
      className: "w-35 text-center font-medium",
    },
    {
      header: "إجراء",
      accessor: (item: TaskRelatedT) => <UsersTaskActions caseItem={item} />,
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

        <DataTable data={indexedData} columns={columns} rowIdField="id" />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {indexedData.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          لا توجد مهام تطابق معايير البحث
        </div>
      )}

      {selectedTaskForStatusUpdate && (
        <UpdateStatusTaskModal
          taskId={selectedTaskForStatusUpdate.id}
          initialValues={{ status: selectedTaskForStatusUpdate.status }}
          onClose={() => setSelectedTaskForStatusUpdate(null)}
          onSave={() => setSelectedTaskForStatusUpdate(null)}
        />
      )}
    </>
  );
};

import { DataTable, type Column } from "@/shared/components/DataTable";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useGetUpcomingTasks } from "./api/hooks/useGetUpcomingTasks";
import type { UpcomingTask } from "./api/services/getUpcomingTasks";
import { getDecisionStyles } from "@/shared/utils/getDescionStyle";
import { decisionOptions } from "@/shared/constants/procedursOptions";
import { getOptionLabel } from "@/shared/utils/getOptionLabel";

const columns: Column<UpcomingTask>[] = [
  {
    header: "#",
    accessor: (_item, index) => index + 1,
    headerClassName: "w-[60px]",
  },
  { header: "عنوان المهمة", accessor: "task_title" },
  {
    header: "تاريخ التسليم",
    accessor: (item) =>
      item.delivery_date
        ? format(new Date(item.delivery_date), "d MMMM yyyy", { locale: ar })
        : "-",
  },
  {
    header: "الحالة",
    accessor: (item) => (
      <span
        className={`rounded-main px-3.5 py-1.5 text-xs font-medium whitespace-nowrap ${getDecisionStyles(item.status)}`}
      >
        {getOptionLabel(item.status, decisionOptions)}
      </span>
    ),
  },
  {
    header: "تفاصيل",
    accessor: (item) => item.details || item.notes || "-",
  },
  {
    header: "إجراء",
    accessor: (item) => (
      <ViewLinkTablePageDetails to={`/dashboard/user-tasks/${item.id}`} />
    ),
  },
];

export const TableTasks = () => {
  const { data, isPending, isError, error } = useGetUpcomingTasks();

  if (isPending) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب المهام." error={error} />;

  const tasks = data ?? [];

  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        لا توجد مهام غير مكتملة
      </p>
    );
  }

  return <DataTable data={tasks} columns={columns} rowIdField="id" />;
};

import { DataTable, type Column } from "@/shared/components/DataTable";
import { ViewIcon } from "@/shared/icons/View";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useGetActiveProcedures } from "./api/hooks/useGetActiveProcedures";
import type { ActiveProcedure } from "./api/services/getActiveProcedures";
import { decisionOptions } from "@/shared/constants/procedursOptions";
import { getDecisionStyles } from "@/shared/utils/getDescionStyle";
import { getOptionLabel } from "@/shared/utils/getOptionLabel";

const columns: Column<ActiveProcedure>[] = [
  { header: "#", accessor: "id", headerClassName: "w-[60px]" },
  { header: "المحامي", accessor: (item) => item.lawyer?.name || "-" },
  {
    header: "تاريخ الجلسة",
    accessor: (item) =>
      item.session_date
        ? format(new Date(item.session_date), "d MMMM yyyy", { locale: ar })
        : "-",
  },
  {
    header: "حالة الإجراء",
    accessor: (item) => (
      <span
        className={`rounded-main px-3.5 py-1.5 text-xs font-medium whitespace-nowrap ${getDecisionStyles(item.session_decision)}`}
      >
        {getOptionLabel(item.session_decision, decisionOptions)}
      </span>
    ),
  },
  {
    header: "الجهة الإدارية",
    accessor: (item) => item.admin_authority || "-",
  },
  {
    header: "ملاحظات",
    accessor: (item) => item.notes || "-",
  },
  {
    header: "إجراء",
    accessor: () => (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md bg-blue-50 text-blue-500 hover:bg-blue-100"
      >
        <ViewIcon className="h-4 w-4" />
      </Button>
    ),
  },
];

export const TableProcedures = () => {
  const { data, isPending, isError, error } = useGetActiveProcedures();

  if (isPending) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب الإجراءات." error={error} />;

  const procedures = data ?? [];

  if (procedures.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        لا توجد إجراءات غير مكتملة
      </p>
    );
  }

  return <DataTable data={procedures} columns={columns} rowIdField="id" />;
};

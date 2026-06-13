import { DataTable, type Column } from "@/shared/components/DataTable";
import LoadingPage from "@/shared/components/LoadingPage";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import { decisionOptions } from "@/shared/constants/procedursOptions";
import { getDecisionStyles } from "@/shared/utils/getDescionStyle";
import { getOptionLabel } from "@/shared/utils/getOptionLabel";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useGetActiveProcedures } from "../api/hooks/useGetActiveProcedures";
import type { ActiveProcedure } from "../api/services/getActiveProcedures";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const columns: Column<ActiveProcedure>[] = [
  {
    header: "#",
    accessor: (_item, index) => index + 1,
    headerClassName: "w-[60px]",
  },
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
        className={`rounded-main px-3.5 py-1.5 text-xs font-medium whitespace-nowrap ${getDecisionStyles(item.actionType)}`}
      >
        {getOptionLabel(item.actionType, decisionOptions)}
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
    accessor: (item) => (
      <div className="flex justify-center">
        <ViewLinkTablePageDetails to={`/dashboard/user-tasks/${item.id}`} />
      </div>
    ),
  },
];

export const TableProcedures = () => {
  const { data, isPending } = useGetActiveProcedures();

  if (isPending) return <LoadingPage fullScreen={false} />;

  const procedures = data ?? [];

  if (procedures.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        لا توجد إجراءات غير مكتملة
      </p>
    );
  }

  return (
    <>
      <DataTable data={procedures} columns={columns} rowIdField="id" />
      <Link
        to={"/dashboard/user-tasks?tab=procedures"}
        className={cn(buttonVariants(), "mt-4 w-full")}
      >
        عرض جميع الاجراءات
      </Link>
    </>
  );
};

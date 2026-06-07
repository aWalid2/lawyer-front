import { DataTable, type Column } from "@/shared/components/DataTable";
import { ViewIcon } from "@/shared/icons/View";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useGetUpcomingConsultations } from "./api/hooks/useGetUpcomingConsultations";
import type { UpcomingConsultation } from "./api/services/getUpcomingConsultations";

const statusLabels: Record<string, string> = {
  pending: "معلق",
  in_progress: "قيد التنفيذ",
  completed: "مكتمل",
  cancelled: "ملغي",
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-[#937F12]/20 text-[#937F12]";
    case "in_progress":
      return "bg-[#5570F1]/20 text-[#5570F1]";
    case "completed":
      return "bg-[#519C66]/20 text-[#519C66]";
    case "cancelled":
      return "bg-[#C60000]/20 text-[#C60000]";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const typeLabels: Record<string, string> = {
  legal_advice: "استشارة قانونية",
  case_review: "مراجعة قضية",
  document_review: "مراجعة مستندات",
  general: "عامة",
};

const methodLabels: Record<string, string> = {
  phone: "هاتف",
  in_person: "حضوري",
  online: "أونلاين",
};

const columns: Column<UpcomingConsultation>[] = [
  { header: "#", accessor: "id", headerClassName: "w-[60px]" },
  { header: "عنوان الاستشارة", accessor: "consultation_title" },
  {
    header: "العميل",
    accessor: (item) =>
      item.client
        ? `${item.client.first_name} ${item.client.last_name ?? ""}`.trim()
        : "-",
  },
  {
    header: "المحامي",
    accessor: (item) =>
      item.lawyer
        ? `${item.lawyer.first_name} ${item.lawyer?.last_name ?? ""}`.trim()
        : "-",
  },
  {
    header: "تاريخ الاستشارة",
    accessor: (item) =>
      item.consultation_date
        ? format(new Date(item.consultation_date), "d MMMM yyyy", {
            locale: ar,
          })
        : "-",
  },
  {
    header: "النوع",
    accessor: (item) =>
      typeLabels[item.consultation_type] || item.consultation_type,
  },
  {
    header: "طريقة التواصل",
    accessor: (item) =>
      methodLabels[item.contact_method] || item.contact_method,
  },
  {
    header: "الحالة",
    accessor: (item) => (
      <span
        className={`rounded-main px-3.5 py-1.5 text-xs font-medium whitespace-nowrap ${getStatusStyles(item.status)}`}
      >
        {statusLabels[item.status] || item.status}
      </span>
    ),
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

export const TableConsultations = () => {
  const { data, isPending, isError, error } = useGetUpcomingConsultations();

  if (isPending) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ أثناء جلب الاستشارات." error={error} />;

  const consultations = data ?? [];

  if (consultations.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        لا توجد استشارات غير مكتملة
      </p>
    );
  }

  return <DataTable data={consultations} columns={columns} rowIdField="id" />;
};

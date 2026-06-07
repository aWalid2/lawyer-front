import { DataTable, type Column } from "@/shared/components/DataTable";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { useGetUpcomingConsultations } from "./api/hooks/useGetUpcomingConsultations";
import type { UpcomingConsultation } from "./api/services/getUpcomingConsultations";
import {
  CONSULTATION_STATUS_LABELS,
  CONSULTATION_STATUS_FALLBACK,
} from "@/shared/constants/consultationStatus";

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
  {
    header: "#",
    accessor: (_item, index) => index + 1,
    headerClassName: "w-[60px]",
  },
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
    accessor: (item) => {
      const label =
        CONSULTATION_STATUS_LABELS[item.status ?? ""] ??
        CONSULTATION_STATUS_FALLBACK;
      return (
        <span
          className={`rounded-main px-3.5 py-1.5 text-xs font-medium whitespace-nowrap ${label.className}`}
        >
          {label.text}
        </span>
      );
    },
  },
  {
    header: "إجراء",
    accessor: (item) => (
      <ViewLinkTablePageDetails to={`/dashboard/consultations/${item.id}`} />
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

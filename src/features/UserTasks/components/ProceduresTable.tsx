import { DataTable, type Column } from "@/shared/components/DataTable";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import type { Procedure } from "@/features/cases-mangement/Procedures/types";
import { ProceduresActions } from "./ProceduresActions";

const fakeProcedures: Procedure[] = [
  {
    id: 1,
    sequence_number: "3-3-24",
    reference_number: 324,
    case_title: "قضية",
    actionType: "جلسة استماع",
    referral_date: "2026-05-10",
    admin_authority: "محكمة القضاء الإداري",
    session_date: "2026-06-15T10:00:00",
    lawyer_id: 1,
    session_decision: "تأجيل للمرافعة",
    notes: "تم الاستماع لأقوال الطرفين",
    created_at: "2026-05-10T08:00:00",
    updated_at: "2026-06-15T12:00:00",
  },
  {
    id: 2,
    sequence_number: "3-3-24",
    reference_number: 324,
    case_title: "قضية",
    actionType: "تقديم مستندات",
    referral_date: "2026-05-12",
    admin_authority: "نيابة جنوب القاهرة",
    session_date: "2026-06-20T11:00:00",
    lawyer_id: 2,
    session_decision: "قبول المستندات",
    notes: "تقديم أصل العقد والمرفقات",
    created_at: "2026-05-12T09:00:00",
    updated_at: "2026-06-20T11:30:00",
  },
  {
    id: 3,
    sequence_number: "3-3-24",
    reference_number: 324,
    case_title: "قضية",
    actionType: "حكم تمهيدي",
    referral_date: "2026-04-01",
    admin_authority: "المحكمة الابتدائية",
    session_date: "2026-05-30T09:00:00",
    lawyer_id: 1,
    session_decision: "ندب خبير",
    notes: "تم ندب خبير لفحص المستندات",
    created_at: "2026-04-01T10:00:00",
    updated_at: "2026-05-30T12:00:00",
  },
  {
    id: 4,
    sequence_number: "3-3-24",
    reference_number: 324,
    case_title: "قضية",
    actionType: "معارضة",
    referral_date: "2026-06-01",
    admin_authority: "محكمة الاستئناف",
    session_date: "2026-07-10T10:30:00",
    lawyer_id: 3,
    session_decision: "قبول المعارضة شكلاً",
    notes: "تقديم مذكرة المعارضة",
    created_at: "2026-06-01T08:00:00",
    updated_at: "2026-07-10T11:00:00",
  },
  {
    id: 5,
    sequence_number: "3-3-24",
    reference_number: 324,
    case_title: "قضية",
    actionType: "مذكرة دفاع",
    referral_date: "2026-05-20",
    admin_authority: "المحكمة الاقتصادية",
    session_date: "2026-06-25T09:30:00",
    lawyer_id: 2,
    session_decision: "ضم للمذاكرة",
    notes: "تقديم مذكرة دفاع كاملة",
    created_at: "2026-05-20T10:00:00",
    updated_at: "2026-06-25T10:00:00",
  },
];

const proceduresColumns: Column<Procedure>[] = [
  {
    header: "#",
    accessor: (_item, index) => index + 1,
    headerClassName: "w-13",
    className: "w-13 text-center",
  },
  {
    header: "كود القضية",
    accessor: (item) => item.sequence_number || "-",
  },
  {
    header: "الرقم الالي ",
    accessor: (item) => item.reference_number || "-",
  },
  {
    header: "عنوان القضية",
    accessor: (item) => item.case_title || "-",
  },
  {
    header: "عنوان الإجراء",
    accessor: (item) => item.actionType || "-",
  },
  {
    header: "تاريخ الانشاء ",
    accessor: (item) => item.admin_authority || "-",
  },
  {
    header: "الموظف المسئول ",
    accessor: (item) => formatDateToYYYYMMDD(item.referral_date) || "-",
  },
  {
    header: "حالة الاجراء",
    accessor: (item) => item.session_decision || "-",
  },
  {
    header: "إجراء",
    accessor: (item) => <ProceduresActions procedure={item} />,
    headerClassName: "w-35",
    className: "w-35",
  },
];

export const ProceduresTable: React.FC = () => {
  return (
    <DataTable
      data={fakeProcedures}
      columns={proceduresColumns}
      rowIdField="id"
    />
  );
};

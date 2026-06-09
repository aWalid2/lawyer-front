import { DataTable, type Column } from "@/shared/components/DataTable";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import type { Procedure } from "@/features/cases-mangement/Procedures/types";
import { ProceduresActions } from "./ProceduresActions";
import { UpdateStatusProcedureModal } from "./UpdateStatusProcedureModal";
import { useState } from "react";
import { getStatusStyle, statusMapping } from "../types/types";

const initialFakeProcedures: Procedure[] = [
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
    session_decision: "pending",
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
    session_decision: "late",
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
    session_decision: "done",
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
    session_decision: "late",
    notes: "تقديم مذكرة المعارضة",
    created_at: "2026-06-01T08:00:00",
    updated_at: "2026-07-10T11:00:00",
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
    header: "إجراء",
    accessor: (item) => <ProceduresActions procedure={item} />,
    headerClassName: "w-35",
    className: "w-35",
  },
];

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

export const ProceduresTable: React.FC = () => {
  const [procedures, setProcedures] = useState(initialFakeProcedures);
  const [
    selectedProcedureForStatusUpdate,
    setSelectedProcedureForStatusUpdate,
  ] = useState<Procedure | null>(null);

  const handleStatusSave = (status: string) => {
    if (!selectedProcedureForStatusUpdate) return;
    setProcedures((prev) =>
      prev.map((p) =>
        p.id === selectedProcedureForStatusUpdate.id
          ? { ...p, session_decision: status }
          : p,
      ),
    );
  };

  return (
    <>
      <DataTable
        data={procedures}
        columns={[
          ...proceduresColumns.slice(0, -1),
          {
            header: "حالة الاجراء",
            accessor: (item: Procedure) => (
              <button
                type="button"
                className="text-primary underline-offset-4 hover:underline"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedProcedureForStatusUpdate(item);
                }}
              >
                <ProcedureStatusCell status={item.session_decision} />
              </button>
            ),
            headerClassName: "w-35",
            className: "w-35",
          },
          proceduresColumns[proceduresColumns.length - 1],
        ]}
        rowIdField="id"
      />

      {selectedProcedureForStatusUpdate && (
        <UpdateStatusProcedureModal
          initialStatus={selectedProcedureForStatusUpdate.session_decision}
          onClose={() => setSelectedProcedureForStatusUpdate(null)}
          onSave={handleStatusSave}
        />
      )}
    </>
  );
};

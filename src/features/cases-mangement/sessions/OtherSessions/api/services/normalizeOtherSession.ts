import type { OtherSession } from "../../components/typesOther";

export const normalizeOtherSession = (session: any): OtherSession => ({
  id: Number(session?.id ?? 0),
  rowNumber: session?.rowNumber,
  case_id: session?.case_id ? Number(session.case_id) : undefined,
  actionType: session?.actionType || session?.action_type || session?.procedureType || "",
  referral_date: session?.referral_date || session?.referralDate || "",
  admin_authority: session?.admin_authority || session?.adminEntity || "",
  session_date: session?.session_date || session?.sessionDate || "",
  lawyer_id:
    session?.lawyer_id !== undefined && session?.lawyer_id !== null
      ? Number(session.lawyer_id)
      : session?.lawyer?.user_id
        ? Number(session.lawyer.user_id)
        : null,
  session_decision: session?.session_decision || session?.decision || "",
  notes: session?.notes || "",
  lawyer: session?.lawyer || null,
  lawyer_name:
    session?.lawyer_name ||
    session?.lawyerName ||
    [session?.lawyer?.user?.first_name, session?.lawyer?.user?.last_name]
      .filter(Boolean)
      .join(" ") ||
    undefined,
  created_at: session?.created_at,
  updated_at: session?.updated_at,
});

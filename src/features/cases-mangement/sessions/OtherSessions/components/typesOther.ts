export interface OtherSessionRequest {
  actionType: string;
  referral_date: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: number;
  session_decision: string;
  notes: string;
}

export interface OtherSessionLawyer {
  user_id?: number;
    name?: string;
}

export interface OtherSession {
  id: number;
  rowNumber?: number;
  case_id?: number;
  actionType: string;
  referral_date: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: number | null;
  session_decision: string;
  notes: string;
  lawyer?: OtherSessionLawyer | null;
  lawayer?: OtherSessionLawyer | null;
  lawyer_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OtherSessionListResponse {
  data: OtherSession[];
  meta: {
    total: number;
  };
}

export interface OtherSessionFormValues {
  actionType: string;
  referral_date: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: string;
  session_decision: string;
  notes: string;
}

export const EMPTY_OTHER_SESSION_FORM_VALUES: OtherSessionFormValues = {
  actionType: "",
  referral_date: "",
  admin_authority: "",
  session_date: "",
  lawyer_id: "",
  session_decision: "",
  notes: "",
};

export const toOtherSessionFormValues = (
  session?: Partial<OtherSession> | null
): OtherSessionFormValues => ({
  actionType: session?.actionType || "",
  referral_date: session?.referral_date || "",
  admin_authority: session?.admin_authority || "",
  session_date: session?.session_date ? session.session_date.slice(0, 16) : "",
  lawyer_id: session?.lawyer_id ? String(session.lawyer_id) : "",
  session_decision: session?.session_decision || "",
  notes: session?.notes || "",
});

export const toOtherSessionRequest = (
  values: OtherSessionFormValues
): OtherSessionRequest => ({
  actionType: values.actionType,
  referral_date: values.referral_date,
  admin_authority: values.admin_authority,
  session_date: values.session_date,
  lawyer_id: Number(values.lawyer_id),
  session_decision: values.session_decision,
  notes: values.notes,
});

export const getOtherSessionLawyerName = (session?: Partial<OtherSession> | null) => {
  if (!session) return "-";

  if (session.lawyer_name) return session.lawyer_name;
  const name = session.lawyer?.name || session.lawayer?.name || "";

  return name || "-";
};

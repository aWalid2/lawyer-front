export interface ProcedureRequest {
  actionType: string;
  referral_date: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: number;
  session_decision: string;
  notes: string;
}

export interface ProcedureLawyer {
  user_id?: number;
  name?: string;
}

export interface Procedure {
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
  lawyer?: ProcedureLawyer | null;
  lawayer?: ProcedureLawyer | null;
  lawyer_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProcedureListResponse {
  data: Procedure[];
  meta: {
    total: number;
    totalPages?: number;
  };
}

export interface ProcedureFormValues {
  actionType: string;
  referral_date: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: string;
  session_decision: string;
  notes: string;
}

export const EMPTY_PROCEDURE_FORM_VALUES: ProcedureFormValues = {
  actionType: "",
  referral_date: "",
  admin_authority: "",
  session_date: "",
  lawyer_id: "",
  session_decision: "",
  notes: "",
};

export const toProcedureFormValues = (
  procedure?: Partial<Procedure> | null,
): ProcedureFormValues => ({
  actionType: procedure?.actionType || "",
  referral_date: procedure?.referral_date || "",
  admin_authority: procedure?.admin_authority || "",
  session_date: procedure?.session_date ? procedure.session_date.slice(0, 16) : "",
  lawyer_id: procedure?.lawyer_id ? String(procedure.lawyer_id) : "",
  session_decision: procedure?.session_decision || "",
  notes: procedure?.notes || "",
});

export const toProcedureRequest = (
  values: ProcedureFormValues,
): ProcedureRequest => ({
  actionType: values.actionType,
  referral_date: values.referral_date,
  admin_authority: values.admin_authority,
  session_date: values.session_date,
  lawyer_id: Number(values.lawyer_id),
  session_decision: values.session_decision,
  notes: values.notes,
});

export const getProcedureLawyerName = (
  procedure?: Partial<Procedure> | null,
) => {
  if (!procedure) return "-";

  if (procedure.lawyer_name) return procedure.lawyer_name;
  const name = procedure.lawyer?.name || procedure.lawayer?.name || "";

  return name || "-";
};
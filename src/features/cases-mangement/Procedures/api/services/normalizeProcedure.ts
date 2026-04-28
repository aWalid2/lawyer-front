import type { Procedure } from "../../types";

export const normalizeProcedure = (procedure: any): Procedure => {
  const normalizedLawyer = procedure?.lawyer || procedure?.lawayer || null;

  return {
    id: Number(procedure?.id ?? 0),
    rowNumber: procedure?.rowNumber,
    case_id: procedure?.case_id ? Number(procedure.case_id) : undefined,
    actionType:
      procedure?.actionType ||
      procedure?.action_type ||
      procedure?.procedureType ||
      "",
    referral_date: procedure?.referral_date || procedure?.referralDate || "",
    admin_authority:
      procedure?.admin_authority || procedure?.adminEntity || "",
    session_date: procedure?.session_date || procedure?.sessionDate || "",
    lawyer_id:
      procedure?.lawyer_id !== undefined && procedure?.lawyer_id !== null
        ? Number(procedure.lawyer_id)
        : normalizedLawyer?.user_id
          ? Number(normalizedLawyer.user_id)
          : null,
    session_decision: procedure?.session_decision || procedure?.decision || "",
    notes: procedure?.notes || "",
    lawyer: normalizedLawyer,
    lawyer_name:
      procedure?.lawyer_name ||
      procedure?.lawyerName ||
      normalizedLawyer?.name ||
      undefined,
    created_at: procedure?.created_at || procedure?.createdAt,
    updated_at: procedure?.updated_at || procedure?.updatedAt,
  };
};
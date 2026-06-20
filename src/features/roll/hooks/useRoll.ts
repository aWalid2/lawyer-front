import { LITIGATION_LEVEL_OPTIONS } from "@/shared/constants/caseOptions";
import type { RollSession, RollSessionApiResponse, RollSessionSourceKey } from "../types";


export const useRoll = () => {

const FALLBACK_TEXT = "-";

const LITIGATION_LEVEL_LABELS = Object.fromEntries(
  LITIGATION_LEVEL_OPTIONS.map(({ value, label }) => [value, label]),
);

const formatSessionSourceLabel = (value: string | null) => {
  if (value && value in LITIGATION_LEVEL_LABELS) {
    return LITIGATION_LEVEL_LABELS[
      value as keyof typeof LITIGATION_LEVEL_LABELS
    ];
  }

  switch (value) {
    case "court":
      return "محكمة";
    case "prosecution":
      return "نيابة";
    case "police":
      return "مخفر";
    case "procedure":
      return "إجراءات";
    default:
      return value || FALLBACK_TEXT;
  }
};

const mapRollSession = (
  session: RollSessionApiResponse,
  index: number,
): RollSession => {
  const sessionSourceKey = (session.session_source ||
    "court") as RollSessionSourceKey;
  const hallNumber =
    session.hall_number === null ? FALLBACK_TEXT : String(session.hall_number);
  const referenceNumber = session.reference_number || FALLBACK_TEXT;
  const sessionDecision =
    session.session_decision || session.decision || FALLBACK_TEXT;
  const caseTypeName =
    session.case_type_name || session.case_type?.name || FALLBACK_TEXT;

  return {
    id: `${session.case_id}-${session.session_date}-${session.session_source || "all"}-${index}`,
    sessionId: session.session_id ?? null,
    caseId: session.case_id,
    caseSequence: session.case_sequence || FALLBACK_TEXT,
    reference_number: referenceNumber,
    sessionDate: session.session_date,
    courtName: session.court_name || FALLBACK_TEXT,
    police_station_name: session.police_station_name || undefined,
    presecution_name: session.presecution_name || undefined,
    sessionSource: formatSessionSourceLabel(session.session_source),
    sessionSourceKey,
    clientName: session.client_name || FALLBACK_TEXT,
    client_status:
      session.client_status || session.client_type || FALLBACK_TEXT,
    opponents: session.opponents || [],
    caseTitle: session.case_title || FALLBACK_TEXT,
    caseTypeName,
    hallNumber,
    sessionDateTime: session.session_date,
    hallFloor: FALLBACK_TEXT,
    rollNumber: referenceNumber,
    session_decision: sessionDecision,
    decision: sessionDecision,
  };
};

return {
  formatSessionSourceLabel,
  mapRollSession,
  FALLBACK_TEXT
};
};
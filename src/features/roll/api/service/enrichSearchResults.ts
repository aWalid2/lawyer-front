import api from "@/lib/api";
import type { RollSessionApiResponse } from "../../types";


export const enrichSearchResults = async (
  searchResults: Array<{ id: string | number; [key: string]: unknown }>,
): Promise<RollSessionApiResponse[]> => {
  if (!searchResults.length) return [];

  const caseIds = searchResults
    .map((item) => Number(item.id))
    .filter((id) => !Number.isNaN(id));

  if (!caseIds.length) return [];

  const { data: allSessions } = await api.get<RollSessionApiResponse[]>(
    "/sessions/all-sessions",
  );

  const sessionsArray = Array.isArray(allSessions) ? allSessions : [];


  const sessionByCaseId = new Map<number, RollSessionApiResponse>();
  for (const session of sessionsArray) {
    if (session.case_id != null && !sessionByCaseId.has(session.case_id)) {
      sessionByCaseId.set(session.case_id, session);
    }
  }

  const enriched: RollSessionApiResponse[] = [];
  for (const result of searchResults) {
    const caseId = Number(result.id);
    const session = sessionByCaseId.get(caseId);

    if (session) {
      enriched.push(session);
    } else {
      enriched.push({
        case_id: caseId,
        case_sequence: (result.case_sequence as string) ?? null,
        reference_number: (result.reference_number as string) ?? null,
        session_date: "",
        court_name: null,
        session_source: null,
        client_name: (result.client_name as string) ?? null,
        client_type: null,
        opponents: [],
        case_title: (result.case_title as string) ?? null,
        case_type_name: (result.case_type as string) ?? null,
        hall_number: null,
        session_decision: null,
      });
    }
  }

  return enriched;
};

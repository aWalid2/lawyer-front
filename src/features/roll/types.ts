export interface RollSessionApiResponse {
  session_id?: number | null;
  case_id: number | null;
  case_sequence: string | null;
  reference_number: string | null;
  session_date: string;
  court_name: string | null;
  police_station_name?: string | null;
  presecution_name?: string | null;
  session_source: string | null;
  client_name: string | null;
  client_type: string | null;
  opponents: string[];
  case_title: string | null;
  case_type_name: string | null;
  hall_number: number | null;
}

export interface RollSessionsParams {
  sessionSource: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export type RollSessionSourceKey =
  | "police"
  | "prosecution"
  | "procedure"
  | "first_instance"
  | "appeal"
  | "cassation"
  | "court";

export interface RollSession {
  id: string;
  sessionId?: number | null;
  caseId: number | null;
  caseSequence: string;
  reference_number: string;
  sessionDate: string;
  courtName: string;
  police_station_name?: string;
  presecution_name?: string;
  sessionSource: string;
  sessionSourceKey: RollSessionSourceKey;
  clientName: string;
  client_status: string;
  opponents: string[];
  caseTitle: string;
  caseTypeName: string;
  hallNumber: string;
  sessionDateTime: string;
  hallFloor: string;
  rollNumber: string;
  decision: string;
}

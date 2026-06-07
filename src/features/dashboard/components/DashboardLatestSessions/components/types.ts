export interface SessionItem {
  time: string;
  caseNumber: string;
  court?: string | null;
  presecution_name?: string | null;
}

/** Raw session object returned by the API */
export interface ApiSession {
  case_id: number;
  session_id: number;
  case_sequence: string;
  reference_number: string;
  police_station_name: string | null;
  session_date: string;
  presecution_name: string | null;
  court_name: string;
  session_source: string;
  client_name: string;
  client_status: string;
  opponents: string[];
  case_title: string;
  case_type_name: string;
  hall_number: number;
  action_type: string | null;
  admin_authority: string | null;
  session_decision: string;
}

export interface DayGroup {
  label: string;
  date: Date;
  dateLabel: string;
  sessions: SessionItem[];
  totalCount: number;
}

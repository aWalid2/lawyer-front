export interface ReportSession {
  id: string;
  rowNumber?: number;
  session_type: string;
  case_sequence: string;
  session_source: string;
  client_name?: string;
  lawyer_name: string;
  entity: string;
  session_date?: string;
  session_decision?: string | null;
}

export interface ReportCase {
  id: number;
  case_sequence: string;
  client_id : number;
  case_situation: string;
  rowNumber?: number;
  caseStatus?: {
    name: string;
    id: number;
  };
  client: {
    first_name: string;
  };
}


export interface court_sessions {
  id: string;
  name: string;
  status?: string;
}

export interface CourtT {
  id: string;
  name: string;
  address: string;
  cases_count?: number;
  court_sessions: court_sessions[];
  rowNumber: number;
}

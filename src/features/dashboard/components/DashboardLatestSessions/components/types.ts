export interface SessionItem {
  time: string;
  caseNumber: string;
  court: string;
}

export interface DayGroup {
  label: string;
  date: Date;
  dateLabel: string;
  sessions: SessionItem[];
  totalCount: number;
}

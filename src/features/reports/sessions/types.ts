export interface ReportSession {
  id: string;
  rowNumber?: number;
  sessionType: string;
  sessionSource: string;
  judicialGrade?: string;
  caseAutoNumber?: string;
  clientName: string;
  lawyerName: string;
  entity: string;
  sessionDate: string;
  sessionDecision?: string | null;
}

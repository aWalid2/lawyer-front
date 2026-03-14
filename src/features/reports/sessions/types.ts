export interface ReportSession {
  id: string;
  sessionType: string;
  judicialGrade: string;
  caseAutoNumber: string;
  clientName: string;
  lawyerName: string;
  entity: string;
  sessionDate: string;
  status: "attended" | "postponed";
}

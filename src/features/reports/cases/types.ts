export interface ReportCase {
  id: string;
  caseNumber: string;
  clientName: string;
  assignedLawyer: string;
  status: "pending" | "closed" | "active" | "on_hold";
  responsibleLawyerCode: string;
}

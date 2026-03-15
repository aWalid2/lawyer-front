export interface ReportClient {
  id: string;
  name: string;
  casesCount: number;
  assignedLawyer: string;
  status: "active" | "inactive";
}

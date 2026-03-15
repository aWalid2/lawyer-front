export interface ReportUser {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "inactive";
}

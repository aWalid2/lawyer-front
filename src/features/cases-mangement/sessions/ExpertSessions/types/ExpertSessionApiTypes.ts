export type ExpertSessionStatus =
  | "APPROVED"
  | "UNDER_OBJECTION"
  | "UNDER_REVIEW";

export interface ExpertSessionRequest {
  expert_report_number: string;
  assigning_authority: string;
  assignment_date: string;
  expert_office_name: string;
  task_start_date?: string;
  subject_of_expertise: string;
  final_opinion: string;
  submission_date: string;
  status: ExpertSessionStatus;
}

export interface ExpertSessionResponse {
  id: number;
  rowNumber?: number;
  case_id: number;
  expert_report_number: string;
  assigning_authority: string;
  assignment_date: string;
  expert_office_name: string;
  task_start_date?: string;
  subject_of_expertise: string;
  final_opinion: string;
  submission_date: string;
  status: ExpertSessionStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ExpertSessionListResponse {
  data: ExpertSessionResponse[];
  meta: {
    total: number;
  };
}

export const STATUS_LABEL: Record<ExpertSessionStatus, string> = {
  APPROVED: "مُعتمد",
  UNDER_OBJECTION: "مُعترض عليه",
  UNDER_REVIEW: "قيد المراجعة",
};

export interface AgendaTask {
  id: number;
  task_title: string;
  assigned_to: number;
  Document_url: string | null;
  task_type: string;
  assigned_by: number | null;
  delivery_date: string;
  status: string;
  notes: string;
  created_at: string;
  details: string;
  start_date: string;
  end_date: string;
  assigner: string | null;
}

export interface AgendaProcedure {
  id: number;
  actionType?: string;
  referral_date?: string;
  admin_authority?: string;
  session_date?: string;
  lawyer_id?: number | null;
  session_decision?: string;
  notes?: string;
  [key: string]: any;
}

export interface AgendaMeta {
  startDate: string;
  endDate: string;
  totalTasks: number;
  totalProcedures: number;
}

export interface AgendaResponse {
  tasks: AgendaTask[];
  procedures: AgendaProcedure[];
  meta: AgendaMeta;
}

export interface AgendaParams {
  month?: number;
  year?: number;
  date?: string;
}

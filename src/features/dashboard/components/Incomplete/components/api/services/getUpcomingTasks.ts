import api from "@/lib/api";

export interface UpcomingTask {
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
  details: string | null;
  start_date: string | null;
  end_date: string | null;
}

export const getUpcomingTasks = async (): Promise<UpcomingTask[]> => {
  const { data } = await api.get("/task/upcoming");
  return data;
};

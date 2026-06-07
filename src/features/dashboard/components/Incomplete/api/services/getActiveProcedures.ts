import api from "@/lib/api";

export interface ActiveProcedure {
  id: number;
  case_id: number;
  actionType: string;
  admin_authority: string;
  session_date: string;
  lawyer_id: number;
  session_decision: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  lawyer: {
    name: string;
  };
}

export const getActiveProcedures = async (): Promise<ActiveProcedure[]> => {
  const { data } = await api.get("/procedures/allActiveProcedure");
  return data;
};

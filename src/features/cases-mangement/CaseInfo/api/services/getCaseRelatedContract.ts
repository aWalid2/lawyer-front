import api from "@/lib/api";

export interface ClientProfile {
  user_id: number;
  name: string;
  client_type: string;
  date_joined: string;
  case_count: number;
  contract_photo: string;
  authorization_photo: string;
  notes: string;
}

export interface CaseRelatedContract {
  id: number;
  client_id: number;
  start_date: string;
  end_date: string | null;
  contract_value: string;
  contract_duration: number;
  document_file: string;
  created_at: string;
  client_profile: ClientProfile;
}

export const getCaseRelatedContract = async (
  caseId: string | number,
): Promise<CaseRelatedContract> => {
  const { data } = await api.get(`/contracts/${caseId}`);
  return data;
};

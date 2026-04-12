export interface CaseFormValues {
  case_sequence: string;
  Complaint_Number: string;
  client_id: string;
  case_title: string;
  Current_court_degree: string;
  case_status_id: string;
  case_type_id: string;
  client_type: string;
  case_situation: string;
  created_at: string;
  case_entry_date: string;
  notes: string;
}

export interface FormCaseDetailsProps {
  caseData: CaseFormValues;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

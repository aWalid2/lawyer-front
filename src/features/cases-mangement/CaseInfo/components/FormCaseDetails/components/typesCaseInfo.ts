export interface CaseFormValues {
  autoNumber: string;
  complaintNumber: string;
  clientName: string;
  caseTitle: string;
  court: string;
  litigationLevel: string;
  status: string;
  caseType: string;
  clientRelation: string;
  statusOnReceipt: string;
  creationDate: string;
  receiptDate: string;
  notes: string;
}

export interface FormCaseDetailsProps {
  caseData: CaseFormValues;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

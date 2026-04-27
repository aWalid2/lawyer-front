export interface CaseDocument {
  id: number;
  document_type?: "CASE_RELATED" | string;
  document_name?: string;
  phone?: string;
  document_details?: string;
  document_file?: string;
  caseId?: string | number;
  case_id?: string | number;
  created_at?: string;
  updated_at?: string;
}

export interface CaseDocumentFormValues {
  case_title: string;
  phone: string;
  document_details: string;
  file: FileList | null;
}

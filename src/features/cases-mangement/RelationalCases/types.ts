export interface RelatedCaseDetails {
  id: number;
  case_sequence: string;
}

export interface RelatedCaseRecord {
  case_id: number;
  related_case_id: number;
  case: {
    id: number;
  };
  related_case: RelatedCaseDetails;
}

export interface RelatedCaseTableItem {
  id: number;
  related_case_id: number;
  case_sequence: string;
  rowNumber?: number;
}
export interface Case {
  id: string;
  rowNumber: number;
  case_number_at_prosecution?: string;
  case_sequence: string;
  case_number: string;
  client_name: string;
  case_status?: number;
  case_type_id?: string;
  case_status_id?: string;
  client_id?: string;
  client?: {
    first_name: string;
    id: string;
  };
  case_type?: {
    name: string;
    id: string;
  };
  caseStatus?: {
    name: string;
    id: string;
  };
  client_type?:string;
  case_situation?:string;
  detective_name?:string;
 

  registrationDate?: string;
  created_at?: string;
  updated_at?: string;
  case_entry_date?: string;
}


export interface CasesTableProps {
  cases: Case[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onCaseClick?: (caseItem: Case) => void;
  onEdit?: (caseItem: Case) => void;
  onDelete?: (caseItem: Case) => void;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}
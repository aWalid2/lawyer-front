export interface Case {
  id: string;
  rowNumber: number;
  case_number_at_prosecution?: string;
  case_sequence: string;
  case_number: string;
  client_name: string;
  case_type: string;
  case_situation: string;
  court?: string;
  judge?: string;
  registrationDate?: string;
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
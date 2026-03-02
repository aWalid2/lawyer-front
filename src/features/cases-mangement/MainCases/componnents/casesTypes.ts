export interface Case {
  id: string;
  caseNumber: string;
  autoNumber: string;
  clientName: string;
  subject: string;
  status: 'متداولة' | 'تحت الرفع' | string;
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
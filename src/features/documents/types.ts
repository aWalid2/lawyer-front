export interface Document {
  id: string;
  autoNumber?: string;
  caseNumber?: string;
  caseTitle?: string;
  clientCode?: string;
  clientName?: string;
  phone?: string;
  date: string;
  type: string;
}

export interface DocumentsTableProps {
  documents: Document[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onDocumentClick?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

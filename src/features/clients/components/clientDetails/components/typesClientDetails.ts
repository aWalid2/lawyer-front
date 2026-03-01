
export interface ClientCase {
  id: number;
  code: string;
  autoNumber: string;
  subject: string;
  status: string;
  role: string;
  date: string;
}


export interface ClientsPageProps {
  initialClients?: ClientCase[];
}

export interface ClientsTableProps {
  clients: ClientCase[];
  onClientClick?: (client: ClientCase) => void;
  onEdit?: (client: ClientCase) => void;
  onDelete?: (id: number) => void;
}

export interface ClientsStatsProps {
  clients: ClientCase[];
}

export interface ClientsSearchProps {
  onSearch: (term: string) => void;
  onAddNew?: () => void;
}

export interface PerformanceFilterProps {
  onFilterChange: (min: number, max: number) => void;
  selectedRange?: { min: number; max: number };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}


export interface TableRowProps {
  client: ClientCase;
  index: number;
  isSelected: boolean;
  onRowClick: (client: ClientCase) => void;
  onEdit?: (client: ClientCase) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (client: ClientCase) => void;
}
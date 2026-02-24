// src/components/clients/types.ts
export interface Client {
  id: number;
  name: string;
  phone: string;
  performance: number;
  email?: string;
  casesCount?: number;
}

export interface ClientsPageProps {
  initialClients?: Client[];
}

export interface ClientsTableProps {
  clients: Client[];
  onClientClick?: (client: Client) => void;
  onEdit?: (client: Client) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (client: Client) => void;  // ✅ أضفناها هنا
}

export interface ClientsStatsProps {
  clients: Client[];
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
  client: Client;
  index: number;
  isSelected: boolean;
  onRowClick: (client: Client) => void;
  onEdit?: (client: Client) => void;
  onDelete?: (id: number) => void;
  onViewDetails?: (client: Client) => void;
}
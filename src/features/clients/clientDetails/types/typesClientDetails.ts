
export interface ClientCase {
  id: number;
  rowNumber?: number;
  case_sequence: string;
  case_number: string;
  case_status_id: string;
  case_title: string;
  client_type: string;
  created_at: string;
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







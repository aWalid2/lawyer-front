
export interface ClientCase {
  id: number;
  rowNumber?: number;
  case_sequence: string;
  reference_number: string;
  case_number: string;
  case_status_id: string;
  case_title: string;
  caseStatus?: {
    name: string;
  };
  ClientStatus?: {
    name: string;
  };
  client_type: string;
  created_at: string;
}

export interface EditableClientCase extends ClientCase {
  case_number_at_prosecution?: string;
  client_id?: number | string;
  client?: {
    id?: number | string;
  };
  ClientStatus_id?: number | string;
  case_entry_date?: string;
  case_type_id?: number | string;
  case_type?: {
    id?: number | string;
  };
  case_situation?: string;
  caseStatus?: {
    id?: number | string;
    name: string;
  };
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







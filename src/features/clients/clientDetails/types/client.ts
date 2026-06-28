export interface ClientContract {
  id?: number;
  client_id?: number;
  start_date?: string | null;
  end_date?: string | null;
  contract_value?: string | number | null;
  contract_duration?: string | number | null;
  document_file?: string | null;
  created_at?: string | null;
  contract_title?:string | null;
}

export interface ClientUserDetails {
  phone?: string | null;
  country?: string | null;
  ssn?: string | null;
  nationality?: string | null;
  address?: string | null;
  email?: string | null;
  created_at?: string | null;
  expired_civil_id?:string | null;
}

export interface ClientDetailsData {
  user_id?: string | number;
  name?: string | null;
  authorization_photo?: string | null;
  user?: ClientUserDetails | null;
  contract?: ClientContract | null;
  contracts?: ClientContract[] | null;
  civil_id_photo?:string;
}
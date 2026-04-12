
export interface Consultation {
  id: string;
  consultation_title: string;
  client_id: number;
  lawyer_id: number;
  consultation_type: string;
  contact_method: string;
  consultation_details: string;
  status: string;
  request_date: string;
  created_at?: string;
  client?: {
    id: number;
    first_name: string;
    last_name?: string;
    phone: string;
    email: string;
    ssn: string;
    nationality?: string;
    country?: string;
    address?: string;
    photo?: string | null;
  };
  lawyer?: {
    id: number;
    first_name: string;
    last_name?: string;
    phone: string;
    email: string;
  };
}
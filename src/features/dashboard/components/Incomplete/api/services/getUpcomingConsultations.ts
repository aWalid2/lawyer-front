import api from "@/lib/api";

export interface UpcomingConsultation {
  id: number;
  client_id: number;
  lawyer_id: number;
  consultation_title: string;
  consultation_type: string;
  contact_method: string;
  consultation_details: string;
  request_date: string;
  consultation_date: string;
  status: string;
  created_at: string;
  client: {
    id: number;
    first_name: string;
    last_name: string | null;
    phone: string;
    email: string;
  };
  lawyer: {
    id: number;
    first_name: string;
    last_name: string | null;
    phone: string;
    email: string;
  };
}

export const getUpcomingConsultations =
  async (): Promise<UpcomingConsultation[]> => {
    const { data } = await api.get("/consultation/upcoming");
    return data;
  };

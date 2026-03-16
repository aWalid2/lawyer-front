export type ConsultationStatus = "approved" | "rejected" | "under_study";

export interface Consultation {
  id: string;
  title: string;
  clientName: string;
  lawyerName: string;
  consultationType: string;
  contactMethod: string;
  details: string;
  status: ConsultationStatus;
  requestDate: string;
  requestTime?: string;
  clientNationalId?: string;
  clientEmail?: string;
  clientPhone?: string;
}

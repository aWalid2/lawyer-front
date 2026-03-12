export interface OtherAdministrativeData {
  procedureType: string;
  referralDate: string;
  adminEntity: string;
  notes: string;
}

export interface OtherSession {
  id: string;
  sessionDate: string;
  sessionTime: string;
  lawyer: string;
  decision: string;
}

export interface OtherSessionFormValues {
  sessionDate: string;
  sessionTime: string;
  lawyer: string;
  decision: string;
}

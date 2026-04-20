export interface FirstDegreeFormValues {
  court_id: string;
  floor_number: string;
  hall_number: string;
  district_number: string;
  district_type: string;
  judge_name: string;
  secretary_name: string;
  secretary_floor: string;
  secretary_office_number: string;
  registration_date: string;
  registration_time?: string;
  next_session_date: string;
  next_session_time?: string;
  lawyer_id: string;
}

export interface FormFirsDegreeProps {
  caseData: FirstDegreeFormValues;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

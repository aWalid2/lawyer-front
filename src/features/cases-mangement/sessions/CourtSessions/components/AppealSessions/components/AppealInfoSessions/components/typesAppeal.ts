export interface AppealValues {
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
  next_session_date: string;
}

export interface AppealInfProps {
  appealData: AppealValues;
}

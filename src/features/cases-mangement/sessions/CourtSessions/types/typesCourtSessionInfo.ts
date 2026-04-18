export interface CourtSessionInfoValues {
  court_id: number | null;
  lawyer_id?: number | null;
  floor_number: number | null | string;
  hall_number: number | null | string;
  district_number: number | null | string;
  district_type: string | null;
  judge_name: string | null;
  secretary_name: string | null;
  secretary_floor: number | null | string;
  secretary_office_number: number | null | string;
  registration_date: string | null;
  next_session_date: string | null;
  court?: {
    name: string;
  };
  lawyer?: {
    name: string;
  };
}

export interface CourtInfoInfProps {
  courtInfoData: CourtSessionInfoValues;
}

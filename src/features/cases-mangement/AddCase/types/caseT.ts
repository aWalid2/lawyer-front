

import type { CaseSituation } from "../utils/mapToApiPayload";

export type BasePayload = {
  case_situation: CaseSituation;
  case_title: string;
  case_status_id: number;
  ClientStatus_id: number;
  client_type: string;
  client_id: number;
  case_type_id: number;
  notes: string;
  case_entry_date?: string;
  employee_ids?: number[];
  role_ids?: number[];
};

export type CaseFees = {
  case_fees_type:
    | "fixed_profits"
    | "percentage_of_profits"
    | "contract_based";

  fixed_amount?: number;
  percentage?: number;
  contract_based?: number;
  notes?: string;
};
// ================= UNDER APPEAL =================
export type UnderAppealPayload = BasePayload & {
  case_situation: "UNDER_APPEAL";
  case_fees: CaseFees;
  opponents: {
    name: string;
  }[];
};

// ================= PROSECUTION =================
export type ProsecutionPayload = BasePayload & {
  case_situation:
    | "PUBLIC_PROSECUTION"
    | "AT_PROSECUTOR_OFFICE";
    

  case_police_station_id?: string;
  case_number_at_police_station?: number;
  case_arrival_date_at_police_station?: string;

  case_number_at_prosecution?: number;
  regestration_date_of_case_at_prosecution?: string;

  detective_name?: string;
  investigation_name?: string;

  case_fees: CaseFees;

  opponents: {
    name: string;
    ssn: string;
    phone_number: string;
  }[];
};

// ================= ACTIVE =================
export type ActivePayload = BasePayload & {
  case_situation: "ACTIVE";
  reference_number: string;
  Complaint_Number: number;
  court_id: number;
  Current_court_degree: string;
  date_case_registered_court?: string;
  case_number_court?: string;
  circuit_id?: number;
  session_comming_date?: string;
  court_role?: string;
  court_hall_number?: string;
  circuit_judge_name?: string;
  circuit_secretary_name?: string;
  circuit_secretary_office_role?: string;
  circuit_secretary_office_number?: string;
  case_fees: CaseFees;
  opponents: {
    name: string;
    ssn: string;
    phone_number: string;
  }[];
};

// ================= OTHER =================
export type OtherPayload = BasePayload & {
  case_situation: "OTHER";
  Complaint_Number: number;
  complaint_case_type?: string;
  client_name?: string;
  complaint_case_subject?: string;
  complaint_case_status?: string;
  complaint_case_authority?: string;
  complaint_case_registration_date?: string;
  client_status?: string;
  detective_name: string;
  investigation_name: string;
  Case_Arrival_Date_at_the_Authority?: string;
  case_fees: CaseFees;
  opponents: {
    name: string;
    ssn: string;
    phone_number: string;

  }[];
};

// ================= POLICE =================
export type PolicePayload = Omit<BasePayload, "case_situation" | "client_type"> & {
  case_situation: "POLICE_CASE" | "POLICE_STATION";
  case_police_station_id: number;
  case_number_at_police_station: number;
  case_arrival_date_at_police_station: string;
  detective_name: string;
  investigation_name: string;
  reference_number: string;
  case_fees: CaseFees;
  opponents: {
    name: string;
    ssn: string;
    phone_number: string;
  }[];
};

// ================= UNION =================
export type CasePayload =
  | UnderAppealPayload
  | ProsecutionPayload
  | ActivePayload
  | OtherPayload
  | PolicePayload;

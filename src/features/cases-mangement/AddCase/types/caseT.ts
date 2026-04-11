

import type { CaseSituation } from "../utils/mapToApiPayload";

export type BasePayload = {
  case_situation: CaseSituation;
  case_title: string;
  case_status_id: number;
  client_type: string;
  client_id: number;
  case_type_id: number;
  notes: string;
  case_entry_date?: string;
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
    

  case_police_station?: string;
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
  case_sequence: number;
  Complaint_Number: number;
  court_id: number;
  Current_court_degree: string;
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

// ================= UNION =================
export type CasePayload =
  | UnderAppealPayload
  | ProsecutionPayload
  | ActivePayload
  | OtherPayload;

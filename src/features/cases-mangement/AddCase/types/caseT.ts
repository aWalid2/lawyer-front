

import type { CaseSituation } from "../utils/mapToApiPayload";

export type BasePayload = {
  case_situation: CaseSituation;
  case_title: string;
  case_status: number;
  client_type: string;
  client_name: string;
  case_type: string;
  notes: string;
  case_entry_date: string;
};

export type CaseFees = {
  case_fees_type: "fixed_amount" | "percentage" | "contract_based";
  fixed_amount?: number;
  percentage?: number;
  contract_based?: number;
};

// ================= UNDER APPEAL =================
export type UnderAppealPayload = BasePayload & {
  case_situation: "UNDER_APPEAL";
  case_fees: CaseFees;
  opponents: {
    name: string;
    address: string;
  }[];
};

// ================= PROSECUTION =================
export type ProsecutionPayload = BasePayload & {
  case_situation:
    | "PUBLIC_PROSECUTION"
    | "AT_PROSECUTOR_OFFICE";

  case_police_station: string;
  case_number_at_police_station: number;
  case_arrival_date_at_police_station: string;

  case_number_at_prosecution: number;
  regestration_date_of_case_at_prosecution: string;

  detective_name: string;
  investigation_name: string;

  case_fees: CaseFees;

  opponents: {
    name: string;
    ssn: string;
    phone_number: string;
    address: string;
  }[];
};

// ================= UNION =================
export type CasePayload =
  | UnderAppealPayload
  | ProsecutionPayload;
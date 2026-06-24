import type { ActivePayload, CaseFees, CasePayload, OtherPayload } from "../types/caseT";
import { formatDate } from "@/shared/utils/formDate";

export interface FormValues {
  opponents: {
    name: string;
    legal_status?: string;
    country_code: string;
    phone: string;
    ssn: string;
  }[];
  client_id?: string;
  case_status_id: string;
  case_situation: CaseSituation;
  case_title: string;
  ClientStatus_id: string;
  client_name: string;
  case_type_id: string;
  case_police_station_id: string;
  case_number_at_police_station: string;
  client_type: string;
  name: string;
  country_code: string;
  phone: string;
  civil_id: string;
  ssn: string;
  legal_status?: string;
  nationality: string;
  country: string;
  email: string;
  case_arrival_date_at_police_station: string;
  case_entry_date: string;
  case_receipt_date?: string;
  detective_name: string;
  investigation_name: string;
  contract_start_date: string;
  contract_value: string;
  contract_duration: string;
  contract_image: File | null;
  power_of_attorney_image: File | null;


  prosecution: string;
  case_number_at_prosecution: string;
  regestration_date_of_case_at_prosecution: string;

  notes?: string;

  case_status_received: string;

case_fees_type: "fixed_profits" | "percentage_of_profits" | "contract_based";

fixed_profits?: number;
percentage_of_profits?: number;
contract_based?: undefined;



  has_opponent: boolean;
  Employee_id?: number | string;
  role_id?: number | string;

  // Active Fields
  reference_number?: string;
  Complaint_Number?: string;
  court_id?: string;
  Current_court_degree?: string;
  date_case_registered_court?: string;
  case_number_court?: string;
  circuit_id?: string;
  session_comming_date?: string;
  court_role?: string;
  court_hall_number?: string;
  circuit_judge_name?: string;
  circuit_secretary_name?: string;
  circuit_secretary_office_role?: string;
  circuit_secretary_office_number?: string;

  // Other Fields
  Case_Arrival_Date_at_the_Authority?: string;
  complaint_case_type?: string;
  complaint_case_subject?: string;
  complaint_case_status?: string;
  complaint_case_authority?: string;
  complaint_case_registration_date?: string;
  client_status?: string;
}

export type CaseSituation =
  | "POLICE_CASE"
  | "PUBLIC_PROSECUTION"
  | "AT_PROSECUTOR_OFFICE"
  | "UNDER_APPEAL"
  | "ACTIVE"
  | "OTHER";



export const mapToApiPayload = (
  values: FormValues
): CasePayload => {
  const base = {
    case_situation: values.case_situation,
    case_title: values.case_title,
    case_status_id: Number(values.case_status_id),
    ClientStatus_id: Number(values.ClientStatus_id),
    client_type: values.client_type ?? "",
    client_id: Number(values.client_id),
    case_type_id: Number(values.case_type_id),
    notes: values.notes || "",
    case_entry_date: formatDate(values.case_entry_date),
  };

const case_fees: CaseFees = {
  case_fees_type: values.case_fees_type, 
  notes: values.notes || "",

  ...(values.case_fees_type === "fixed_profits" &&
    values.fixed_profits !== undefined && {
      fixed_amount: Number(values.fixed_profits),
    }),

  ...(values.case_fees_type === "percentage_of_profits" &&
    values.percentage_of_profits !== undefined && {
      percentage: Number(values.percentage_of_profits),
    }),

  ...(values.case_fees_type === "contract_based" &&
    values.contract_based !== undefined && {
      contract_based: Number(values.contract_based),
    }),
};

  const normalizedOpponents = values.opponents
    .filter((opponent) => opponent.name.trim())
    .map((opponent) => ({
      name: opponent.name,
      ssn: opponent.ssn,
      phone_number: `${opponent.country_code}${opponent.phone}`,
    }));

  // ================= UNDER APPEAL =================
  if (values.case_situation === "UNDER_APPEAL") {
    return {
      ...base,
      case_situation: "UNDER_APPEAL",
      case_fees,
      opponents: normalizedOpponents.map((opponent) => ({
        name: opponent.name,
      })),
    };
  }

  // ================= ACTIVE =================
  if (values.case_situation === "ACTIVE") {
    return {
      ...base,
      case_situation: "ACTIVE",
      reference_number: values.reference_number?.trim() || "",
      Complaint_Number: Number(values.Complaint_Number),
      court_id: Number(values.court_id),
      Current_court_degree: values.Current_court_degree,
      case_fees,
      opponents: normalizedOpponents,
    } as ActivePayload;
  }

  // ================= OTHER =================
  if (values.case_situation === "OTHER") {
    return {
      ...base,
      case_situation: "OTHER",
      Complaint_Number: Number(values.Complaint_Number),
      detective_name: values.detective_name,
      investigation_name: values.investigation_name,
      Case_Arrival_Date_at_the_Authority: formatDate(values.Case_Arrival_Date_at_the_Authority),
      case_fees,
      opponents: normalizedOpponents,
    } as OtherPayload;
  }

  if (values.case_situation === "POLICE_CASE") {
    return {
      ...base,
      client_type:  "company",
      case_situation: "POLICE_CASE",
      case_police_station_id: Number(values.case_police_station_id),
      case_number_at_police_station: Number(values.case_number_at_police_station),
      case_arrival_date_at_police_station: formatDate(values.case_arrival_date_at_police_station),
      detective_name: values.detective_name,
      investigation_name: values.investigation_name,
      reference_number: values.reference_number?.trim() || "",
      case_fees,
      opponents: normalizedOpponents,
    } as any; // Using any or PolicePayload
  }

  // ================= PROSECUTION =================
  
  return {
    ...base,
    case_situation: values.case_situation,

    ...(values.case_police_station_id && { case_police_station_id: values.case_police_station_id }),
    ...(values.case_number_at_police_station && {
      case_number_at_police_station: Number(values.case_number_at_police_station)
    }),
    ...(values.case_arrival_date_at_police_station && {
      case_arrival_date_at_police_station: formatDate(values.case_arrival_date_at_police_station)
    }),

    ...(values.case_number_at_prosecution && {
      case_number_at_prosecution: Number(values.case_number_at_prosecution)
    }),
    ...(values.regestration_date_of_case_at_prosecution && {
      regestration_date_of_case_at_prosecution: formatDate(values.regestration_date_of_case_at_prosecution)
    }),

    ...(values.detective_name && { detective_name: values.detective_name }),
    ...(values.investigation_name && { investigation_name: values.investigation_name }),

    case_fees,

    opponents: normalizedOpponents,
  };
};
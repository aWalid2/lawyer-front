import type { CasePayload } from "../types/caseT";

export interface FormValues {
  client_id?: string;
  case_status: string;
  case_situation: CaseSituation;
  case_title: string;
  client_name: string;
  case_type: string;

  case_police_station: string;
  case_number_at_police_station: string;

  client_type: string;

  name: string;
 

  country_code: string;
  phone: string;

  civil_id: string;

  legal_status?: string;

  nationality: string;
  country: string;
  address: string;
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
contract_based?: number;



  has_opponent: boolean;
}

export type CaseSituation =
  | "PUBLIC_PROSECUTION"
  | "AT_PROSECUTOR_OFFICE"
  | "UNDER_APPEAL";

export const mapToApiPayload = (
  values: FormValues
): CasePayload => {
  const statusMap: Record<string, number> = {
    pending: 1,
    inProgress: 2,
    review: 3,
  };

  const base = {
    case_situation: values.case_situation,
    case_title: values.case_title,
    case_status: statusMap[values.case_status_received] || 1,
    client_type: values.client_type,
    client_name: values.client_name,
    case_type: values.case_type,
    notes: values.notes,
    case_entry_date: values.case_entry_date,
  };

const case_fees = {
  case_fees_type: values.case_fees_type,
  notes: values.notes || "",

  ...(values.case_fees_type === "fixed_profits" && {
    fixed_amount: Number(values.fixed_profits),
  }),

  ...(values.case_fees_type === "percentage_of_profits" && {
    percentage: Number(values.percentage_of_profits),
  }),

  ...(values.case_fees_type === "contract_based" && {
    contract_based: Number(values.contract_based),
  }),
};
  // ================= UNDER APPEAL =================
  if (values.case_situation === "UNDER_APPEAL") {
    return {
      ...base,
      case_situation: "UNDER_APPEAL",
      case_fees,
      opponents: values.name
        ? [{ name: values.name, address: values.address }]
        : [],
    };
  }

  // ================= PROSECUTION =================
  return {
    ...base,
    case_situation: values.case_situation,

    case_police_station: values.case_police_station,
    case_number_at_police_station: Number(
      values.case_number_at_police_station
    ),
    case_arrival_date_at_police_station:
      values.case_arrival_date_at_police_station,

    case_number_at_prosecution: Number(
      values.case_number_at_prosecution
    ),
    regestration_date_of_case_at_prosecution:
      values.regestration_date_of_case_at_prosecution,

    detective_name: values.detective_name,
    investigation_name: values.investigation_name,

    case_fees,

    opponents: values.name
      ? [
          {
            name: values.name,
            ssn: values.civil_id,
            phone_number: `${values.country_code}${values.phone}`,
            address: values.address,
          },
        ]
      : [],
  };
};
import type { FormValues } from "../utils/mapToApiPayload";

export const initialValues: FormValues = {
  client_id: "",
  case_status_received: "",
  case_status: "pending",
  case_situation: "UNDER_APPEAL",

  case_title: "",
  client_name: "",
  case_type: "",

  case_police_station: "",
  case_number_at_police_station: "",

  client_type: "individual",

  name: "",
  legal_status: "",

  country_code: "+20",
  phone: "",

  civil_id: "",
  nationality: "",
  country: "",
  address: "",
  email: "",

  case_arrival_date_at_police_station: "",
  case_entry_date: "",
  case_receipt_date: "",

  detective_name: "",
  investigation_name: "",

  contract_start_date: "",
  contract_value: "",
  contract_duration: "",

  contract_image: null,
  power_of_attorney_image: null,

  fee_type: "fixed_amount",
  fixed_amount: undefined,
  percentage: undefined,

  prosecution: "",
  case_number_at_prosecution: "",
  regestration_date_of_case_at_prosecution: "",

  notes: "",
  has_discount: false,
};
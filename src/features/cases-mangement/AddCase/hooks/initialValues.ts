import type { FormValues } from "../utils/mapToApiPayload";

export const initialValues: FormValues = {
  client_id: "1",
  case_status_received: "",
  case_situation: "UNDER_APPEAL",
  case_status_id: "1",

  case_title: "",
  client_name: "",
  case_type_id: "1",

  case_police_station: "",
  case_number_at_police_station: "",

  client_type: "",

  name: "",
  legal_status: "",

  country_code: "+20",
  phone: "",

  civil_id: "",
  ssn: "",
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

 case_fees_type: "fixed_profits",

fixed_profits: undefined,
percentage_of_profits: undefined,
contract_based: undefined,


  prosecution: "",
  case_number_at_prosecution: "",
  regestration_date_of_case_at_prosecution: "",

  notes: "",
  has_opponent: false,

  // Active Fields
  case_sequence: "",
  Complaint_Number: "",
  court_id: "",
  Current_court_degree: "",

  // Other Fields
  Case_Arrival_Date_at_the_Authority: "",
};
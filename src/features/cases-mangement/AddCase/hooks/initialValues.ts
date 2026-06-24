import type { FormValues } from "../utils/mapToApiPayload";

export const initialValues = {
  opponents: [
    {
      name: "",
      legal_status: "",
      country_code: "+965",
      phone: "",
      ssn: "",
    },
  ],
  client_id: "1",
  case_status_received: "",
  case_situation: "UNDER_APPEAL",
  case_status_id: "1",

  case_title: "",
  client_name: "",
  case_type_id: "1",

  case_police_station_id: "",
  case_number_at_police_station: "",

  client_type: "",
  ClientStatus_id: "1",

  name: "",
  legal_status: "",

  country_code: "+20",
  phone: "",

  civil_id: "",
  ssn: "",
  nationality: "",
  country: "",
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

fixed_profits: 0,
percentage_of_profits: 0,
contract_based: undefined,


  prosecution: "",
  case_number_at_prosecution: "",
  regestration_date_of_case_at_prosecution: "",

  notes: "",
  has_opponent: true,
  Employee_id: "",
  role_id: "",
  selected_contract: null,

  // Active Fields
reference_number: "",
  Complaint_Number: "",
  court_id: "",
  Current_court_degree: "",
  date_case_registered_court: "",
  case_number_court: "",
  circuit_id: "",
  session_comming_date: "",
  court_role: "",
  court_hall_number: "",
  circuit_judge_name: "",
  circuit_secretary_name: "",
  circuit_secretary_office_role: "",
  circuit_secretary_office_number: "",

  // Other Fields
  Case_Arrival_Date_at_the_Authority: "",
  complaint_case_type: "",
  complaint_case_subject: "",
  complaint_case_status: "",
  complaint_case_authority: "",
  complaint_case_registration_date: "",
  client_status: "",
} satisfies FormValues;
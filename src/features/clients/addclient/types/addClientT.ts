
export interface FormValues {
  first_name: string;
  email: string;
  password: string;
  contract_photo: File | null;
  authorization_photo: File | null;
  nationality: string;
  country: string;
  address: string;
  ssn: string;
  phone: string;
  countryCode: string;
  has_contract: boolean;
  add_clients: boolean;
  client_type: "individual" | "company" | "government";
  notes: string;
  contract_start_date: string;
  contract_value: string;
  contract_duration: string;
  confirmation_password: string;
  user_status: string;
}
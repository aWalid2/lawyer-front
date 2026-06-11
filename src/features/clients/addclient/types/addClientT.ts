
export interface ContractItem {
  contract_start_date: string;
  contract_value: string;
  contract_duration: string;
  contract_file: File | null;
}

export interface FormValues {
  first_name: string;
  email: string;
  password: string;
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
  contracts: ContractItem[];
  confirmation_password: string;
  user_status: string;
}
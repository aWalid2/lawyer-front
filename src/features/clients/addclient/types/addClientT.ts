export interface FormValues {
  first_name: string;
  email: string;
  password: string;
  contract_file: File;
  authorization_photo: File;
  nationality: string;
  country: string;
  address: string;
  ssn: string;
  phone: string;
  profile: {
    client_type: "individual" | "company" | "lawyer";
    notes: string; 
    contract: {
      start_date: string;
      contract_value: string;
      contract_duration: string;
    };
    account: {
      confirmation_password: string;
    };
  };
}
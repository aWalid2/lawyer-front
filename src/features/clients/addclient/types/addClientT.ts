export interface FormValues {
  first_name: string;
  email: string;
  password: string;
  contract_file: string;        // ✅ string (مش null)
  authorization_photo: string;  // ✅ string (مش null)
  nationality: string;
  country: string;
  address: string;
  ssn: string;
  phone: string;
  countryCode: string;
  profile: {
    client_type: "individual" | "company" | "government";
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
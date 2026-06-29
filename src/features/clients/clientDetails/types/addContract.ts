export interface ContractFormValues {
  client_id?: string;
  contract_title?: string;
  start_date: string;
  contract_value: string;
  contract_duration: string;
  contract_cases: string;
  hasFixedDuration: boolean;
  hasFixedCases: boolean;
  file: File | FileList | string | null;
}
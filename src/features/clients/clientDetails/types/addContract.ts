export interface ContractFormValues {
  client_id?: string;
  contract_title?: string;
  start_date: string;
  contract_value: string;
  contract_duration: string;
  file: File | FileList | string | null;
}
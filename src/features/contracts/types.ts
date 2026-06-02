export interface Contract {
  id: string;
  rowNumber?: number;
  clientId: string;
  clientName: string;
  startDate: string;
  contractValue: string;
  contractDuration: string;
  documentFile: string;
  createdAt: string;
  endDate: string;
  client_profile?: {
    name?: string;
  };
}

export interface ContractFormValues {
  clientId: string;
  startDate: string;
  contractValue: string;
  contractDuration: string;
  file: File | FileList | string | null;
}

export const EMPTY_CONTRACT_FORM_VALUES: ContractFormValues = {
  clientId: "",
  startDate: "",
  contractValue: "",
  contractDuration: "",
  file: null,
};

export const toContractFormValues = (
  contract?: Contract,
): ContractFormValues => ({
  clientId: contract?.clientId ?? "",
  startDate: contract?.startDate ?? "",
  contractValue: contract?.contractValue ?? "",
  contractDuration: contract?.contractDuration ?? "",
  file: contract?.documentFile || null,
});
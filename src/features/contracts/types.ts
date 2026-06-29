
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
  contractTitle:string;
  endDate: string;
  client_profile?: {
    name?: string;
  };
  contractRelatedCases:number | string;
  contractPayment:number | string;
}

export interface ContractFormValues {
  clientId: string;
  startDate: string;
  contractValue: string;
  contractDuration: string;
  contractTitle:string;
  hasFixedDuration: boolean;
  hasFixedCases: boolean;
  contractCases: string;
  file: File | FileList | string | null;
}

export const EMPTY_CONTRACT_FORM_VALUES: ContractFormValues = {
  clientId: "",
  startDate: "",
  contractValue: "",
  contractDuration: "",
  contractTitle:"",
  hasFixedDuration: true,
  hasFixedCases: true,
  contractCases: "",
  file: null,
};

export const toContractFormValues = (
  contract?: Contract,
): ContractFormValues => ({
  contractTitle:contract?.contractTitle ?? "",
  clientId: contract?.clientId ?? "",
  startDate: contract?.startDate ?? "",
  contractValue: contract?.contractValue ?? "",
  contractDuration: contract?.contractDuration ?? "",
  hasFixedDuration: !!contract?.contractDuration,
  hasFixedCases: !!contract?.contractRelatedCases,
  contractCases: String(contract?.contractRelatedCases ?? ""),
  file: contract?.documentFile || null,
});
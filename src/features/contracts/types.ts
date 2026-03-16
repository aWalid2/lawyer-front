export interface Contract {
  id: string;
  contractNumber: string;
  clientName: string;
  contractType: string;
  status: string;
  startDate: string;
  endDate: string;
}

export type ContractType = "sale" | "rent" | "maintenance" | "consulting" | "other";
export type ContractStatus = "active" | "expired" | "terminated" | "pending";
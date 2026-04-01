export interface FormValues {
  clientId: string;
  caseStatus: string;           
  caseTitle: string;            
  clientName: string;           
  caseType: string;             
  policeStation: string;        
  numberInPoliceStation: string; 
  clientType: string;           
  firstName: string;            
  secondName: string;           
  countryCode: string;          
  phone: string;                
  civilId: string;              
  legalStatus?: string;         
  nationality: string;
  country: string;
  address: string;
  email: string;
  dateInPoliceStation: string;  
  dateInOffice: string;
  caseReceiptDate?: string;
  investigatorName: string;     
  investigativeAuthority: string; 
  contractStartDate: string;
  contractValue: string;
  contractDuration: string;
  contractImage: File | null;
  powerOfAttorneyImage: File | null;
  fixedFees?: number;          
  profitPercentage?: number;    
  prosecution: string;
  numberInProsecution: string;
  dateInProsecution: string;
  notes: string;
  caseStatusReceived: string;
  feeType: "fixed" | "profit" | "contract" | "";
  hasDiscount: boolean;
}

export const mapToApiPayload = (values: FormValues) => {
  const statusMap: Record<string, number> = {
    pending: 1,
    inProgress: 2,
    review: 3,
  };

  return {
    case_title: values.caseTitle,

    case_status: statusMap[values.caseStatusReceived] || 1,
    case_situation: "active",

    client_id: Number(values.clientId) || 1, // Fallback to 1 if not selected
    case_type: values.caseType,

    case_number_at_prosecution: Number(values.numberInProsecution),
    regestration_date_of_case_at_prosecution: values.dateInProsecution,

    detective_name: values.investigatorName,
    investigation_name: values.investigativeAuthority,

    case_entry_date: values.dateInOffice,
    registration_at_public_prosecution: values.dateInProsecution,

    notes: values.notes,

    case_fees: {
      case_fees_type:
        values.feeType === "fixed"
          ? "fixed_profits"
          : values.feeType === "profit"
          ? "percentage"
          : "contract",

      ...(values.feeType === "fixed" && {
        fixed_amount: values.fixedFees,
      }),

      ...(values.feeType === "profit" && {
        percentage: values.profitPercentage,
      }),

      notes: "",
    },

    opponents: values.secondName
      ? [
          {
            name: values.secondName,
            ssn: values.civilId,
            phone_number: `${values.countryCode}${values.phone}`,
          },
        ]
      : [],
  };
};
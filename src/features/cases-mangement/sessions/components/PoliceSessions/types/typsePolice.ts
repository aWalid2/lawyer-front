export interface FormValues {
  
    caseTitle: string;           
    clientName: string;           
    investigationSource: string;  
    caseReceiptDate: string;      
    notes: string;                
}

export interface PoliceSession {
    rowNumber?: number;
    id: number;
    case_id: number;
    lawyer_id: number;
    session_date: string;
    session_ruling: string;
    session_time: string;
    case: {
        id: number;
        case_title: string;
        case_status_id: number;
        case_situation: string;
        case_sequence: string;
        client_type: string;
        client_id: number;
        case_type_id: number;
        [key: string]: any;
    };
    lawyer: {
        id: number;
        first_name: string;
        last_name: string | null;
        phone: string;
        email: string;
        nationality: string;
        country: string;
        [key: string]: any;
    };
}

export interface CreatePoliceSessionPayload {
    case_id?: number;
    lawyer_id: number;
    session_date: string;
    session_ruling: string;
    session_time: string;
}

export interface SessionFormValues {
    session_date: string;
    session_time: string;
    lawyer_id: string; 
    session_ruling: string;
    case_id?: string; 
}
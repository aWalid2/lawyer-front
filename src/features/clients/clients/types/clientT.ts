


export interface ClientRelatedT {
    id: string;
    user_id: string;
    user: {
        first_name: string;
        last_name: string;
        phone: string;
        national_id: string;
        email: string;
        nationality: string;
        country: string;
        address: string;
        notes: string;
    };
    case_count: number;
    rowNumber: number;
    created_at: string;
    updated_at: string;
    
}




// export interface Client {
//     id: string;
//     clientType?: "individual" | "company" | "government";
//     clientName?: string;
//     nationalId?: string;
//     phoneNumber?: string;
//     countryCode?: string;
//     email?: string;
//     nationality?: string;
//     country?: string;
//     address?: string;
//     notes?: string;
// }


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

// export interface UpdateClientPayload {
//     first_name: string;
//     last_name: string;
//     phone: string;
//     email: string | null;
//     nationality: string | null;
//     country: string | null;
//     role_id: number;
//     ssn: string | null;
//     address: string | null;
//     photo: string | null;
//     fcm_token: string | null;
//     created_at: string;
//     updated_at: string;
    
//     clientName?: string;
//     nationalId?: string;
//     phoneNumber?: string;
//     countryCode?: string;
//     uploadFiles?: any;
//     notes?: string;
//     clientType?: string;
// }

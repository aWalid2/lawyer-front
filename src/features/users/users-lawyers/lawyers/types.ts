export interface Lawyer {
    user_id: number;
    license_number: string | null;
    specialization: string;
    experience_years: number | null;
    is_verified: boolean;
    nationality: string | null;
    country: string | null;
    address: string | null;
    user: {
        id: number;
        first_name: string;
        last_name: string | null;
        email: string;
        phone: string;
    };
}


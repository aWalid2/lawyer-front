export interface Lawyer {
    user_id: number;
    license_number: string | null;
    specialization: string;
    experience_years: number | null;
    is_verified: boolean;
    user: {
        id: number;
        first_name: string;
        last_name: string | null;
        email: string;
        phone: string;
    };
}


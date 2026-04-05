export interface Lawyer {
    user_id: number;
    license_number: string | null;
    specialization: string;
    is_verified: boolean;
    user: {
        id: number;
        first_name: string;
        last_name: string | null;
        email: string;
        phone: string;
    };
}
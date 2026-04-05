// types.ts
export interface Employee {
    user_id: number;
    position: string;
    role?: string;
    password?: string;
    profile?: {
        position: string;
        notes: string;
    };
    user: {
        first_name: string;
        email: string;
        phone: string;
    };
}
// types.ts
export interface Lawyer {
    id: string;
    role: string;
    first_name?: string;
    email?: string;
    phone?: string;
    nationality?: string;
    password?: string;
    country?: string;
    address?: string;
    ssn?: string;
    profile: {
        specialization?: string;
    }
}
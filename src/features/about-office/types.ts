// types.ts
export interface TeamMember {
    name: string;
    role: string;
    description: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
}

export interface FormValues {
    officeLogo: File | null;
    officeName: string;
    notes: string;
    vision: string;
    message: string;
    teamMembers: TeamMember[];
    contactInfo: ContactInfo; // إضافة حقل معلومات التواصل
}
// types.ts
export interface Client {
    id: string;
    clientType?: "individual" | "company" | "government";
    clientName?: string;
    nationalId?: string;
    phoneNumber?: string;
    countryCode?: string;
    email?: string;
    nationality?: string;
    country?: string;
    address?: string;
    notes?: string;
    // يمكن إضافة حقول أخرى حسب الحاجة
}
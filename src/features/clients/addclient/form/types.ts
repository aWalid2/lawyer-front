// types.ts
export interface FormValues {
  // المعلومات الأساسية
  clientType: "individual" | "company" | "lawyer";
  firstName: string;
  secondName: string;
  lastName?: string;
  
  // معلومات الاتصال
  countryCode: string;
  phone: string;
  email: string;
  address: string;
  
  // المعلومات الشخصية
  civilId: string;
  nationality: string;
  country: string;
  
  // معلومات العقد
  contractStartDate: string;
  contractValue: string;
  contractDuration: string;
  contractImage: File | null;
  
  // صورة التوكيل
  powerOfAttorneyImage: File | null;
  
  // ملاحظات
  notes: string;
  
  // معلومات الحساب
  password: string;
  confirmPassword: string;
}

// أنواع إضافية للحالات المختلفة
export type ClientType = "individual" | "company" | "lawyer";

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}
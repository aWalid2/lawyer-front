export interface FormValues {
  // حقول القضية
  caseStatus: string;           // وضع القضية عند الاستلام
  caseTitle: string;            // عنوان القضية
  clientName: string;           // اسم الموكل (من القائمة المنسدلة)
  
  // الحقول الأساسية (من الفورم الأصلي)
  clientType: string;
  firstName: string;
  secondName: string;
  countryCode: string;
  phone: string;
  civilId: string;
  nationality: string;
  country: string;
  address: string;
  email: string;
  
  // حقول العقد
  contractStartDate: string;
  contractValue: string;
  contractDuration: string;
  contractImage: File | null;
  
  // حقول التوكيل
  powerOfAttorneyImage: File | null;
  
  // ملاحظات
  notes: string;
  
  // حقول إنشاء الحساب
  password: string;
  confirmPassword: string;
}
export interface FormValues {
  // حقول القضية الأساسية
  caseStatus: string;           // حالة القضية (متداولة/تحت التنفيذ/تحت النظر)
  caseTitle: string;            // عنوان القضية
  clientName: string;           // اسم الموكل (من القائمة المنسدلة)
  caseType: string;             // وضع القضية عند الاستلام (تحت الرفع/الادعاء العام/النيابة)
  policeStation: string;        // المخفر التابع له القضية
  numberInPoliceStation: string; // رقم القضية في المخفر
  clientType: string;           // صفة الموكل (مدعي/شركة)
  // بيانات الخصم (تظهر عند تفعيل Switch الخصم)
  firstName: string;            // الاسم الأول للخصم
  secondName: string;           // الاسم الثاني للخصم
  countryCode: string;          // كود الدولة
  phone: string;                // رقم الهاتف
  civilId: string;              // الرقم القومي
  legalStatus?: string;         // الصفة القانونية (مضافة من كود الخصم)
  // بيانات إضافية (موجودة في الـ Interface ولكنها غير مستخدمة في الكود)
  nationality: string;
  country: string;
  address: string;
  email: string;
  // تواريخ
  dateInPoliceStation: string;  // تاريخ ورود القضية في المخفر
  dateInOffice: string;         // تاريخ ورود القضية في المكتب
  dateInProsecution: string;    // تاريخ تسجيل القضية في الادعاء العام
  caseReceiptDate?: string;     // تاريخ ورود القضية داخل المكتب (مستخدم في كود "تحت الرفع")
  // بيانات المحقق
  investigatorName: string;     // اسم المحقق
  investigativeAuthority: string; // جهة التحقيق
  // بيانات العقد
  contractStartDate: string;
  contractValue: string;
  contractDuration: string;
  contractImage: File | null;
  // حقول التوكيل
  powerOfAttorneyImage: File | null;
  // الأتعاب (حسب نوع الرسوم)
  fixedFees?: number;           // الأتعاب الثابتة
  profitPercentage?: number;    // نسبة من الأرباح
  // النيابه 
  prosecution: string ;                 // عنوان النيابة
  numberInprosecution: string;          // رقم القضية في النيابة
  dateInprosecution: string;            // تاريخ القضيه في النيابة
  // ملاحظات
  notes: string;
  caseStatusReceived: string; 

}
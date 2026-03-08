export interface FormValues {
    // فقط الحقول المستخدمة في الفورم
    caseTitle: string;           // رقم القضية في المخفر
    clientName: string;           // اسم المحقق
    investigationSource: string;  // جهة التحقيق المحول منها
    caseReceiptDate: string;      // تاريخ ورود القضية داخل المكتب
    notes: string;                // المخفر التابع له القضية
}
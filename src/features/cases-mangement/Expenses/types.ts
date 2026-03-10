export interface Document {
  id: string;
  // بيانات المصاريف
  caseReceiptDate?: string;      // تاريخ ورود القضية
  receiptStatus?: string;        // وضع القضية عند الاستلام
  caseType?: string;             // نوع القضية
  caseStatus?: string;           // حالة القضية
  currentDegree?: string;        // درجة التقاضي الحالية
  fees?: string;                 // الاتعاب
  uploadFiles?: any;             // الملفات المرفوعة
  notes?: string;                // الملاحظات
  type: string;
}
export interface FormValues {
  caseNumberInProsecution: string; // رقم القضية في النيابة
  prosecutionName: string; // النيابة
  prosecutionRegistrationDate: string; // تاريخ تسجيل القضية داخل النيابة
  policeStation: string; // المخفر التابع له القضية
}

export interface SessionFormValues {
    sessionDate: string; // دمج التاريخ والوقت
    sessionTime: string; // وقت الجلسة
    lawyer: string;
    decision: string;
}
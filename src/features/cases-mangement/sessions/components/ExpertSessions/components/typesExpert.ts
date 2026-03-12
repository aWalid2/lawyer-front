export interface ExpertData {
  expertName: string; // اسم الخبير
  referralDate: string; // تاريخ الإحالة للخبراء
  officeLocation: string; // مكان المكتب (الدائرة)
  expertType: string; // تخصص الخبير
}

export interface ExpertSession {
  id: string;
  sessionDate: string;
  sessionTime: string;
  lawyer: string;
  decision: string;
}

export interface ExpertSessionFormValues {
  sessionDate: string;
  sessionTime: string;
  lawyer: string;
  decision: string;
}

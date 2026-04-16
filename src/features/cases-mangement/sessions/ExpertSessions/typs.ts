export interface ExpertDocument {
  id: string;
  type: string;                    // نوع المستند (experts)
  
  // الحقول الأساسية المطلوبة
  expertReportNumber: string;      // رقم تقرير الخبير
  assignedAuthority: string;       // الجهة المكلفة
  assignmentDate: string;          // تاريخ التكليف
  expertOfficeName: string;        // مكتب الخبراء
  taskStartDate: string;           // تاريخ مباشرة المهمة
  subjectOfExpertise: string;      // موضوع الخبرة
  finalOpinion: string;            // الرأي النهائي للخبير
  reportSubmissionDate: string;    // تاريخ إيداع التقرير
  
  // الحقول الاختيارية
  objections?: string;              // الاعتراضات
  notes?: string;                   // ملاحظات إضافية
}
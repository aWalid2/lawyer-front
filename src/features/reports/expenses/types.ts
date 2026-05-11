export interface ReportExpense {
  id: string;
  rowNumber?: number;
  caseId: number | null;
  caseTitle: string;
  caseSequence: string;
  expenseType: string;
  employeeName: string;
  description: string;
  amount: number;
  expenseDate: string;
  attachments: string[];
  notes: string;
}

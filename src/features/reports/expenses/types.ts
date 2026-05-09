export interface ReportExpense {
  id: string;
  expenseType: string;
  employeeName: string;
  description: string;
  amount: number;
  expenseDate: string;
  attachments: string[];
  notes: string;
}

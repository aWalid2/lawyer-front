export interface ReportExpense {
  id: string;
  invoiceNumber: string;
  category: string;
  description: string;
  amount: string;
  responsibleEmployee: string;
  date: string;
  status: "paid" | "rejected" | "inactive";
}

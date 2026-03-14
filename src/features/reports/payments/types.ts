export interface ReportPayment {
  id: string;
  invoiceNumber: string;
  clientName: string;
  paymentMethod: string;
  amount: string;
  responsibleEmployee: string;
  date: string;
  status: "paid" | "rejected" | "inactive";
}

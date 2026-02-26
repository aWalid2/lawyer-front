import React from "react";
import { type ClientCase } from "./types";
import { ClientsCasesTable } from "./casesClientTable/componnents/ClientsCasesTable";

const mockCases: ClientCase[] = [
  {
    id: 1,
    code: "#6341",
    autoNumber: "979",
    subject: "سرقة",
    status: "متداولة",
    role: "صفة1",
    date: "11/10/2025",
  },
  {
    id: 2,
    code: "#6342",
    autoNumber: "345",
    subject: "قتل",
    status: "متداولة",
    role: "صفة1",
    date: "11/10/2025",
  },
  {
    id: 3,
    code: "#6345",
    autoNumber: "556",
    subject: "سرقة",
    status: "متداولة",
    role: "صفة1",
    date: "11/10/2025",
  },
];

export const ClientCases: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  return (
    <div className="space-y-6">
      <ClientsCasesTable 
        clients={mockCases} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
};

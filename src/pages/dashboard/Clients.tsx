// src/pages/ClientsPage.tsx
import React, { useState, useMemo } from "react";
import { ClientsTable } from "../../components/clients/table/componnents/ClientsTable"; // تعديل المسار (كان componnents غلط)
import type { Client, ClientsPageProps } from "../../components/clients/types";

// بيانات تجريبية
const mockClients: Client[] = [
  { id: 1, name: "أحمد محمد", phone: "054837892", performance: 8 },
  { id: 2, name: "محمد علي", phone: "054837892", performance: 5 },
  { id: 3, name: "سارة خالد", phone: "054837892", performance: 12 },
  { id: 4, name: "فاطمة أحمد", phone: "054837892", performance: 3 },
  { id: 5, name: "يوسف عمر", phone: "054837892", performance: 7 },
  { id: 6, name: "عبدالله سعد", phone: "054837892", performance: 14 },
  { id: 7, name: "نورة عبدالعزيز", phone: "054837892", performance: 2 },
  { id: 8, name: "هند صالح", phone: "054837892", performance: 9 },
  { id: 9, name: "خالد ابراهيم", phone: "054837892", performance: 4 },
  { id: 10, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 11, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 12, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 13, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 14, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 15, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 16, name: "لمى فيصل", phone: "054837892", performance: 11 },
];

const Clients: React.FC<ClientsPageProps> = ({
  initialClients = mockClients,
}) => {
  const [performanceRange] = useState({ min: 0, max: 14 }); // مش بنستخدمها دلوقتي
  const [clients] = useState(initialClients);

  // فلترة البيانات (لو عاوز تستخدم performanceRange)
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      return client.performance >= performanceRange.min && 
             client.performance <= performanceRange.max;
    });
  }, [clients, performanceRange]);

  const handleClientClick = (client: Client) => {
    console.log("Client clicked:", client);
  };

  const handleViewDetails = (client: Client) => {
    console.log("View details:", client);
  };

  const handleEdit = (client: Client) => {
    console.log("Edit client:", client);
  };

  const handleDelete = (id: number) => {
    console.log("Delete client:", id);
  };

  return (
    <div className="pt-6" dir="rtl">
      <ClientsTable
        clients={filteredClients}
        onClientClick={handleClientClick}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Clients;
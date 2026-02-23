// src/pages/ClientsPage.tsx
import React, { useState, useMemo } from "react";
import { ClientsSearch } from "../../components/clients/ClientsSearch"; // ✅
import { ClientsTable } from "../../components/clients/table/componnents/ClientsTable"; // ✅
import type { Client, ClientsPageProps } from "../../components/clients/types"; // ✅

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
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceRange, setPerformanceRange] = useState({ min: 0, max: 14 });
  const [clients] = useState(initialClients);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.includes(searchTerm) || client.phone.includes(searchTerm);
      const matchesPerformance =
        client.performance >= performanceRange.min &&
        client.performance <= performanceRange.max;
      return matchesSearch && matchesPerformance;
    });
  }, [clients, searchTerm, performanceRange]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddNew = () => {};

  const handleClientClick = (client: Client) => {};

  return (
    <div className="flex flex-col gap-6 p-6" dir="rtl">
      <ClientsSearch onSearch={handleSearch} onAddNew={handleAddNew} />
      <ClientsTable
        clients={filteredClients}
        onClientClick={handleClientClick}
      />
    </div>
  );
};

export default Clients;

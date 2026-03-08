import React, { useState, useEffect } from "react";
import { ClientsTable } from "@/features/clients/components/table/componnents/ClientsTable";
import type {
  Client,
  ClientsPageProps,
} from "../../../features/clients/components/table/componnents/typesClients";
import { EditClientModal } from "@/features/clients/components/table/componnents/EdidModel/EditClientModal";

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
  { id: 11, name: "لمى فيصل", phone: "054837892", performance: 12 },
  { id: 12, name: "لمى فيصل", phone: "054837892", performance: 13 },
  { id: 13, name: "لمى فيصل", phone: "054837892", performance: 14 },
  { id: 14, name: "لمى فيصل", phone: "054837892", performance: 45 },
  { id: 15, name: "لمى فيصل", phone: "054837892", performance: 12 },
  { id: 16, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 17, name: "لمى فيصل", phone: "054837892", performance: 11 },
  { id: 18, name: "لمى فيصل", phone: "054837892", performance: 11 },

];

const Clients: React.FC<ClientsPageProps> = ({
  initialClients = mockClients,
}) => {
  const [clients] = useState(initialClients);

  // استخدام localStorage للصفحة الحالية
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('clientsTablePage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  // حفظ الصفحة في localStorage عند التغيير
  useEffect(() => {
    console.log("Saving to localStorage:", currentPage); // للتأكد
    localStorage.setItem('clientsTablePage', currentPage.toString());
  }, [currentPage]);

  // للتأكد من القيمة الحالية
  console.log("Current page in Clients:", currentPage);

  // حالات المودال
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientClick = (client: Client) => {
    console.log("Client clicked:", client);
  };

  const handleViewDetails = (client: Client) => {
    console.log("View details:", client);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("Delete client:", id);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  const handleSaveEdit = (updatedData: any) => {
    console.log("تم حفظ التعديلات:", updatedData);
  };

  return (
    <div>
      <ClientsTable
        clients={clients}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClientClick={handleClientClick}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        clientData={selectedClient}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Clients;
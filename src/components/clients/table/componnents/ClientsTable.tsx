// src/components/clients/table/ClientsTable.tsx
import React, { useState } from 'react';
import type { ClientsTableProps } from '../../types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';

export const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients, 
  onClientClick,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 15 عنصر في الصفحة

  // حساب الصفحات
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const handleRowClick = (client: any) => {
    setSelectedId(client.id);
    onClientClick?.(client);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // لو عاوز تروح لأعلى الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (clients.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full border-collapse">
          <TableHeader />
          <tbody>
            {currentClients.map((client, index) => (
              <TableRow
                key={client.id}
                client={client}
                index={startIndex + index + 1} // الرقم التسلسلي المستمر
                isSelected={selectedId === client.id}
                onRowClick={handleRowClick}
                onEdit={onEdit}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={clients.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ClientsTable;
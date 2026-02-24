import React, { useState, useMemo } from 'react';
import type { ClientsTableProps } from '../../types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { ClientsSearch } from '../../ClientsSearch';

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  onClientClick,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceRange] = useState({ min: 0, max: 14 });
  
  const itemsPerPage = 15;

  // فلترة البيانات حسب البحث والأداء
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

  // حساب الصفحات
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handleRowClick = (client: any) => {
    setSelectedId(client.id);
    onClientClick?.(client);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    console.log("إضافة موكل جديد");
  };

  if (clients.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* البحث جوه الجدول فوق الهيدر */}
        <div className="container pt-6  border-gray-200">
          <ClientsSearch onSearch={handleSearch} onAddNew={handleAddNew} />
        </div>
        
        {/* الجدول */}
        <div className="container pt-6 ">
          <table className="w-full border-collapse">
            <TableHeader />
            <tbody>
              {currentClients.map((client, index) => (
                <TableRow
                  key={client.id}
                  client={client}
                  index={startIndex + index + 1}
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
        
        {/* لو مفيش نتائج للبحث */}
        {currentClients.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500 border-t border-gray-200">
            لا توجد نتائج للبحث
          </div>
        )}

        {/* Pagination جوه الجدول تحت */}
        {totalPages > 1 && (
          <div className="   border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredClients.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsTable;


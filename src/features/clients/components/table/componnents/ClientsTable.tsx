import React, { useState, useMemo, useEffect } from "react";
import type { ClientsTableProps } from "./typesClients";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import { ClientsSearch } from "../../table/componnents/ClientsSearch";
import { useCallback } from "react";


export const ClientsTable: React.FC<
  ClientsTableProps & {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }
> = ({
  clients,
  currentPage,
  setCurrentPage,
  onClientClick,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceRange] = useState({ min: 0, max: 14 });

  const itemsPerPage = 15;

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.includes(searchTerm) ||
        client.phone.includes(searchTerm);

      const matchesPerformance =
        client.performance >= performanceRange.min &&
        client.performance <= performanceRange.max;

      return matchesSearch && matchesPerformance;
    });
  }, [clients, searchTerm, performanceRange]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  // نحافظ إن الصفحة متعديش العدد
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRowClick = (client: any) => {
    setSelectedId(client.id);
    onClientClick?.(client);
  };

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}, [currentPage]);

const handleSearch = useCallback((term: string) => {
  setSearchTerm(term);
  setCurrentPage(1);
}, []);

  if (clients.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2 md:space-y-4 pt-2 md:pt-6 px-1.5 sm:px-2 md:px-0 w-full">
      <div className=" bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm md:shadow-gray-400 md:shadow-2xl w-full">
        <div className="p-2 sm:p-3 md:p-6 w-full">
          <ClientsSearch onSearch={handleSearch} />
        </div>

        <div className="p-2 sm:p-3 md:p-6 overflow-x-auto w-full">
          <table className="w-full border-collapse border border-gray-200  border-l-0 text-xs sm:text-lg  md:text-lg">
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredClients.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};



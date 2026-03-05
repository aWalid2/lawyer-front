import React, { useState, useMemo, useEffect, useCallback } from "react";
import type { ClientsTableProps } from "./typesClients";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import { ClientsSearch } from "../../table/componnents/ClientsSearch";

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

    useEffect(() => {
      if (totalPages > 0 && currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [totalPages, currentPage, setCurrentPage]);

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

    }, [setCurrentPage]);

    if (clients.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-6 mt-6 ">
        <div className="overflow-x-auto bg-white rounded-lg md:rounded-xl border border-gray-200 shadow-sm md:shadow-gray-400 md:shadow-2xl ">
          <div className="p-2 sm:p-3 md:p-6  ">
            <ClientsSearch onSearch={handleSearch} />
          </div>

          <div className="overflow-x-auto p-6">

            <table className="w-full  border-collapse  border-r border-[#E6E6E6]  table-fixed">
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


      </div>
    );
  };

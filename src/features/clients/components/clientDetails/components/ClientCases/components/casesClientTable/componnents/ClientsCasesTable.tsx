import React, { useEffect, useMemo, useState } from "react";
import type { ClientsTableProps } from "../../../../typesClientDetails";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";
import { TableCasesHeader } from "./TableCasesHeader";
import { TableCasesRow } from "./TableCasesRow";




export const ClientsCasesTable: React.FC<
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
}) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const searchTerm = "";

    const itemsPerPage = 15;

    const filteredClients = useMemo(() => {
      return clients.filter((client) => {
        const matchesSearch =
          client.subject.includes(searchTerm) ||
          client.code.includes(searchTerm);

        return matchesSearch;
      });
    }, [clients, searchTerm]);

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

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



    if (clients.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-6">
        <div className="overflow-x-auto bg-white  ">

          <div className="container pt-6">
            <table className="w-full border-collapse">
              <TableCasesHeader />
              <tbody>
                {currentClients.map((client, index) => (
                  <TableCasesRow
                    key={client.id}
                    client={client}
                    index={startIndex + index + 1}
                    isSelected={selectedId === client.id}
                    onRowClick={handleRowClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
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
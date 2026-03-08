import { useState, useMemo } from "react";
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types";
import { DataTable, type Column } from "@/components/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { Pagination } from "@/components/shared/components/Pagination";

const MOCK_DOCUMENTS: Document[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  autoNumber: "16365",
  caseNumber: "13/05/2025",
  caseTitle: "ارشيف",
  date: "13/05/2025",
}));

const DocumentsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  const handleEdit = (doc: Document) => {
    console.log("Edit document:", doc);
  };

  const handleDelete = (doc: Document) => {
    console.log("Delete document:", doc);
  };

  const filteredDocuments = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const searchStr = searchTerm.toLowerCase();
      return (
        doc.caseTitle.toLowerCase().includes(searchStr) ||
        doc.caseNumber.toLowerCase().includes(searchStr) ||
        doc.autoNumber.toLowerCase().includes(searchStr)
      );
    });
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const currentDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDocuments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDocuments, currentPage]);

  const columns: Column<Document>[] = [
    {
      header: "#",
      accessor: (item) => filteredDocuments.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-16",
    },
    {
      header: "الرقم الآلي للقضية",
      accessor: "autoNumber",
    },
    {
      header: "كود القضية",
      accessor: "caseNumber",
    },
    {
      header: "عنوان القضية",
      accessor: "caseTitle",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <TableDocumentsActions
          document={item}
          onEdit={(d) => handleEdit(d)}
          onDelete={(d) => handleDelete(d)}
        />
      ),
    },
  ];

  return (
    <div className="w-full pt-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-primary p-4 md:p-6">
        <HeaderPageDocuments
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={() => { }}
        />

        <DataTable
          data={currentDocuments}
          columns={columns}
          rowIdField="id"
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredDocuments.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentsFeature;

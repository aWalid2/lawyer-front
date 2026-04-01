import { useState, useMemo, useEffect } from "react";
import { HeaderPageDocuments } from "./components/HeaderPageDocuments";
import type { Document } from "./types";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { TableDocumentsActions } from "./components/TableDocumentsActions";
import { Pagination } from "@/shared/components/Pagination";

const MOCK_DOCUMENTS: Document[] = Array.from({ length: 45 }, (_, i) => ({
  id: `${i + 1}`,
  autoNumber: "16365",
  caseNumber: "13/05/2025",
  caseTitle: i % 3 === 0 ? "قضية عمالية" : i % 3 === 1 ? "قضية مدنية" : "ارشيف",
  clientCode: `CL-${16265 + i}`,
  clientName: i % 2 === 0 ? "احمد محمد علي" : "شركة النور للتجارة",
  phone: "0123456789",
  date: "13/05/2025",
  type: i % 2 === 0 ? "clients" : "cases",
}));

const DocumentsFeature = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("clients");
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
      const matchesSearch =
        filter === "clients"
          ? (doc.clientName?.toLowerCase() || "").includes(searchStr) ||
          (doc.clientCode?.toLowerCase() || "").includes(searchStr) ||
          (doc.phone?.toLowerCase() || "").includes(searchStr)
          : (doc.caseTitle?.toLowerCase() || "").includes(searchStr) ||
          (doc.caseNumber?.toLowerCase() || "").includes(searchStr) ||
          (doc.autoNumber?.toLowerCase() || "").includes(searchStr);

      const matchesFilter = doc.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filter]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const paginatedDocuments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDocuments.slice(start, start + itemsPerPage);
  }, [filteredDocuments, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const columns: Column<Document>[] = [
    {
      header: "#",
      accessor: (item) => filteredDocuments.findIndex((d) => d.id === item.id) + 1,
      headerClassName: "w-15",
    },
    ...(filter === "clients"
      ? [
        {
          header: "كود الموكل",
          accessor: "clientCode" as keyof Document,
        },
        {
          header: "اسم الموكل",
          accessor: "clientName" as keyof Document,
        },
        {
          header: "رقم الهاتف",
          accessor: "phone" as keyof Document,
        },
      ]
      : [
        {
          header: "الرقم الآلي للقضية",
          accessor: "autoNumber" as keyof Document,
        },
        {
          header: "كود القضية",
          accessor: "caseNumber" as keyof Document,
        },
        {
          header: "عنوان القضية",
          accessor: "caseTitle" as keyof Document,
        },
      ]),
    {
      header: "إجراء",
      accessor: (item) => (
        <TableDocumentsActions
          document={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
          onFilterChange={setFilter}
          filter={filter}
        />

        <DataTable
          rowKey={'id'}
          columns={columns}
          data={paginatedDocuments}
          rowIdField="id"
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentsFeature;

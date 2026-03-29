import React from "react";
import { DataTable, type Column } from "@/shared/components/DataTable";
import { Pagination } from "@/shared/components/Pagination";
import { HeaderCaseDocuments } from "./components/HeaderCaseDocuments";
import { CaseDocumentActions } from "./components/CaseDocumentActions";
import type { CaseDocument } from "./types";

const mockDocuments: CaseDocument[] = [
  { id: "1", name: "عقد تأسيس.pdf", type: "PDF", date: "2024-01-10", size: "1.2 MB" },
  { id: "2", name: "هوية الموكل.jpg", type: "Image", date: "2024-01-15", size: "2.5 MB" },
  { id: "3", name: "مذكرة دفاع.docx", type: "Word", date: "2024-02-01", size: "500 KB" },
  { id: "4", name: "حكم ابتدائي.pdf", type: "PDF", date: "2024-02-10", size: "3.1 MB" },
  { id: "5", name: "صور أدلة.zip", type: "Archive", date: "2024-02-20", size: "15.7 MB" },
];

export const CaseDocuments: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(mockDocuments.length / itemsPerPage);

  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return mockDocuments.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  const columns: Column<CaseDocument>[] = [
    {
      header: "#",
      accessor: (item) => mockDocuments.findIndex((p) => p.id === item.id) + 1,
      headerClassName: "w-16",
    },
    {
      header: "اسم المستند",
      accessor: "name",
      className: "text-right",
    },
    {
      header: "النوع",
      accessor: "type",
    },
    {
      header: "تاريخ الرفع",
      accessor: "date",
    },
    {
      header: "الحجم",
      accessor: "size",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <CaseDocumentActions
          document={item}
          onDelete={(id) => console.log("Delete document", id)}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderCaseDocuments title="المستندات" buttonText="إضافة مستند" />

      <DataTable data={currentData} columns={columns} rowIdField="id" />
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

    </>
  );
};

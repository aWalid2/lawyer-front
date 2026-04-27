import { DataTable, type Column } from "@/shared/components/DataTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import { formatDateToYYYYMMDD } from "@/shared/utils/convertDate";
import { getDocumentFileType } from "@/shared/utils/document";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetCaseDocuments } from "./api/hooks/useGetCaseDocuments";
import { CaseDocumentActions } from "./components/CaseDocumentActions";
import { CreateCaseDocumentDialog } from "./components/CreateCaseDocumentDialog";
import { HeaderCaseDocuments } from "./components/HeaderCaseDocuments";
import type { CaseDocument } from "./types/CaseDocumentT";
import { extractCaseDocuments } from "./utils";

export const CaseDocuments: React.FC = () => {
  const { id: caseId } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const {
    data: documentsResponse,
    isPending,
    isError,
    error,
    refetch,
  } = useGetCaseDocuments(caseId || "");

  const documents = React.useMemo(
    () => extractCaseDocuments(documentsResponse),
    [documentsResponse],
  );

  const totalPages = Math.max(1, Math.ceil(documents.length / itemsPerPage));

  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return documents
      .slice(startIndex, startIndex + itemsPerPage)
      .map((item, index) => ({
        ...item,
        rowNumber: startIndex + index + 1,
      }));
  }, [currentPage, documents]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [documents.length]);

  if (!caseId) {
    return <Error message="معرف القضية غير متوفر" />;
  }

  if (isPending) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Error message="حدث خطأ في تحميل المستندات" error={error} />;
  }

  const columns: Column<CaseDocument & { rowNumber: number }>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-16",
    },
    {
      header: "اسم المستند",
      accessor: (item) => item.document_name || "-",
      className: "text-right",
    },
    {
      header: "النوع",
      accessor: (item) => getDocumentFileType(item.document_file),
    },
    {
      header: "تاريخ الرفع",
      accessor: (item) => formatDateToYYYYMMDD(item.created_at),
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <CaseDocumentActions
          document={item}
          caseId={caseId}
          onDocumentUpdated={() => {
            void refetch();
          }}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderCaseDocuments
        title="المستندات"
        buttonText="إضافة مستند"
        action={
          <CreateCaseDocumentDialog
            caseId={caseId}
            onDocumentAdded={() => {
              void refetch();
            }}
          />
        }
      />

      <DataTable
        rowKey={"id"}
        data={currentData}
        columns={columns}
        rowIdField="id"
      />

      {documents.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#E5E7EB] p-10 text-center text-[#808080]">
          لا توجد مستندات مضافة لهذه القضية
        </div>
      )}

      {totalPages > 1 && (
        <div className="border-t p-4">
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

export default CaseDocuments;

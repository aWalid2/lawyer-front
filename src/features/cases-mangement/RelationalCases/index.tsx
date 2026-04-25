import { DataTable, type Column } from "@/shared/components/DataTable";
import React from "react";
import { HeaderRelationalCases } from "./components/HeaderRelationalCases";
import { RelationalCasesActions } from "./components/RelationalCasesActions";
// import { Pagination } from "@/shared/components/Pagination";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { useIndexedData } from "@/shared/utils/useIndexedData";
import { useParams } from "react-router-dom";
import { useDeleteRelatedCase } from "./api/hooks/useDeleteRelatedCase";
import { useGetRelatedCases } from "./api/hooks/useGetRelatedCases";
import type { RelatedCaseTableItem } from "./types";
import { EmptyTable } from "@/shared/components/EmptyTable";

export const RelationalCases: React.FC = () => {
  const { id } = useParams();
  const caseId = id ?? "";
  const {
    data: relatedCases = [],
    isPending,
    isError,
    error,
  } = useGetRelatedCases(caseId);
  const { mutateAsync: deleteRelatedCase } = useDeleteRelatedCase(caseId);


  const relatedCasesTableData = React.useMemo(
    () =>
      relatedCases?.map((item) => ({
        id: item.related_case.id,
        related_case_id: item.related_case_id,
        case_sequence: item.related_case.case_sequence,
      })),
    [relatedCases],
  );

  const currentData = useIndexedData(relatedCasesTableData);

  if (isPending) return <LoadingPage />;
  if (isError)
    return (
      <Error message="حدث خطأ أثناء جلب القضايا ذات الصلة." error={error} />
    );

  const columns: Column<RelatedCaseTableItem>[] = [
    {
      header: "#",
      accessor: (item) => item.rowNumber,
      headerClassName: "w-13",
      className: "w-13",
    },
    {
      header: "كود القضية",
      accessor: "id",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "الرقم الآلي",
      accessor: "case_sequence",
      headerClassName: "w-35",
      className: "w-35",
    },
    {
      header: "إجراء",
      accessor: (item) => (
        <RelationalCasesActions
          caseId={caseId}
          caseItem={item}
          onDelete={(caseItem) => deleteRelatedCase(String(caseItem?.id))}
        />
      ),
      headerClassName: "w-35",
      className: "w-35",
    },
  ];
  return (
    <div>
      <HeaderRelationalCases title="القضايا ذات الصلة" caseId={caseId} />
      {relatedCases.length > 0 ? <DataTable data={currentData} columns={columns} rowIdField="id" /> : <EmptyTable message="لا يوجد قضايا مرتبطه" />}
      {/* {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )} */}
    </div>
  );
};

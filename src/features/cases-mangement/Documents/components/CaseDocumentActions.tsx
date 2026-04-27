import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import React from "react";
import { useDeleteCaseDocument } from "../api/hooks/useDeleteCaseDocument";
import type { CaseDocument } from "../types/CaseDocumentT";
import { CaseDocumentDetailsDialog } from "./CaseDocumentDetailsDialog";
import { EditCaseDocumentDialog } from "./EditCaseDocumentDialog";

interface CaseDocumentActionsProps {
  document: CaseDocument;
  caseId: string;
  onDocumentUpdated?: () => void;
}

export const CaseDocumentActions: React.FC<CaseDocumentActionsProps> = ({
  document,
  caseId,
  onDocumentUpdated,
}) => {
  const { mutateAsync: deleteDocument } = useDeleteCaseDocument();

  const handleDelete = async () => {
    await deleteDocument(document.id);
    onDocumentUpdated?.();
  };

  const documentName =
    document.document_name || "هذا المستند";

  return (
    <div className="flex items-center justify-center gap-2">
      <CaseDocumentDetailsDialog documentId={document.id} />

      <EditCaseDocumentDialog
        document={document}
        caseId={caseId}
        trigger={<ButtonUpdateTable />}
        onDocumentUpdated={onDocumentUpdated}
      />

      <ConfirmDeleteDialog
        title="حذف المستند"
        description={`هل أنت متأكد من حذف المستند ${documentName}؟`}
        onConfirm={handleDelete}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};

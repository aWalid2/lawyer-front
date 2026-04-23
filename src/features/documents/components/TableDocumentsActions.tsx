import { ButtonDeleteTable } from "@/shared/components/ButtonDeleteTable";
import { ButtonUpdateTable } from "@/shared/components/ButtonUpdateTable";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { ViewLinkTablePageDetails } from "@/shared/components/ViewLinkTablePageDetails";
import React from "react";
import { useDeleteDocument } from "../api/hooks/useDeleteDocument";
import type { Document } from "../types/types";
import { EditDocumentDialog } from "./EditDocumentDialog";

interface TableDocumentsActionsProps {
  document: Document;
  onDocumentUpdated?: () => void;
}

export const TableDocumentsActions: React.FC<TableDocumentsActionsProps> = ({
  document,
  onDocumentUpdated,
}) => {
  const { mutateAsync: deleteDocument } = useDeleteDocument();

  const handleDelete = async () => {
    try {
      await deleteDocument(document.id);
      if (onDocumentUpdated) onDocumentUpdated();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const documentName = document.document_name || "هذا المستند";

  return (
    <div className="flex items-center justify-center gap-2">
      <ViewLinkTablePageDetails to={`/dashboard/documents/${document.id}`} />

      <EditDocumentDialog
        document={document}
        trigger={<ButtonUpdateTable />}
        onDocumentUpdated={onDocumentUpdated}
      />

      <ConfirmDeleteDialog
        title="حذف المستند"
        description={`هل أنت متأكد من حذف المستند (${documentName})؟`}
        onConfirm={handleDelete}
        trigger={<ButtonDeleteTable />}
      />
    </div>
  );
};

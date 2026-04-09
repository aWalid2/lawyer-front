// documents/components/TableDocumentsActions.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Document } from "../types/types";
import { ViewIcon } from "@/shared/icons/View";
import { EditIcon } from "@/shared/icons/Edit";
import { TrashIcon } from "@/shared/icons/Trash";
import { EditDocumentDialog } from "./EditDocumentDialog";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useDeleteDocument } from "../api/hooks/useDeleteDocument";

interface TableDocumentsActionsProps {
    document: Document;
    onDocumentUpdated?: () => void;
}

export const TableDocumentsActions: React.FC<TableDocumentsActionsProps> = ({
    document,
    onDocumentUpdated,
}) => {
    const { mutateAsync: deleteDocument, isPending: isDeleting } = useDeleteDocument();

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
            <Link
                to={`/dashboard/documents/${document.id}`}
                title="عرض"
                className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F0F6FF]"
            >
                <ViewIcon className="size-[16px] text-[#63A4F9]" />
            </Link>

            <EditDocumentDialog
                document={document}
                trigger={
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        title="تعديل"
                        className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#F1F1F3]"
                    >
                        <EditIcon className="size-[14px] text-[#3D3C48]" />
                    </button>
                }
                onDocumentUpdated={onDocumentUpdated}
            />

            <ConfirmDeleteDialog
                title="حذف المستند"
                description={`هل أنت متأكد من حذف المستند (${documentName})؟`}
                onConfirm={handleDelete}
                trigger={
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        title="حذف"
                        disabled={isDeleting}
                        className="h-9 w-9 flex items-center justify-center rounded-[12px] bg-[#C60000]/8 disabled:opacity-50"
                    >
                        <TrashIcon className="size-[16px] text-[#C60000]" />
                    </button>
                }
            />
        </div>
    );
};
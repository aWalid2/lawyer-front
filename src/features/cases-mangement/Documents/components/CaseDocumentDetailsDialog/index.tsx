import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonViewTable } from "@/shared/components/ButtonViewTable";
import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";
import { isImageDocument, isPdfDocument } from "@/shared/utils/document";
import React from "react";
import { useGetCaseDocument } from "../../api/hooks/useGetCaseDocument";
import { extractCaseDocument } from "../../utils";
import { DocumentDetails } from "./components/DocumentDetails";
import { DocumentImage } from "./components/DocumentImage";
import { DocumentInfo } from "./components/DocumentInfo";
import { FileIconDocument } from "./components/FileIconDocument";
import FilesButton from "./components/FilesButton";

interface CaseDocumentDetailsDialogProps {
  documentId: number;
}

export const CaseDocumentDetailsDialog: React.FC<
  CaseDocumentDetailsDialogProps
> = ({ documentId }) => {
  const [open, setOpen] = React.useState(false);
  const { data, isPending, isError, error } = useGetCaseDocument(
    String(documentId),
    open,
  );
  const document = extractCaseDocument(data);

  const handleOpenFile = () => {
    if (document?.document_file) {
      window.open(document.document_file, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonViewTable />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[24px] border-none p-0 text-start sm:max-w-225">
        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-start text-2xl font-bold text-[#153A4D]">
              تفاصيل المستند
            </DialogTitle>
          </DialogHeader>

          {isPending && <LoadingPage />}

          {isError && !isPending && (
            <Error message="تعذر تحميل بيانات المستند" error={error} />
          )}

          {!isPending && !isError && document && (
            <div className="space-y-8 pt-6">
              <div className="flex flex-col justify-between gap-4 pb-6 md:flex-row md:items-center">
                <FileIconDocument document={document} />
                {document.document_file && (
                  <FilesButton handleOpenFile={handleOpenFile} />
                )}
              </div>

              <DocumentInfo document={document} />

              {document.document_file &&
                isImageDocument(document.document_file) && (
                  <DocumentImage document={document} />
                )}

              {document.document_file &&
                isPdfDocument(document.document_file) && (
                  <div className="rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-4">
                    <iframe
                      src={`${document.document_file}#toolbar=0`}
                      title={document.document_name || "مستند PDF"}
                      className="h-125 w-full rounded-lg"
                    />
                  </div>
                )}

              <DocumentDetails document={document} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

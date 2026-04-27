import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Error } from "@/shared/components/Error";
import { ViewIcon } from "@/shared/icons/View";
import {
  Download,
  Eye,
  File,
  FileArchive,
  FileText,
  Image,
} from "lucide-react";
import { useGetCaseDocument } from "../api/hooks/useGetCaseDocument";
import {
  extractCaseDocument,
  formatCaseDocumentDate,
  getCaseDocumentFileType,
  getCaseDocumentName,
  isImageCaseDocument,
  isPdfCaseDocument,
} from "../utils";

interface CaseDocumentDetailsDialogProps {
  documentId: number;
}

const getFileIcon = (fileUrl?: string) => {
  if (!fileUrl) {
    return <File className="h-5 w-5" />;
  }

  if (isImageCaseDocument(fileUrl)) {
    return <Image className="h-5 w-5" />;
  }

  if (isPdfCaseDocument(fileUrl)) {
    return <FileText className="h-5 w-5" />;
  }

  if (
    ["zip", "rar", "7z", "tar", "gz"].some((extension) =>
      fileUrl.toLowerCase().endsWith(extension),
    )
  ) {
    return <FileArchive className="h-5 w-5" />;
  }

  return <File className="h-5 w-5" />;
};

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
        <button
          type="button"
          title="عرض التفاصيل"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F6FF]"
        >
          <ViewIcon className="size-4 text-[#63A4F9]" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-[24px] border-none p-0 text-right sm:max-w-225"
        dir="rtl"
      >
        <div className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#153A4D]">
              تفاصيل المستند
            </DialogTitle>
          </DialogHeader>

          {isPending && (
            <div className="py-12 text-center text-[#808080]">
              جاري تحميل التفاصيل...
            </div>
          )}

          {isError && !isPending && (
            <Error message="تعذر تحميل بيانات المستند" error={error} />
          )}

          {!isPending && !isError && document && (
            <div className="space-y-8 pt-6">
              <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F4EADA]">
                    {getFileIcon(document.document_file)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#153A4D]">
                      {getCaseDocumentName(document)}
                    </h2>
                    <p className="mt-1 text-sm text-[#808080]">
                      {getCaseDocumentFileType(document.document_file)}
                    </p>
                  </div>
                </div>

                {document.document_file && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleOpenFile}
                      className="bg-[#CBA462] text-white hover:bg-[#b8924e]"
                    >
                      <Eye className="ml-2 h-4 w-4" />
                      فتح الملف
                    </Button>
                    <Button
                      onClick={handleOpenFile}
                      variant="outline"
                      className="border-[#CBA462] text-[#CBA462] hover:bg-[#F4EADA]"
                    >
                      <Download className="ml-2 h-4 w-4" />
                      تحميل الملف
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col space-y-2">
                  <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
                    اسم المستند
                  </span>
                  <span className="pr-3 text-lg font-bold text-[#153A4D]">
                    {getCaseDocumentName(document)}
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
                    النوع
                  </span>
                  <span className="pr-3 text-lg font-bold text-[#153A4D]">
                    {getCaseDocumentFileType(document.document_file)}
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
                    تاريخ الرفع
                  </span>
                  <span className="pr-3 text-lg font-bold text-[#153A4D]">
                    {formatCaseDocumentDate(document.created_at)}
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
                    رقم الهاتف
                  </span>
                  <span className="pr-3 text-lg font-bold text-[#153A4D]">
                    {document.phone || "-"}
                  </span>
                </div>
              </div>

              {document.document_file &&
                isImageCaseDocument(document.document_file) && (
                  <div className="rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-4">
                    <img
                      src={document.document_file}
                      alt={getCaseDocumentName(document)}
                      className="mx-auto max-h-100 max-w-full rounded-lg object-contain"
                    />
                  </div>
                )}

              {document.document_file &&
                isPdfCaseDocument(document.document_file) && (
                  <div className="rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-4">
                    <iframe
                      src={`${document.document_file}#toolbar=0`}
                      title={getCaseDocumentName(document)}
                      className="h-125 w-full rounded-lg"
                      frameBorder="0"
                    />
                  </div>
                )}

              <div className="border-t border-gray-100 pt-6">
                <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
                  تفاصيل المستند
                </span>
                <div className="mt-3 min-h-30 rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-5">
                  <p className="leading-relaxed text-[#1A1A1A]">
                    {document.document_details || "لا توجد تفاصيل إضافية"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

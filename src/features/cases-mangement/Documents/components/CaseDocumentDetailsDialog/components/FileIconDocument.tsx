import {
  getDocumentFileType,
  isImageDocument,
  isPdfDocument,
} from "@/shared/utils/document";
import { File, FileArchive, FileText, Image } from "lucide-react";
import type { CaseDocument } from "../../../types/CaseDocumentT";

const getFileIcon = (fileUrl?: string) => {
  if (!fileUrl) {
    return <File className="h-5 w-5" />;
  }

  if (isImageDocument(fileUrl)) {
    return <Image className="h-5 w-5" />;
  }

  if (isPdfDocument(fileUrl)) {
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

export const FileIconDocument = ({ document }: { document: CaseDocument }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F4EADA]">
        {getFileIcon(document.document_file)}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#153A4D]">
          {document.document_name || "-"}
        </h2>
        <p className="mt-1 text-sm text-[#808080]">
          {getDocumentFileType(document.document_file)}
        </p>
      </div>
    </div>
  );
};

import {
  formatDocumentDate,
  getDocumentFileType,
} from "@/shared/utils/document";

type DocumentInfoProps = {
  document: {
    document_name?: string;
    document_file?: string;
    created_at?: string;
    phone?: string;
  };
};

export const DocumentInfo = ({ document }: DocumentInfoProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col space-y-2">
        <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
          اسم المستند
        </span>
        <span className="pr-3 text-lg font-bold text-[#153A4D]">
          {document.document_name}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
          النوع
        </span>
        <span className="pr-3 text-lg font-bold text-[#153A4D]">
          {getDocumentFileType(document.document_file)}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
          تاريخ الرفع
        </span>
        <span className="pr-3 text-lg font-bold text-[#153A4D]">
          {formatDocumentDate(document.created_at)}
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
  );
};

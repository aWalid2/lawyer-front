import React from "react";

interface DocumentDetailsProps {
  document: {
    document_details?: string;
  };
}

export const DocumentDetails: React.FC<DocumentDetailsProps> = ({
  document,
}) => {
  return (
    <div className="pt-6">
      <span className="border-r-2 border-[#CBA462] pr-3 text-sm font-medium text-[#808080]">
        تفاصيل المستند
      </span>
      <div className="mt-3 min-h-30 rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-5">
        <p className="leading-relaxed text-[#1A1A1A]">
          {document.document_details || "لا توجد تفاصيل إضافية"}
        </p>
      </div>
    </div>
  );
};

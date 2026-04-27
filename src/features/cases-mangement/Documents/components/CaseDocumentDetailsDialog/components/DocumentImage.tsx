import React from "react";

interface DocumentImageProps {
  document: {
    document_file?: string;
    document_name?: string;
  };
}

export const DocumentImage: React.FC<DocumentImageProps> = ({ document }) => {
  return (
    <div className="w-fit rounded-3xl border border-[#E8E8E8] bg-[#FBFBFB] p-4">
      <img
        src={document.document_file}
        alt={document.document_name || "صورة المستند"}
        className="mx-auto max-h-35 max-w-35 rounded-lg object-contain"
      />
    </div>
  );
};

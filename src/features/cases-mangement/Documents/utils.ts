import type { CaseDocument } from "./types/CaseDocumentT";

export const extractCaseDocuments = (response: unknown): CaseDocument[] => {
  if (Array.isArray(response)) {
    return response as CaseDocument[];
  }

  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    Array.isArray((response as { data?: unknown }).data)
  ) {
    return (response as { data: CaseDocument[] }).data;
  }

  return [];
};

export const extractCaseDocument = (response: unknown): CaseDocument | null => {
  if (!response) {
    return null;
  }

  if (typeof response === "object" && "data" in response) {
    return ((response as { data?: CaseDocument }).data ?? null) as CaseDocument | null;
  }

  return response as CaseDocument;
};

export const getCaseDocumentName = (document: CaseDocument): string => {
  return document.document_name || "-";
};

export const getCaseDocumentFileType = (fileUrl?: string): string => {
  if (!fileUrl) {
    return "غير محدد";
  }

  const extension = fileUrl.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "ملف";
  }

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return "صورة";
  }

  if (["pdf"].includes(extension)) {
    return "PDF";
  }

  if (["doc", "docx"].includes(extension)) {
    return "Word";
  }

  if (["xls", "xlsx", "csv"].includes(extension)) {
    return "Excel";
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return "Archive";
  }

  return extension.toUpperCase();
};

export const formatCaseDocumentDate = (date?: string): string => {
  if (!date) {
    return "غير محدد";
  }

  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const isImageCaseDocument = (fileUrl?: string): boolean => {
  const extension = fileUrl?.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "");
};

export const isPdfCaseDocument = (fileUrl?: string): boolean => {
  const extension = fileUrl?.split(".").pop()?.toLowerCase();
  return extension === "pdf";
};
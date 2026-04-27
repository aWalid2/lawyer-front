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
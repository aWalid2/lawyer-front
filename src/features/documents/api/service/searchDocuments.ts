import api from "@/lib/api";

export interface SearchDocumentResult {
  id: string;
  document_name: string;
  document_type: string;
  case_title: string;
}

export interface SearchDocumentsResponse {
  data: SearchDocumentResult[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export const searchDocuments = async (
  q: string,
  page: number = 1,
  limit: number = 15,
): Promise<SearchDocumentsResponse> => {
  const response = await api.get("/documnet/search", {
    params: { q, page, limit },
  });
  return response.data;
};

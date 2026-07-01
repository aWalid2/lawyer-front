
import api from "@/lib/api";

export const getDocuments = async (page: number, limit: number, status?: string, search?: string, classification?: string) => {
    const params: any = { page, limit };
  
    if (status && status !== "all") {
      params.document_type = status;  
    }
  
    if (search && search.trim()) {
      params.search = search;
    }

    if (classification && classification !== "all") {
      params.document_classification = classification;
    }

    const response = await api.get("/documnet", { params });
    return response.data;
};
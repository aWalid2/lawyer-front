// documents/api/service/getDocuments.ts
import api from "@/lib/api";

export const getDocuments = async (page: number, limit: number, status?: string, search?: string) => {
    const params: any = { page, limit };
  
    if (status && status !== "all") {
      params.document_type = status;  
    }
  
    if (search && search.trim()) {
      params.search = search;
    }

    console.log("Request params:", params); 

    const response = await api.get("/documnet", { params });
    return response.data;
};
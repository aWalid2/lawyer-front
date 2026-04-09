// documents/api/service/getDocuments.ts
import api from "@/lib/api";

export const fetchDocuments = async (page: number, limit: number, search?: string, type?: string) => {
  const params: any = { page, limit };
  
  if (search && search.trim()) {
    params.search = search;
  }
  
  if (type && type !== "all") {
    params.type = type;
  }
  
  const { data } = await api.get("/document/create-document", { params });
  return data;
};
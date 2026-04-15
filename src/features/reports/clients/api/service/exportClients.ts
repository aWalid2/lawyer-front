// service/exportAllClients.ts
import api from "@/lib/api";

export const exportAllClients = async (searchTerm?: string, filter?: string): Promise<Blob> => {
  const response = await api.get("/excel-export-app/clients", {
    params: {
      search: searchTerm || undefined,
      status: filter && filter !== "all" ? filter : undefined,
    },
    responseType: "blob",
  });
  return response.data;
};
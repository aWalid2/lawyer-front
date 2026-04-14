// service/exportAllCases.ts
import api from "@/lib/api";

export const exportAllCases = async (searchTerm?: string, filter?: string): Promise<Blob> => {
  const response = await api.get("/excel-export-app/cases", {
    params: {
      search: searchTerm || undefined,
      status: filter && filter !== "all" ? filter : undefined,
    },
    responseType: "blob",
  });
  return response.data;
};
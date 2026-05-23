
import api from "@/lib/api";

export const exportReportsClients = async (format: string, filter?: string): Promise<Blob> => {
  const response = await api.get(`/reports/clientReports/${format}`, {
    params: {
      status: filter === "active" || filter === "inactive" ? filter : undefined,
    },
    responseType: "blob",
  });
  return response.data;
};
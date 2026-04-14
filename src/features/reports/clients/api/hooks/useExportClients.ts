import { useQuery } from "@tanstack/react-query";
import { exportAllClients } from "../service/exportClients";

export const useExportClients = () => {
  return useQuery({
    queryKey: ["export-clients"],
    queryFn: async () => {
      try {
        const blob = await exportAllClients();
        return blob;
      } catch (error) {
        console.error("Error in useExportClients:", error);
        throw error;
      }
    },
    enabled: false, 
  });
};
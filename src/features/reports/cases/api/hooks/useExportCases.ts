import { useQuery } from "@tanstack/react-query";
import { exportAllCases } from "../service/exportAllCases";

export const useExportCases = () => {
  return useQuery({
    queryKey: ["export-cases"],
    queryFn: async () => {
      try {
        const blob = await exportAllCases();
        return blob;
      } catch (error) {
        console.error("Error in useExportCases:", error);
        throw error;
      }
    },
    enabled: false, 
  });
};
// police-stations/api/hooks/useDeletePoliceStation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePoliceStation } from "../service/deletePoliceStation";

export const useDeletePoliceStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePoliceStation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policeStations"] });
      toast.success("تم حذف المخفر بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المخفر");
    },
  });
};
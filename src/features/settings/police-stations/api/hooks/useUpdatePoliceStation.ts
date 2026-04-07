// police-stations/api/hooks/useUpdatePoliceStation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePoliceStation } from "../service/updatePoliceStation";

export const useUpdatePoliceStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      updatePoliceStation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policeStations"] });
      toast.success("تم تعديل المخفر بنجاح");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء تعديل المخفر");
    },
  });
};
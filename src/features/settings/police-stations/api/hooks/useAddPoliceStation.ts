import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addPoliceStation } from "../service/addPoliceStations";

export const useAddPoliceStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (policeStationData: any) => addPoliceStation(policeStationData),
    onSuccess: () => {
      toast.success("تم إضافة المخفر بنجاح");
      queryClient.invalidateQueries({ queryKey: ["police-stations"] });
    },
    onError: () => {
      toast.error("فشل في إضافة المخفر يرجى المحاولة لاحقاً");
    },
  });
};
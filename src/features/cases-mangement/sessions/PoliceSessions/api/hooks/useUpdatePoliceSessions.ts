import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePoliceSessions } from "../services/updatePoliceSessions";

export const useUpdatePoliceSessions = () => {
  
          const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["police-sessions"],
mutationFn: updatePoliceSessions,
        retry: 1,
        onSuccess: (data: any) => {
            queryClient.invalidateQueries();
            toast.success(data.message || "تم تحديث الجلسة بنجاح");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "حدث خطأ في تحديث الجلسة");
        }

    });

}
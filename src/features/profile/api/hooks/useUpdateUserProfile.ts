import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserProfile } from "../services/updateUserProfile";
import type { UpdateProfilePayload } from "../../types/profileT";

export const useUpdateUserProfile = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      updateUserProfile(userId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile-user", userId],
      });
      toast.success("تم تحديث البيانات بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث البيانات");
    },
  });
};
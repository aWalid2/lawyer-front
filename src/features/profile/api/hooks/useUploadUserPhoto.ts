import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadUserPhoto } from "../services/uploadUserPhoto";

export const useUploadUserPhoto = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadUserPhoto(userId, file),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile-user", userId],
      });
      toast.success("تم تحديث الصورة بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تحديث الصورة");
    },
  });
};

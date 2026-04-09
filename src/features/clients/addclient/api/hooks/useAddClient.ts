// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addClients } from "../service/addClient";
// import { toast } from "sonner";

// export const useAddClient = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (formData: FormData) => addClients(formData),
//     onSuccess: () => {
//       toast.success("تم إضافة الموكل بنجاح");
//       queryClient.invalidateQueries({ queryKey: ["client-profile"] });
//     },
//     onError: (error: any) => {
//       const errorMessage =
//         error.response?.data?.message || "فشل في إضافة الموكل يرجى المحاولة لاحقاً";
//       toast.error(errorMessage);
//     },
//   });
// };
// features/clients/addclient/api/hooks/useAddClient.ts
// features/clients/addclient/api/hooks/useAddClient.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addClients } from "../service/addClient";

export const useAddClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => addClients(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("تم إضافة الموكل بنجاح");
        },
        onError: (error: any) => {
            console.error("Error details:", error);
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة الموكل");
        },
    });
};
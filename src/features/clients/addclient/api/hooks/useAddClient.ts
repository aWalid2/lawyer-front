import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addClients } from "../service/addClient";

export const useAddClient = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: any) => addClients(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("تم إضافة الموكل بنجاح");
            navigate("/dashboard/clients");
        },
        onError: (error: any) => {
            console.error("Error details:", error);
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء إضافة الموكل");
        },
    });
};
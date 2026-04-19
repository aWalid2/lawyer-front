import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
    getFooterSessions, 
    createFooterSession, 
    updateFooterSession, 
    removeFooterSession 
} from "../services/footerSessionServices";

export const useGetFooterSessions = (caseId: string | number, level: string) => {
    return useQuery({
        queryKey: ["footer-sessions", caseId, level],
        queryFn: () => getFooterSessions(caseId, level),
    });
};

export const useCreateFooterSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFooterSession,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["footer-sessions", variables.caseId, variables.level] });
            toast.success("تم إضافة الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء إضافة الجلسة");
        },
    });
};

export const useUpdateFooterSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateFooterSession,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["footer-sessions"] });
            toast.success("تم تحديث الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء تحديث الجلسة");
        },
    });
};

export const useRemoveFooterSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ sessionId, level }: { sessionId: string | number; level: string }) => 
            removeFooterSession(sessionId, level),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["footer-sessions"] });
            toast.success("تم حذف الجلسة بنجاح");
        },
        onError: () => {
            toast.error("حدث خطأ أثناء حذف الجلسة");
        },
    });
};

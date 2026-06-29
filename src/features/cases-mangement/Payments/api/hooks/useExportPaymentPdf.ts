import { useMutation } from "@tanstack/react-query";
import { exportPaymentPdf } from "../services/exportPaymentPdf";
import { downloadFile } from "@/shared/utils";

export const useExportPaymentPdf = () => {
  const mutation = useMutation({
    mutationFn: (paymentId: string | number) => exportPaymentPdf(paymentId),
  });

  const handleExportPdf = async (paymentId: string | number, fileName: string) => {
    await downloadFile({
      fetchFile: () => mutation.mutateAsync(paymentId),
      loadingMessage: "جاري تحميل ملف PDF...",
      successMessage: "تم تحميل ملف PDF بنجاح!",
      errorMessage: "فشل تحميل ملف PDF. يرجى المحاولة مرة أخرى.",
      fileName: `${fileName}.pdf`,
    });
  };

  return {
    handleExportPdf,
    isPending: mutation.isPending,
  };
};

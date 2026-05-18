import { toast } from "sonner";
import { AxiosError } from "axios";

interface DownloadFileOptions {
  fetchFile: () => Promise<Blob>;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  fileName: string;
}

export const downloadFile = async ({
  fetchFile,
  loadingMessage = "جاري تحميل الملف...",
  successMessage = "تم تحميل الملف بنجاح!",
  errorMessage = "فشل تحميل الملف. يرجى المحاولة مرة أخرى.",
  fileName,
}: DownloadFileOptions): Promise<void> => {
  let loadingToastId: string | number | null = null;

  try {
    loadingToastId = toast.loading(loadingMessage);

    const blob = await fetchFile();

    if (!(blob instanceof Blob)) {
      toast.error("خطأ في تنسيق الملف المستلم");
      return;
    }

    if (blob.size === 0) {
      toast.error("لا توجد بيانات للتنزيل");
      return;
    }

    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success(successMessage);
  } catch (error) {
    if (loadingToastId) {
      toast.dismiss(loadingToastId);
    }

    let finalErrorMessage = errorMessage;
    if (error instanceof AxiosError) {
      console.error("Error response:", error.response);

      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          console.error("Error text from blob:", text);
          finalErrorMessage = `خطأ من الخادم: ${text}`;
        } catch (e) {
          console.error("Could not read error:", e);
        }
      } else if (error.response?.data) {
        finalErrorMessage = error.response.data.message || finalErrorMessage;
      }

      if (error.response?.status === 404) {
        finalErrorMessage = "خدمة التصدير غير متاحة حالياً";
      } else if (error.response?.status === 500) {
        finalErrorMessage = "حدث خطأ في الخادم أثناء التصدير";
      }
    } else if (error instanceof Error) {
      finalErrorMessage = error.message;
    }

    toast.error(finalErrorMessage);
  }
};

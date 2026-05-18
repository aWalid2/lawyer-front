import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "@/shared/utils";

interface UseExportOptions<TParams> {
  exportExcelFn?: (params: TParams) => Promise<Blob>;
  exportPdfFn?: (params: TParams) => Promise<Blob>;
  getFileName: (type: "pdf" | "excel", params: TParams) => string;
  loadingMessage?: (type: "pdf" | "excel") => string;
  successMessage?: (type: "pdf" | "excel") => string;
  errorMessage?: string;
}

export const useExport = <TParams>({
  exportExcelFn,
  exportPdfFn,
  getFileName,
  loadingMessage = (type) => `جاري تحميل الملف (${type === "excel" ? "Excel" : "PDF"})...`,
  successMessage = (type) => `تم تحميل الملف (${type === "excel" ? "Excel" : "PDF"}) بنجاح!`,
  errorMessage,
}: UseExportOptions<TParams>) => {
  const excelMutation = exportExcelFn
    ? useMutation({ mutationFn: exportExcelFn })
    : null;

  const pdfMutation = exportPdfFn
    ? useMutation({ mutationFn: exportPdfFn })
    : null;

  const handleExport = async (type: "pdf" | "excel", params: TParams) => {
    const fileName = getFileName(type, params);

    await downloadFile({
      fetchFile: () => {
        if (type === "excel") {
          if (!excelMutation) throw new Error("Excel export function not provided");
          return excelMutation.mutateAsync(params);
        } else {
          if (!pdfMutation) throw new Error("PDF export function not provided");
          return pdfMutation.mutateAsync(params);
        }
      },
      loadingMessage: loadingMessage(type),
      successMessage: successMessage(type),
      errorMessage,
      fileName,
    });
  };

  return {
    handleExport,
    isPending: (excelMutation?.isPending || false) || (pdfMutation?.isPending || false),
  };
};

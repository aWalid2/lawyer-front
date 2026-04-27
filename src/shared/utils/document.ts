export const getDocumentFileType = (fileUrl?: string): string => {
  if (!fileUrl) {
    return "غير محدد";
  }

  const extension = fileUrl.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "ملف";
  }

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return "صورة";
  }

  if (["pdf"].includes(extension)) {
    return "PDF";
  }

  if (["doc", "docx"].includes(extension)) {
    return "Word";
  }

  if (["xls", "xlsx", "csv"].includes(extension)) {
    return "Excel";
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return "Archive";
  }

  return extension.toUpperCase();
};

export const formatDocumentDate = (date?: string, locale = "ar-EG"): string => {
  if (!date) {
    return "غير محدد";
  }

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const isImageDocument = (fileUrl?: string): boolean => {
  const extension = fileUrl?.split(".").pop()?.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "");
};

export const isPdfDocument = (fileUrl?: string): boolean => {
  const extension = fileUrl?.split(".").pop()?.toLowerCase();
  return extension === "pdf";
};
export const getStatusArabic = (status: string): string => {
    const statusMap: Record<string, string> = {
      in_progress: "قيد التنفيذ",
      pending: "قيد الانتظار",
      done: "مُنجزة",
      late: "متأخرة",
    };
    return statusMap[status] || status;
  };
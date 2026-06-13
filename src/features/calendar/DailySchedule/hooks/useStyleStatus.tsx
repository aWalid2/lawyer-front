export const useStyleStatus = () => {
  const taskStatusStyles: Record<string, string> = {
    done: "bg-green-50 text-green-700 border-green-200 rounded-lg",
    late: "bg-red-50 text-red-700 border-red-200  rounded-lg",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200  rounded-lg",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200  rounded-lg",
  };

  const taskStatusLabels: Record<string, string> = {
    done: "مُنجزة",
    late: "متأخرة",
    in_progress: "قيد التنفيذ",
    pending: "قيد الانتظار",
  };

  return {
    taskStatusStyles,
    taskStatusLabels,
  };
};

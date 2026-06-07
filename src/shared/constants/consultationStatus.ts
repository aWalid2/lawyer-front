/**
 * Shared consultation status labels used across the app.
 * Each status maps to an Arabic label and Tailwind badge classes.
 */
export const CONSULTATION_STATUS_LABELS: Record<
  string,
  { text: string; className: string }
> = {
  pending: {
    text: "قيد الانتظار",
    className: "bg-yellow-100 text-yellow-800",
  },
  in_progress: {
    text: "قيد التنفيذ",
    className: "bg-blue-100 text-blue-800",
  },
  completed: {
    text: "مكتملة",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    text: "ملغية",
    className: "bg-red-100 text-red-800",
  },
};

/** Fallback when a status doesn't match any known label */
export const CONSULTATION_STATUS_FALLBACK = {
  text: "غير معروف",
  className: "bg-gray-100 text-gray-800",
} as const;

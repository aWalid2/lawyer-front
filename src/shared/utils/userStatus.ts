export const USER_STATUS_LABELS: Record<string, string> = {
  active: "نشط",
  inactive: "غير نشط",
};

export const USER_STATUS_BADGE_CLASSES: Record<string, string> = {
  active: "bg-success/20 text-success",
  inactive: "bg-error/20 text-error",
};

export const getUserStatusLabel = (status?: string) => {
  if (!status) {
    return "-";
  }

  return USER_STATUS_LABELS[status] ?? status;
};

export const getUserStatusBadgeClass = (status?: string) => {
  if (!status) {
    return "bg-gray-200 text-gray-500";
  }

  return USER_STATUS_BADGE_CLASSES[status] ?? "bg-gray-200 text-gray-500";
};
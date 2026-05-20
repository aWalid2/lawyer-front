import api from "@/lib/api";

export const fetchTasks = async (
  page: number,
  limit: number,
  deliverDateFrom?: Date,
  deliverDateTo?: Date
) => {
  const params: any = { page, limit };

  const formatDateParam = (date?: Date) => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dateFrom = formatDateParam(deliverDateFrom);
  const dateTo = formatDateParam(deliverDateTo);

  if (dateFrom) {
    params.deliver_date_from = dateFrom;
  }
  if (dateTo) {
    params.deliver_date_to = dateTo;
  }

  const { data } = await api.get("task", { params });
  return data;
};
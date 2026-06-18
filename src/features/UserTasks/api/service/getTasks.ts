import api from "@/lib/api";

export const getTasks = async (
  page: number,
  limit: number,
  deliverDateFrom?: Date,
  status?:string,
  deliverDateTo?: Date,
  searchTerm?: string,
) => {
  const params: Record<string, string | number | undefined> = {
    page,
    limit,
    q: searchTerm || undefined,
  };

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

  if (status && status !== "all") {
    params.status = status;
  }

  const endpoint = searchTerm ? "task/without-case/search" : "task/without-case";
  const { data } = await api.get(endpoint, { params });

  const normalizedData = data?.data?.map((item: Record<string, unknown>) => ({
    ...item,
    assignee:
      (item as Record<string, unknown>).assignee ||
      ((item as Record<string, unknown>).assigned_to
        ? { first_name: String((item as Record<string, unknown>).assigned_to) }
        : { first_name: "" }),
  }));

  return { ...data, data: normalizedData };
};
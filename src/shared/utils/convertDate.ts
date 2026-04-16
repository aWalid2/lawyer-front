export function formatDateToYYYYMMDD(isoString: string | null | undefined): string {
  if (!isoString) return "";
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
}
export function formatDateToTime(isoString: string | null | undefined): string {
  if (!isoString) return "";
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[1].slice(0, 5);
}



export function formatDateToYYYYMMDD(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date.toISOString().split("T")[0];
}



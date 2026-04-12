export const formatDate = (date?: string) => {
  if (!date) return undefined;
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
};
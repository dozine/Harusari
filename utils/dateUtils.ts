export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 10);
}

export function formatDateForAPI(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getCurrentDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

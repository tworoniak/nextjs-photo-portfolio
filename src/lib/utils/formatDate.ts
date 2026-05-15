import { format, parseISO } from "date-fns";

export function formatDate(dateString: string, pattern = "MMMM d, yyyy"): string {
  try {
    return format(parseISO(dateString), pattern);
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM yyyy");
  } catch {
    return dateString;
  }
}

export function formatYear(dateString: string): string {
  try {
    return format(parseISO(dateString), "yyyy");
  } catch {
    return dateString;
  }
}

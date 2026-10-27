import type { ISODate } from './board';

export function toISODate(date: Date): ISODate {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}` as ISODate;
}

export function formatDueDate(value: ISODate, today = new Date()): string {
  const [year, month, day] = value.split('-').map(Number);
  const dueDate = new Date(year, month - 1, day);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysUntilDue = Math.round((dueDate.getTime() - startOfToday.getTime()) / 86_400_000);

  if (daysUntilDue === 0) return 'Today';
  if (daysUntilDue === 1) return 'Tomorrow';

  const label = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dueDate);
  return daysUntilDue < 0 ? `Overdue · ${label}` : label;
}

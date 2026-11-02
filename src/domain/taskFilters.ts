import type { Task, TaskPriority } from './board';

export type DueDateFilter = 'any' | 'overdue' | 'next-seven-days' | 'later';
export type TaskFilters = {
  ownerId: string;
  dueDate: DueDateFilter;
  priority: TaskPriority | '';
  labelId: string;
};

export const emptyTaskFilters: TaskFilters = { ownerId: '', dueDate: 'any', priority: '', labelId: '' };

export function filterTasks(tasks: readonly Task[], filters: TaskFilters, today: string): Task[] {
  const lastNearDate = new Date(`${today}T00:00:00Z`);
  lastNearDate.setUTCDate(lastNearDate.getUTCDate() + 7);
  const nextSevenDaysEnd = lastNearDate.toISOString().slice(0, 10);

  return tasks.filter(task => {
    if (filters.ownerId && task.ownerId !== filters.ownerId) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.labelId && task.labelId !== filters.labelId) return false;
    if (filters.dueDate === 'overdue' && task.dueDate >= today) return false;
    if (filters.dueDate === 'next-seven-days' && (task.dueDate < today || task.dueDate > nextSevenDaysEnd)) return false;
    if (filters.dueDate === 'later' && task.dueDate <= nextSevenDaysEnd) return false;
    return true;
  });
}

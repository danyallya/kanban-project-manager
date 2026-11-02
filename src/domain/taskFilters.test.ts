import { describe, expect, it } from 'vitest';
import { initialTasks } from '../data/boardFixtures';
import { emptyTaskFilters, filterTasks } from './taskFilters';

describe('filterTasks', () => {
  it('combines owner, due window, priority and label without mutating the board', () => {
    const filters = { ...emptyTaskFilters, ownerId: 'AM', dueDate: 'next-seven-days' as const, priority: 'Low' as const, labelId: 'design' };
    const result = filterTasks(initialTasks, filters, '2026-11-02');

    expect(result.map(task => task.id)).toEqual(['task-004']);
    expect(initialTasks).toHaveLength(6);
  });

  it('keeps due-date windows bounded and supports overdue and later groups', () => {
    expect(filterTasks(initialTasks, { ...emptyTaskFilters, dueDate: 'overdue' }, '2026-11-02').map(task => task.id))
      .toEqual(['task-001', 'task-002', 'task-003']);
    expect(filterTasks(initialTasks, { ...emptyTaskFilters, dueDate: 'later' }, '2026-11-02').map(task => task.id))
      .toEqual([]);
  });
});

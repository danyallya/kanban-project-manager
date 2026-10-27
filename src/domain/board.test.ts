import { describe, expect, it } from 'vitest';
import { initialTasks, labels, projects } from '../data/boardFixtures';
import { asISODate, canTransitionTask, transitionTask } from './board';
import { formatDueDate } from './dates';

describe('Atelier task and project contracts', () => {
  it('keeps every sample task linked to a known project and label', () => {
    expect(initialTasks).toHaveLength(6);
    for (const task of initialTasks) {
      expect(projects.some(project => project.id === task.projectId)).toBe(true);
      expect(labels.some(label => label.id === task.labelId)).toBe(true);
    }
  });

  it('allows adjacent stage movement and reopening completed work into review', () => {
    expect(canTransitionTask('up-next', 'in-progress')).toBe(true);
    expect(canTransitionTask('in-progress', 'in-review')).toBe(true);
    expect(canTransitionTask('in-review', 'complete')).toBe(true);
    expect(canTransitionTask('complete', 'in-review')).toBe(true);
    expect(canTransitionTask('up-next', 'complete')).toBe(false);
    expect(canTransitionTask('complete', 'up-next')).toBe(false);
  });

  it('preserves task details when applying an allowed transition and rejects a skipped stage', () => {
    const task = initialTasks[0];
    expect(transitionTask(task, 'in-progress')).toEqual({ ...task, stage: 'in-progress' });
    expect(transitionTask(task, 'complete')).toBeNull();
  });

  it('validates ISO calendar dates and formats relative due labels', () => {
    expect(() => asISODate('2026-02-30')).toThrow('Date is not a valid calendar day.');
    expect(formatDueDate(asISODate('2026-10-27'), new Date(2026, 9, 27))).toBe('Today');
    expect(formatDueDate(asISODate('2026-10-29'), new Date(2026, 9, 27))).toBe('Oct 29');
    expect(formatDueDate(asISODate('2026-10-26'), new Date(2026, 9, 27))).toBe('Overdue · Oct 26');
  });
});

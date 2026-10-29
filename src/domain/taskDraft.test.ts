import { describe, expect, it } from 'vitest';
import { validateTaskDraft } from './taskDraft';

describe('Atelier task draft validation', () => {
  it('trims text and returns a typed date and priority for a valid draft', () => {
    expect(validateTaskDraft({ title: '  Draft launch  ', ownerId: ' JL ', dueDate: '2026-11-04', priority: 'Urgent' })).toEqual({
      value: { title: 'Draft launch', ownerId: 'JL', dueDate: '2026-11-04', priority: 'Urgent' },
      errors: {},
    });
  });

  it('rejects missing fields, invalid calendar dates and unsupported priorities', () => {
    expect(validateTaskDraft({ title: '   ', ownerId: '', dueDate: '2026-02-30', priority: 'High' })).toEqual({
      value: null,
      errors: {
        title: 'Add a task title.',
        ownerId: 'Choose a teammate.',
        dueDate: 'Choose a valid calendar date.',
        priority: 'Choose a priority.',
      },
    });
  });

  it('caps task titles at the board-friendly limit', () => {
    const title = 'a'.repeat(121);
    expect(validateTaskDraft({ title, ownerId: 'AM', dueDate: '2026-11-04', priority: 'Normal' }).errors.title)
      .toBe('Use 120 characters or fewer.');
  });
});

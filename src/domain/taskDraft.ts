import { asISODate, TASK_PRIORITIES, type ISODate, type TaskPriority } from './board';

export const TASK_TITLE_LIMIT = 120;

export type TaskDraft = {
  title: string;
  ownerId: string;
  dueDate: string;
  priority: string;
};

export type TaskDraftField = keyof TaskDraft;
export type TaskDraftErrors = Partial<Record<TaskDraftField, string>>;

export type ValidTaskDraft = {
  title: string;
  ownerId: string;
  dueDate: ISODate;
  priority: TaskPriority;
};

export function validateTaskDraft(draft: TaskDraft): { value: ValidTaskDraft | null; errors: TaskDraftErrors } {
  const errors: TaskDraftErrors = {};
  const title = draft.title.trim();
  const ownerId = draft.ownerId.trim();
  let dueDate: ISODate | undefined;

  if (!title) errors.title = 'Add a task title.';
  else if (title.length > TASK_TITLE_LIMIT) errors.title = `Use ${TASK_TITLE_LIMIT} characters or fewer.`;

  if (!ownerId) errors.ownerId = 'Choose a teammate.';

  if (!draft.dueDate) {
    errors.dueDate = 'Choose a due date.';
  } else {
    try {
      dueDate = asISODate(draft.dueDate);
    } catch {
      errors.dueDate = 'Choose a valid calendar date.';
    }
  }

  const priority = TASK_PRIORITIES.find(option => option === draft.priority);
  if (!priority) errors.priority = 'Choose a priority.';

  if (Object.keys(errors).length > 0 || !dueDate || !priority) return { value: null, errors };

  return { value: { title, ownerId, dueDate, priority }, errors };
}

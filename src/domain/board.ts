export const TASK_STAGES = ['up-next', 'in-progress', 'in-review', 'complete'] as const;
export type TaskStage = (typeof TASK_STAGES)[number];

export const TASK_PRIORITIES = ['Urgent', 'Normal', 'Low'] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

declare const isoDateBrand: unique symbol;
export type ISODate = string & { readonly [isoDateBrand]: true };

export function asISODate(value: string): ISODate {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error('Dates must use the YYYY-MM-DD format.');
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    throw new Error('Date is not a valid calendar day.');
  }
  return value as ISODate;
}

export type Project = {
  id: string;
  name: string;
};

export type Label = {
  id: string;
  name: string;
  tone: 'peach' | 'blue' | 'lavender' | 'mint' | 'cream';
};

export type Task = {
  id: string;
  title: string;
  projectId: Project['id'];
  labelId: Label['id'];
  stage: TaskStage;
  dueDate: ISODate;
  priority: TaskPriority;
  ownerId: string;
};

export const TASK_STAGE_LABELS: Record<TaskStage, string> = {
  'up-next': 'UP NEXT',
  'in-progress': 'IN PROGRESS',
  'in-review': 'IN REVIEW',
  complete: 'COMPLETE',
};

/** Tasks move one step at a time; completed work can reopen into review. */
export const ALLOWED_STAGE_TRANSITIONS: Record<TaskStage, readonly TaskStage[]> = {
  'up-next': ['in-progress'],
  'in-progress': ['up-next', 'in-review'],
  'in-review': ['in-progress', 'complete'],
  complete: ['in-review'],
};

export function canTransitionTask(from: TaskStage, to: TaskStage): boolean {
  return ALLOWED_STAGE_TRANSITIONS[from].includes(to);
}

export function transitionTask(task: Task, nextStage: TaskStage): Task | null {
  if (!canTransitionTask(task.stage, nextStage)) return null;
  return { ...task, stage: nextStage };
}

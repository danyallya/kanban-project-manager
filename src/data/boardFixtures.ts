import { asISODate, type Label, type Project, type Task } from '../domain/board';

export const projects: Project[] = [
  { id: 'northstar-brand', name: 'Northstar / Brand launch' },
  { id: 'aperture-product', name: 'Aperture / Product' },
  { id: 'fieldnotes-editorial', name: 'Fieldnotes / Editorial' },
  { id: 'atelier-new-work', name: 'Atelier / New work' },
];

export const labels: Label[] = [
  { id: 'creative', name: 'Creative', tone: 'peach' },
  { id: 'research', name: 'Research', tone: 'blue' },
  { id: 'design', name: 'Design', tone: 'mint' },
  { id: 'planning', name: 'Planning', tone: 'cream' },
  { id: 'operations', name: 'Operations', tone: 'peach' },
];

// All names and project details below are fictional portfolio-preview content.
export const initialTasks: Task[] = [
  { id: 'task-001', title: 'Finalize spring campaign direction', projectId: 'northstar-brand', labelId: 'creative', stage: 'up-next', dueDate: asISODate('2026-10-27'), priority: 'Urgent', ownerId: 'AM' },
  { id: 'task-002', title: 'Map the onboarding journey', projectId: 'aperture-product', labelId: 'research', stage: 'in-progress', dueDate: asISODate('2026-10-29'), priority: 'Normal', ownerId: 'JL' },
  { id: 'task-003', title: 'Approve retail photography selects', projectId: 'northstar-brand', labelId: 'creative', stage: 'in-review', dueDate: asISODate('2026-10-30'), priority: 'Normal', ownerId: 'SK' },
  { id: 'task-004', title: 'Share revised mobile wireframes', projectId: 'aperture-product', labelId: 'design', stage: 'up-next', dueDate: asISODate('2026-11-02'), priority: 'Low', ownerId: 'AM' },
  { id: 'task-005', title: 'Prepare launch day run of show', projectId: 'fieldnotes-editorial', labelId: 'planning', stage: 'in-progress', dueDate: asISODate('2026-11-04'), priority: 'Normal', ownerId: 'JL' },
  { id: 'task-006', title: 'Review supplier packaging samples', projectId: 'northstar-brand', labelId: 'operations', stage: 'complete', dueDate: asISODate('2026-11-05'), priority: 'Low', ownerId: 'SK' },
];

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { TASK_PRIORITIES, TASK_STAGE_LABELS, type TaskStage } from './domain/board';
import { validateTaskDraft, type TaskDraft, type TaskDraftErrors, type TaskDraftField, type ValidTaskDraft } from './domain/taskDraft';

const emptyDraft: TaskDraft = { title: '', ownerId: '', dueDate: '', priority: '' };

export function TaskEditor({ owners, stage, projectName, onCreate, onCancel }: {
  owners: string[];
  stage: TaskStage;
  projectName: string;
  onCreate: (draft: ValidTaskDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(emptyDraft);
  const [errors, setErrors] = useState<TaskDraftErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);
  const ownerField = useRef<HTMLSelectElement>(null);
  const dueDateField = useRef<HTMLInputElement>(null);
  const priorityField = useRef<HTMLSelectElement>(null);

  useEffect(() => { titleField.current?.focus(); }, []);

  const updateField = (field: TaskDraftField, value: string) => {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    if (submitted) setErrors(validateTaskDraft(nextDraft).errors);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const result = validateTaskDraft(draft);
    setErrors(result.errors);

    if (!result.value) {
      if (result.errors.title) titleField.current?.focus();
      else if (result.errors.ownerId) ownerField.current?.focus();
      else if (result.errors.dueDate) dueDateField.current?.focus();
      else priorityField.current?.focus();
      return;
    }

    onCreate(result.value);
  };

  return <section className="task-editor" aria-labelledby="task-editor-title" onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); onCancel(); }
  }}>
    <div className="task-editor-heading">
      <span className="task-editor-eyebrow">NEW WORK · {TASK_STAGE_LABELS[stage]}</span>
      <h2 id="task-editor-title">New task</h2>
      <p>Give the work a clear title, owner and due date before it joins {projectName}.</p>
    </div>
    {submitted && Object.keys(errors).length > 0 && <p className="task-editor-summary" role="alert">Review the highlighted fields and try again.</p>}
    <form className="task-editor-form" noValidate onSubmit={submit}>
      <div className="task-editor-field">
        <label htmlFor="task-title">Task title</label>
        <input ref={titleField} id="task-title" name="title" value={draft.title} maxLength={120} autoComplete="off" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'task-title-error' : undefined} required onChange={event => updateField('title', event.target.value)} />
        {errors.title && <small id="task-title-error" className="task-editor-error">{errors.title}</small>}
      </div>
      <div className="task-editor-field">
        <label htmlFor="task-owner">Owner</label>
        <select ref={ownerField} id="task-owner" name="ownerId" value={draft.ownerId} aria-invalid={Boolean(errors.ownerId)} aria-describedby={errors.ownerId ? 'task-owner-hint task-owner-error' : 'task-owner-hint'} required onChange={event => updateField('ownerId', event.target.value)}>
          <option value="">Choose a teammate</option>
          {owners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
        </select>
        <small id="task-owner-hint" className="task-editor-hint">Choose from the initials shown on the task cards.</small>
        {errors.ownerId && <small id="task-owner-error" className="task-editor-error">{errors.ownerId}</small>}
      </div>
      <div className="task-editor-field">
        <label htmlFor="task-due-date">Due date</label>
        <input ref={dueDateField} id="task-due-date" name="dueDate" type="date" value={draft.dueDate} aria-invalid={Boolean(errors.dueDate)} aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined} required onChange={event => updateField('dueDate', event.target.value)} />
        {errors.dueDate && <small id="task-due-date-error" className="task-editor-error">{errors.dueDate}</small>}
      </div>
      <div className="task-editor-field">
        <label htmlFor="task-priority">Priority</label>
        <select ref={priorityField} id="task-priority" name="priority" value={draft.priority} aria-invalid={Boolean(errors.priority)} aria-describedby={errors.priority ? 'task-priority-error' : undefined} required onChange={event => updateField('priority', event.target.value)}>
          <option value="">Choose a priority</option>
          {TASK_PRIORITIES.map(priority => <option key={priority} value={priority}>{priority}</option>)}
        </select>
        {errors.priority && <small id="task-priority-error" className="task-editor-error">{errors.priority}</small>}
      </div>
      <div className="task-editor-actions">
        <button className="task-editor-submit" type="submit">Create task</button>
        <button className="task-editor-cancel" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  </section>;
}

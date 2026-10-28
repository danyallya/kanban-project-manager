import { useEffect, useRef } from 'react';
import { ALLOWED_STAGE_TRANSITIONS, TASK_STAGE_LABELS, type Task, type TaskStage } from './domain/board';

export function TaskDetail({ task, project, onMove, onClose }: {
  task: Task; project: string; onMove: (id: string, stage: TaskStage) => void; onClose: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [task.id, task.stage]);
  return <section className="task-detail" aria-labelledby="task-detail-title" onKeyDown={event => {
    if (event.key === 'Escape') { event.stopPropagation(); onClose(); }
  }}>
    <h2 ref={heading} tabIndex={-1} id="task-detail-title">{task.title}</h2>
    <p>{project} · {TASK_STAGE_LABELS[task.stage]}</p>
    <dl><dt>Owner</dt><dd>{task.ownerId}</dd><dt>Due date</dt><dd>{task.dueDate}</dd><dt>Priority</dt><dd>{task.priority}</dd></dl>
    <div className="task-moves">{ALLOWED_STAGE_TRANSITIONS[task.stage].map(stage => <button key={stage} onClick={() => onMove(task.id, stage)}>Move to {TASK_STAGE_LABELS[stage]}</button>)}</div>
    <button onClick={onClose}>Close task details</button>
  </section>;
}

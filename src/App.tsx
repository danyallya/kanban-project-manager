import { useEffect, useRef, useState } from 'react';
import { TaskDetail } from './TaskDetail';
import { FiActivity, FiArchive, FiBell, FiCalendar, FiChevronDown, FiClock, FiCommand, FiFilter, FiGrid, FiLayers, FiMoreHorizontal, FiMoon, FiPlus, FiSearch, FiSun, FiUsers } from 'react-icons/fi';
import { initialTasks, labels, projects } from './data/boardFixtures';
import { formatDueDate, toISODate } from './domain/dates';
import { TASK_STAGE_LABELS, TASK_STAGES, transitionTask, ALLOWED_STAGE_TRANSITIONS, type TaskStage } from './domain/board';
const columns = TASK_STAGES.map(id => ({ id, title: TASK_STAGE_LABELS[id] }));
export default function App() {
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const returnFocus = useRef<string | null>(null);
  const selected = tasks.find(task => task.id === selectedId);
  useEffect(() => {
    if (returnFocus.current) {
      document.getElementById(`task-open-${returnFocus.current}`)?.focus();
      returnFocus.current = null;
    }
  }, [tasks, selectedId]);
  const moveTask = (id: string, stage: TaskStage, restoreFocus = false) => {
    const task = tasks.find(item => item.id === id);
    if (!task) return;
    const changed = transitionTask(task, stage);
    setAnnouncement(changed ? `${task.title} moved to ${TASK_STAGE_LABELS[stage]}.` : `Cannot move ${task.title} to ${TASK_STAGE_LABELS[stage]}. Move one stage at a time.`);
    if (changed) {
      if (restoreFocus) returnFocus.current = id;
      setTasks(items => items.map(item => item.id === id ? changed : item));
    }
  };
  const move = (stage: TaskStage) => {
    if (dragId !== null) {
      moveTask(dragId, stage);
    }
    setDragId(null);
  };
  const addTask = () => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
    setTasks(items => [{ id: `task-${Date.now()}`, title: 'New project brief to shape', projectId: 'atelier-new-work', labelId: 'planning', stage: 'up-next', dueDate: toISODate(dueDate), priority: 'Normal', ownerId: 'AM' }, ...items]);
  };
  return <div className={dark ? 'atelier-app night' : 'atelier-app'}>
    <aside className="atelier-sidebar"><div className="atelier-logo">a<span>.</span></div><button className="workspace-switch"><span className="workspace-dot">A</span><span>Atelier House<small>Studio workspace</small></span><FiChevronDown/></button><div className="side-label">WORKSPACE</div><nav><a className="side-active"><FiGrid/> Project desk <span>4</span></a><a><FiLayers/> Projects</a><a><FiCalendar/> Calendar</a><a><FiUsers/> People</a><a><FiArchive/> Archive</a></nav><div className="side-label teams-label">YOUR TEAMS</div><div className="team-row"><i className="team-color rose"/> Brand & Story <span>3</span></div><div className="team-row"><i className="team-color blue"/> Digital Product <span>2</span></div><div className="team-row"><i className="team-color olive"/> Editorial <span>1</span></div><div className="sidebar-bottom"><div className="user-card"><div className="user-avatar">AM</div><span>Alex Morgan<small>Creative director</small></span><FiMoreHorizontal/></div></div></aside>
    <main className="atelier-main"><header className="atelier-top"><div className="breadcrumb">Workspace <FiChevronDown/><b>Project desk</b></div><div className="atelier-top-actions"><div className="quick-search"><FiSearch/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a task..." aria-label="Find a task"/><kbd><FiCommand/> K</kbd></div><button className="atelier-icon" aria-label="Notifications"><FiBell/></button><button className="atelier-icon" aria-label="Toggle theme" onClick={()=>setDark(v=>!v)}>{dark?<FiSun/>:<FiMoon/>}</button></div></header>
      <section className="board-content"><div className="board-intro"><div><div className="board-kicker"><span/> SAMPLE WORKSPACE · THE WORK, WELL CONSIDERED</div><h1>Project desk</h1><p>A thoughtful view of what your studio is moving forward.</p></div><div className="board-intro-actions"><div className="face-stack"><i>AM</i><i>JL</i><i>SK</i><span>+2</span></div><button className="invite-button"><FiUsers/> Share desk</button><button className="add-button" onClick={addTask}><FiPlus/> New task</button></div></div>
        <div className="board-toolbar"><div className="board-tabs"><button className="selected">Board <span>12</span></button><button>Timeline</button><button>Files</button></div><div className="toolbar-actions"><button><FiFilter/> Filter</button><button><FiActivity/> Activity</button><button className="toolbar-more"><FiMoreHorizontal/></button></div></div>
        <p role="status" aria-live="polite">{announcement}</p>{selected && <TaskDetail task={selected} project={projects.find(item=>item.id===selected.projectId)?.name ?? 'Unknown project'} onMove={moveTask} onClose={()=>{returnFocus.current=selected.id;setSelectedId(null);}}/>}<div className="kanban-grid">{columns.map(col=><section className="kanban-column" key={col.id} onDragOver={e=>e.preventDefault()} onDrop={()=>move(col.id)}><div className="column-heading"><div><span className={'column-dot '+col.id}/><b>{col.title}</b><small>{tasks.filter(t=>t.stage===col.id).length}</small></div><button aria-label={'Add to '+col.title} onClick={addTask}><FiPlus/></button></div><div className="task-list">{tasks.filter(t=>t.stage===col.id&&t.title.toLowerCase().includes(query.toLowerCase())).map(task=>{ const label = labels.find(item => item.id === task.labelId); const project = projects.find(item => item.id === task.projectId); const dueLabel = formatDueDate(task.dueDate); return <article key={task.id} className="task-card" draggable onDragEnd={()=>setDragId(null)} onDragStart={()=>setDragId(task.id)}><div className="task-top"><span className={'task-tag '+(label?.tone ?? 'cream')}>{label?.name ?? 'Unlabelled'}</span><button aria-label="More task options"><FiMoreHorizontal/></button></div><h2><button id={`task-open-${task.id}`} className="task-open" onClick={()=>setSelectedId(task.id)}>{task.title}</button></h2><div className="task-moves">{ALLOWED_STAGE_TRANSITIONS[task.stage].map(stage=><button key={stage} aria-label={`Move ${task.title} to ${TASK_STAGE_LABELS[stage]}`} onClick={()=>moveTask(task.id,stage,true)}>Move to {TASK_STAGE_LABELS[stage]}</button>)}</div><p className="task-project"><FiLayers/>{project?.name ?? 'Unknown project'}</p><div className="task-footer"><span className={task.dueDate<=toISODate(new Date())?'due urgent':'due'}><FiClock/>{dueLabel}</span><span className={'priority '+task.priority.toLowerCase()}>{task.priority}</span><i className="task-owner">{task.ownerId}</i></div></article>})}</div>{col.id==='up-next'&&<button className="add-card" onClick={addTask}><FiPlus/> Add a task</button>}</section>)}</div>
        <footer className="board-footer"><span><i/> Sample board · local preview only</span><span>Task changes reset when you reload</span></footer>
      </section></main></div>;
}

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { TaskDetail } from './TaskDetail';
import { TaskEditor } from './TaskEditor';
import { FiActivity, FiArchive, FiBell, FiCalendar, FiChevronDown, FiClock, FiCommand, FiFilter, FiGrid, FiLayers, FiMoreHorizontal, FiMoon, FiPlus, FiSearch, FiSun, FiUsers } from 'react-icons/fi';
import { initialTasks, labels, projects } from './data/boardFixtures';
import { formatDueDate, toISODate } from './domain/dates';
import { ALL_PROJECTS_ID, TASK_PRIORITIES, TASK_STAGE_LABELS, TASK_STAGES, tasksForProject, transitionTask, ALLOWED_STAGE_TRANSITIONS, type ProjectBoardId, type Task, type TaskStage } from './domain/board';
import { emptyTaskFilters, filterTasks, type DueDateFilter, type TaskFilters } from './domain/taskFilters';
import type { ValidTaskDraft } from './domain/taskDraft';
const columns = TASK_STAGES.map(id => ({ id, title: TASK_STAGE_LABELS[id] }));
const DEFAULT_PROJECT_ID = 'atelier-new-work';
export default function App() {
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorStage, setEditorStage] = useState<TaskStage>('up-next');
  const [query, setQuery] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<ProjectBoardId>(ALL_PROJECTS_ID);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>(emptyTaskFilters);
  const [announcement, setAnnouncement] = useState('');
  const returnFocus = useRef<string | null>(null);
  const editorTrigger = useRef<HTMLButtonElement | null>(null);
  const nextTaskNumber = useRef(0);
  const boardTasks = tasksForProject(tasks, activeProjectId);
  const filteredBoardTasks = filterTasks(boardTasks, filters, toISODate(new Date()));
  const selected = filteredBoardTasks.find(task => task.id === selectedId);
  useEffect(() => {
    if (editorOpen) return;
    if (returnFocus.current) {
      document.getElementById(`task-open-${returnFocus.current}`)?.focus();
      returnFocus.current = null;
      return;
    }
    if (editorTrigger.current) {
      editorTrigger.current.focus();
      editorTrigger.current = null;
    }
  }, [tasks, selectedId, editorOpen]);
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
  const openTaskEditor = (event: MouseEvent<HTMLButtonElement>, stage: TaskStage = 'up-next') => {
    editorTrigger.current = event.currentTarget;
    returnFocus.current = null;
    setSelectedId(null);
    setEditorStage(stage);
    setEditorOpen(true);
  };
  const createTask = (draft: ValidTaskDraft) => {
    const projectId = activeProjectId === ALL_PROJECTS_ID ? DEFAULT_PROJECT_ID : activeProjectId;
    const task: Task = { ...draft, id: `task-created-${++nextTaskNumber.current}`, projectId, labelId: 'planning', stage: editorStage };
    const hadSearch = query.trim().length > 0;
    editorTrigger.current = null;
    returnFocus.current = task.id;
    if (hadSearch) setQuery('');
    setTasks(items => [task, ...items]);
    setAnnouncement(`${task.title} created in ${TASK_STAGE_LABELS[editorStage]}${hadSearch ? '. Search cleared to show the new task.' : '.'}`);
    setEditorOpen(false);
  };
  const changeProject = (projectId: ProjectBoardId) => {
    setActiveProjectId(projectId);
    setSelectedId(null);
    const projectName = projectId === ALL_PROJECTS_ID ? 'All projects' : projects.find(project => project.id === projectId)?.name ?? 'Selected project';
    setAnnouncement(`Showing ${projectName}.`);
  };
  const editorProjectId = activeProjectId === ALL_PROJECTS_ID ? DEFAULT_PROJECT_ID : activeProjectId;
  const editorProjectName = projects.find(project => project.id === editorProjectId)?.name ?? 'Atelier / New work';
  const ownerOptions = [...new Set(tasks.map(task => task.ownerId))].sort();
  const activeFilterChips = [
    filters.ownerId ? { key: 'ownerId', label: `Owner: ${filters.ownerId}` } : null,
    filters.dueDate !== 'any' ? { key: 'dueDate', label: `Due: ${{ overdue: 'Overdue', 'next-seven-days': 'Next 7 days', later: 'Later' }[filters.dueDate]}` } : null,
    filters.priority ? { key: 'priority', label: `Priority: ${filters.priority}` } : null,
    filters.labelId ? { key: 'labelId', label: `Tag: ${labels.find(label => label.id === filters.labelId)?.name ?? 'Unknown'}` } : null,
  ].filter((chip): chip is { key: keyof TaskFilters; label: string } => chip !== null);
  const updateFilter = <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => {
    setFilters(current => ({ ...current, [key]: value }));
    setSelectedId(null);
    setAnnouncement('Board filters updated.');
  };
  const clearFilters = () => {
    setFilters(emptyTaskFilters);
    setSelectedId(null);
    setAnnouncement('All board filters cleared.');
  };
  return <div className={dark ? 'atelier-app night' : 'atelier-app'}>
    <aside className="atelier-sidebar"><div className="atelier-logo">a<span>.</span></div><button className="workspace-switch"><span className="workspace-dot">A</span><span>Atelier House<small>Studio workspace</small></span><FiChevronDown/></button><div className="side-label">WORKSPACE</div><nav><a className="side-active"><FiGrid/> Project desk <span>4</span></a><a><FiLayers/> Projects</a><a><FiCalendar/> Calendar</a><a><FiUsers/> People</a><a><FiArchive/> Archive</a></nav><div className="side-label teams-label">YOUR TEAMS</div><div className="team-row"><i className="team-color rose"/> Brand & Story <span>3</span></div><div className="team-row"><i className="team-color blue"/> Digital Product <span>2</span></div><div className="team-row"><i className="team-color olive"/> Editorial <span>1</span></div><div className="sidebar-bottom"><div className="user-card"><div className="user-avatar">AM</div><span>Alex Morgan<small>Creative director</small></span><FiMoreHorizontal/></div></div></aside>
    <main className="atelier-main"><header className="atelier-top"><div className="breadcrumb">Workspace <FiChevronDown/><b>Project desk</b></div><div className="atelier-top-actions"><div className="quick-search"><FiSearch/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a task..." aria-label="Find a task"/><kbd><FiCommand/> K</kbd></div><button className="atelier-icon" aria-label="Notifications"><FiBell/></button><button className="atelier-icon" aria-label="Toggle theme" onClick={()=>setDark(v=>!v)}>{dark?<FiSun/>:<FiMoon/>}</button></div></header>
      <section className="board-content"><div className="board-intro"><div><div className="board-kicker"><span/> SAMPLE WORKSPACE · THE WORK, WELL CONSIDERED</div><h1>Project desk</h1><p>A thoughtful view of what your studio is moving forward.</p></div><div className="board-intro-actions"><div className="face-stack"><i>AM</i><i>JL</i><i>SK</i><span>+2</span></div><button className="invite-button"><FiUsers/> Share desk</button><button className="add-button" onClick={event => openTaskEditor(event)}><FiPlus/> New task</button></div></div>
        <div className="board-toolbar"><div className="board-tabs"><button className="selected">Board <span>{filteredBoardTasks.length}</span></button><button>Timeline</button><button>Files</button></div><label className="project-switcher"><FiLayers aria-hidden="true"/><span>Project</span><select aria-label="Project board" value={activeProjectId} onChange={event => changeProject(event.target.value as ProjectBoardId)}><option value={ALL_PROJECTS_ID}>All projects</option>{projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label><div className="toolbar-actions"><button aria-expanded={filtersOpen} aria-controls="board-filter-panel" onClick={() => setFiltersOpen(open => !open)}><FiFilter/> Filter{activeFilterChips.length ? ` · ${activeFilterChips.length}` : ''}</button><button><FiActivity/> Activity</button><button className="toolbar-more"><FiMoreHorizontal/></button></div></div>
        {filtersOpen && <section className="board-filter-panel" id="board-filter-panel" aria-label="Board filters">
          <label>Owner<select aria-label="Filter by owner" value={filters.ownerId} onChange={event => updateFilter('ownerId', event.target.value)}><option value="">All owners</option>{ownerOptions.map(owner => <option key={owner} value={owner}>{owner}</option>)}</select></label>
          <label>Due date<select aria-label="Filter by due date" value={filters.dueDate} onChange={event => updateFilter('dueDate', event.target.value as DueDateFilter)}><option value="any">Any date</option><option value="overdue">Overdue</option><option value="next-seven-days">Next 7 days</option><option value="later">Later</option></select></label>
          <label>Priority<select aria-label="Filter by priority" value={filters.priority} onChange={event => updateFilter('priority', event.target.value as TaskFilters['priority'])}><option value="">All priorities</option>{TASK_PRIORITIES.map(priority => <option key={priority} value={priority}>{priority}</option>)}</select></label>
          <label>Tag<select aria-label="Filter by tag" value={filters.labelId} onChange={event => updateFilter('labelId', event.target.value)}><option value="">All tags</option>{labels.map(label => <option key={label.id} value={label.id}>{label.name}</option>)}</select></label>
        </section>}
        {activeFilterChips.length > 0 && <div className="active-filter-chips" aria-label="Active filters">{activeFilterChips.map(chip => <span className="filter-chip" key={chip.key}>{chip.label}<button type="button" aria-label={`Remove ${chip.label} filter`} onClick={() => updateFilter(chip.key, chip.key === 'dueDate' ? 'any' : '')}>×</button></span>)}<button type="button" className="clear-filters" onClick={clearFilters}>Clear all</button></div>}
        {editorOpen && <TaskEditor key={editorStage} owners={ownerOptions} stage={editorStage} projectName={editorProjectName} onCreate={createTask} onCancel={() => setEditorOpen(false)}/>}
        <p role="status" aria-live="polite">{announcement}</p>{selected && <TaskDetail task={selected} project={projects.find(item=>item.id===selected.projectId)?.name ?? 'Unknown project'} onMove={moveTask} onClose={()=>{returnFocus.current=selected.id;setSelectedId(null);}}/>}<div className="kanban-grid">{columns.map(col=><section className="kanban-column" key={col.id} onDragOver={e=>e.preventDefault()} onDrop={()=>move(col.id)}><div className="column-heading"><div><span className={'column-dot '+col.id}/><b>{col.title}</b><small>{filteredBoardTasks.filter(t=>t.stage===col.id).length}</small></div><button aria-label={'Add to '+col.title} onClick={event => openTaskEditor(event,col.id)}><FiPlus/></button></div><div className="task-list">{filteredBoardTasks.filter(t=>t.stage===col.id&&t.title.toLowerCase().includes(query.toLowerCase())).map(task=>{ const label = labels.find(item => item.id === task.labelId); const project = projects.find(item => item.id === task.projectId); const dueLabel = formatDueDate(task.dueDate); return <article key={task.id} className="task-card" draggable onDragEnd={()=>setDragId(null)} onDragStart={()=>setDragId(task.id)}><div className="task-top"><span className={'task-tag '+(label?.tone ?? 'cream')}>{label?.name ?? 'Unlabelled'}</span><button aria-label="More task options"><FiMoreHorizontal/></button></div><h2><button id={`task-open-${task.id}`} className="task-open" onClick={()=>setSelectedId(task.id)}>{task.title}</button></h2><div className="task-moves">{ALLOWED_STAGE_TRANSITIONS[task.stage].map(stage=><button key={stage} aria-label={`Move ${task.title} to ${TASK_STAGE_LABELS[stage]}`} onClick={()=>moveTask(task.id,stage,true)}>Move to {TASK_STAGE_LABELS[stage]}</button>)}</div><p className="task-project"><FiLayers/>{project?.name ?? 'Unknown project'}</p><div className="task-footer"><span className={task.dueDate<=toISODate(new Date())?'due urgent':'due'}><FiClock/>{dueLabel}</span><span className={'priority '+task.priority.toLowerCase()}>{task.priority}</span><i className="task-owner">{task.ownerId}</i></div></article>})}</div>{col.id==='up-next'&&<button className="add-card" onClick={event => openTaskEditor(event)}><FiPlus/> Add a task</button>}</section>)}</div>
        <footer className="board-footer"><span><i/> Sample board · local preview only</span><span>Task changes reset when you reload</span></footer>
      </section></main></div>;
}

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { initialTasks } from './data/boardFixtures';

afterEach(cleanup);

describe('Atelier task editor', () => {
  it('focuses the title and restores the opening control when cancelled', () => {
    render(<App />);
    const opener = screen.getByRole('button', { name: 'New task' });

    fireEvent.click(opener);

    expect(screen.getByRole('textbox', { name: 'Task title' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(opener).toHaveFocus();
  });

  it('shows field errors, focuses the first invalid field and adds no task', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'New task' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Review the highlighted fields');
    expect(screen.getByText('Add a task title.')).toBeInTheDocument();
    expect(screen.getByText('Choose a teammate.')).toBeInTheDocument();
    expect(screen.getByText('Choose a due date.')).toBeInTheDocument();
    expect(screen.getByText('Choose a priority.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Task title' })).toHaveFocus();
    expect(screen.getAllByRole('button', { name: /^Finalize spring campaign direction$/ })).toHaveLength(1);
  });

  it('creates a task with validated ownership and metadata, then focuses the new card', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Find a task' }), { target: { value: 'no matching task' } });
    fireEvent.click(screen.getByRole('button', { name: 'New task' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Task title' }), { target: { value: 'Draft a studio launch' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Owner' }), { target: { value: 'JL' } });
    fireEvent.change(screen.getByLabelText('Due date'), { target: { value: '2026-11-10' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Priority' }), { target: { value: 'Urgent' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    const title = screen.getByRole('button', { name: 'Draft a studio launch' });
    expect(title).toHaveFocus();
    const card = title.closest('article')!;
    expect(within(card).getByText('JL')).toBeInTheDocument();
    expect(within(card).getByText('Urgent')).toBeInTheDocument();

    fireEvent.click(title);
    const details = screen.getByRole('region', { name: 'Draft a studio launch' });
    expect(within(details).getByText('2026-11-10')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Draft a studio launch created in UP NEXT. Search cleared to show the new task.');
    expect(screen.getByRole('textbox', { name: 'Find a task' })).toHaveValue('');
    expect(initialTasks).toHaveLength(6);
  });

  it('creates work in the selected project and keeps it scoped when switching boards', () => {
    render(<App />);
    const projectBoard = screen.getByRole('combobox', { name: 'Project board' });
    fireEvent.change(projectBoard, { target: { value: 'aperture-product' } });
    fireEvent.click(screen.getByRole('button', { name: 'New task' }));
    expect(screen.getByText(/before it joins Aperture \/ Product/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Task title' }), { target: { value: 'Prototype a studio flow' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Owner' }), { target: { value: 'JL' } });
    fireEvent.change(screen.getByLabelText('Due date'), { target: { value: '2026-11-11' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Priority' }), { target: { value: 'Normal' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    expect(screen.getByRole('button', { name: 'Prototype a studio flow' })).toBeInTheDocument();
    fireEvent.change(projectBoard, { target: { value: 'northstar-brand' } });
    expect(screen.queryByRole('button', { name: 'Prototype a studio flow' })).not.toBeInTheDocument();
    fireEvent.change(projectBoard, { target: { value: 'aperture-product' } });
    expect(screen.getByRole('button', { name: 'Prototype a studio flow' })).toBeInTheDocument();
  });

  it('keeps a column quick-add in the stage that opened the editor', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to IN PROGRESS' }));

    expect(screen.getByText('NEW WORK · IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Task title' })).toHaveFocus();

    fireEvent.change(screen.getByRole('textbox', { name: 'Task title' }), { target: { value: 'Prepare a review handoff' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Owner' }), { target: { value: 'AM' } });
    fireEvent.change(screen.getByLabelText('Due date'), { target: { value: '2026-11-12' } });
    fireEvent.change(screen.getByRole('combobox', { name: 'Priority' }), { target: { value: 'Normal' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create task' }));

    const inProgress = screen.getByText('IN PROGRESS').closest('.kanban-column') as HTMLElement;
    expect(within(inProgress).getByRole('button', { name: 'Prepare a review handoff' })).toBeInTheDocument();
  });
});

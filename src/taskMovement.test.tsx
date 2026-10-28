import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { initialTasks } from './data/boardFixtures';

afterEach(cleanup);
describe('Atelier accessible handoffs', () => {
  it('moves one stage using a keyboard-operable button and returns focus to the task', () => {
    render(<App />);
    const task = initialTasks.find(item => item.stage === 'up-next')!;
    const button = screen.getByRole('button', { name: `Move ${task.title} to IN PROGRESS` });
    button.focus();
    fireEvent.click(button);
    expect(screen.getByRole('status')).toHaveTextContent(`${task.title} moved to IN PROGRESS`);
    expect(screen.getByRole('button', { name: task.title })).toHaveFocus();
    expect(screen.getByRole('button', { name: `Move ${task.title} to UP NEXT` })).toBeInTheDocument();
  });
  it('focuses detail, preserves metadata and restores the opener on Escape', () => {
    render(<App />);
    const task = initialTasks[0];
    fireEvent.click(screen.getByRole('button', { name: task.title }));
    const detail = screen.getByRole('region', { name: task.title });
    expect(within(detail).getByRole('heading')).toHaveFocus();
    expect(within(detail).getByText(task.dueDate)).toBeInTheDocument();
    expect(within(detail).getByText(task.ownerId)).toBeInTheDocument();
    fireEvent.keyDown(detail, { key: 'Escape' });
    expect(screen.queryByRole('region', { name: task.title })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: task.title })).toHaveFocus();
  });
  it('announces a rejected skipped-stage drop without changing the task', () => {
    render(<App />);
    const task = initialTasks.find(item => item.stage === 'up-next')!;
    const card = screen.getByRole('button', { name: task.title }).closest('article')!;
    fireEvent.dragStart(card);
    const complete = screen.getByText('COMPLETE').closest('section')!;
    fireEvent.drop(complete);
    expect(screen.getByRole('status')).toHaveTextContent('Move one stage at a time');
    expect(screen.getByRole('button', { name: `Move ${task.title} to IN PROGRESS` })).toBeInTheDocument();
  });
});

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
afterEach(cleanup);
describe('Atelier Project Desk', () => {
  it('renders a working studio board', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Project desk/i })).toBeInTheDocument();
    expect(screen.getByText(/sample workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/sample board · local preview only/i)).toBeInTheDocument();
    expect(screen.queryByText(/everything is in sync/i)).not.toBeInTheDocument();
  });

  it('switches project boards without leaking tasks or losing their stage changes', () => {
    render(<App />);
    const projectBoard = screen.getByRole('combobox', { name: 'Project board' });

    fireEvent.change(projectBoard, { target: { value: 'northstar-brand' } });
    expect(screen.getByRole('button', { name: 'Finalize spring campaign direction' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Map the onboarding journey' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Move Finalize spring campaign direction to IN PROGRESS' }));

    fireEvent.change(projectBoard, { target: { value: 'aperture-product' } });
    expect(screen.getByRole('button', { name: 'Map the onboarding journey' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Finalize spring campaign direction' })).not.toBeInTheDocument();

    fireEvent.change(projectBoard, { target: { value: 'northstar-brand' } });
    const inProgress = screen.getByText('IN PROGRESS').closest('.kanban-column') as HTMLElement;
    expect(within(inProgress).getByRole('button', { name: 'Finalize spring campaign direction' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Showing Northstar / Brand launch.');
  });
});

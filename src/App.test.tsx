import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Atelier Project Desk', () => {
  it('renders a working studio board', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Project desk/i })).toBeInTheDocument();
    expect(screen.getByText(/sample workspace/i)).toBeInTheDocument();
    expect(screen.getByText(/sample board · local preview only/i)).toBeInTheDocument();
    expect(screen.queryByText(/everything is in sync/i)).not.toBeInTheDocument();
  });
});

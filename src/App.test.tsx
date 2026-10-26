import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Atelier Project Desk', () => {
  it('renders a working studio board', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Project desk/i })).toBeInTheDocument();
  });
});

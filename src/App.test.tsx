import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('App shell', () => {
  it('renders the header and home route', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Form Builder')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });
});

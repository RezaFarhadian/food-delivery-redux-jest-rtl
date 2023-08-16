import React from 'react';
import { screen, waitFor, render as rtlRender } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from './app/testUtils';

describe('React Router', () => {
  test('navigates to home page', () => {
    render(<App />);

    expect(screen.getByTestId('banner-title')).toBeInTheDocument();
  });

  test('navigates to a page and bounce back home', async () => {
    render(<App />);

    const user = userEvent.setup();

    await user.click(screen.getByTestId('sustainability'));
    await waitFor(() => {
      expect(screen.getByAltText('refueling sustainable car')).toBeInTheDocument();
    });
    await user.click(screen.getByTestId('take-me-home'));
    await waitFor(() => {
      expect(screen.getByTestId('banner-title')).toBeInTheDocument();
    });
  });

  test('land on 404 when there is no match', () => {
    render(<App />, { route: '/bad/route' });

    expect(screen.getByText(/there is nothing to eat here./i)).toBeInTheDocument();
  });
});

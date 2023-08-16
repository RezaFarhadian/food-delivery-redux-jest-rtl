import { screen } from "@testing-library/react";
import Order from "./Order";
import { render } from './../../app/testUtils';

describe('<Order />', () => {
  test('only have two banners at viewport', () => {
    render(<Order />)
    expect(screen.queryAllByTestId('ordering-top-banner').length).toBe(2);
  });

  test('shows promotion banner instead of <AddressInput /> banner when address entered', () => {
    render(<Order />, { preloadedState: {
      customer: {
        authorized: true,
        email: 'test',
        token: 'test',
        message: 'test',
        address: 'test'
      }
    }});
    expect(screen.queryAllByTestId('ordering-top-banner').length).toBe(2);
    expect(screen.getByText(/Grab your newcomer meal/i)).toBeInTheDocument();
  });
});

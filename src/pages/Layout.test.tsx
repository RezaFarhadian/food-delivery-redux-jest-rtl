import { fireEvent, screen } from '@testing-library/react'
import Layout from './Layout'
import { render } from './../app/testUtils';
import AddressInput from '../components/AddressInput/AddressInput';
import { mockFood } from '../components/FoodItem/FoodItem.test';

describe('<AppBar>', () => {
  test('right cart mass length', () => {
    render(<Layout />, { preloadedState: {
      customer: {
        authorized: true,
        email: 'test',
        token: 'test',
        message: 'test',
        address: 'test'
      }
    }});

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('shows sign in button for logged out customers', () => {
    render(<Layout />);
    
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('constrain sign in <Button> to hide', () => {
    render(<Layout />, { preloadedState: {
      customer: {
        authorized: true,
        email: 'test',
        token: 'test',
        message: 'test',
        address: 'test'
      }
    }});

    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  test('focus on <AddressInput /> when user click on `Your Address`', () => {
    render(<><Layout /><AddressInput /></>, { preloadedState: {
      customer: {
        authorized: true,
        email: 'test',
        token: 'test',
        message: 'test',
        address: ''
      }
    }});

    fireEvent.click(screen.getByTestId('top-your-address'));

    expect(screen.getByTestId('address-input')).toHaveFocus();
  });
});

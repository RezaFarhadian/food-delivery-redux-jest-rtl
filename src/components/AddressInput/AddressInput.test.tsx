import { render, screen, fireEvent } from '@testing-library/react';
import AddressInput from './AddressInput'

describe('<AddressInput />', () => {
  test('renders input', () => {
    render(<AddressInput />);
    expect(screen.getByTestId('address-input')).toBeInTheDocument()
  });

  test('dispatches on KeyboardEvent', () => {
    render(<AddressInput onKeyDown={(e, ref) => {
      if (e.key === 'Enter' && ref.current) ref.current.placeholder = 'you pressed Enter!';
    }}/>);

    fireEvent.keyDown(
      screen.getByTestId('address-input'),
      {
        key: 'Enter'
      }
    );
  
    expect(screen.getByPlaceholderText(/you pressed Enter!/i)).toBeInTheDocument()
  });

  test('simulate above event trigger for <IconButton />', () => {
    render(<AddressInput onKeyDown={(e, ref) => {
      if (e.key === 'Enter' && ref.current) ref.current.placeholder = 'you clicked submit!';
    }}/>);

    fireEvent.click(screen.getByTestId('submit-address'));
  
    expect(screen.getByPlaceholderText(/you clicked submit!/i)).toBeInTheDocument()
  });
});

import { screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './SignIn';
import { render } from '../../app/testUtils';
import { mockLogin } from '../../app/jestFetchMock';
import userEvent from '@testing-library/user-event';
import App from '../../App';

let windowFetchSpy: any;

beforeEach(() => {
  windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockLogin as typeof window.fetch);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('<SignIn /> (including accessibility exceptions)', () => {
  test('accessible behaviour is consistent on KeyDown `enter`', async () => {
    render(<SignIn />);

    const user = userEvent.setup();

    // KeyboardEvent.keyCode is deprecated.
    // fallback to fireEvent
    // await user.keyboard('{Enter}');

    await fireEvent.keyDown(
      screen.getByTestId('email-input'),
      {
        key: 'Enter'
      }
    );

    await waitFor(() => {
      expect(windowFetchSpy).toHaveBeenCalled();
      expect(screen.getByTestId('message')).toBeInTheDocument();
    });
  });

  test('hide password visibility on mounting', () => {
    render(<SignIn />);
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  test('expose password onClick event', () => {
    render(<SignIn />);
    fireEvent.click(screen.getByTestId('toggle-password-visibility'));
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'text');
  });

  test('redirects to <Order /> after valid credentials entry', async () => {
    render(<App redirectTo={<SignIn />} />);
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText('email-input');
    const passwordInput = screen.getByLabelText('password-input');
    const signinButton = screen.getByTestId('signin-btn');
    await fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' }});
    await fireEvent.change(passwordInput, { target: { value: 'cityslicka' }});
    await user.click(signinButton);
    await waitFor(() => {
      expect(windowFetchSpy).toHaveBeenCalled();
      expect(screen.getByTestId('ordering-app')).toBeInTheDocument();
    });
  });

  test('stays still at itself due to wrong credentials entry', async () => {
    render(<App redirectTo={<SignIn />} />);
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText('email-input');
    const passwordInput = screen.getByLabelText('password-input');
    const signinButton = screen.getByTestId('signin-btn');
    await fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in1234' }});
    await fireEvent.change(passwordInput, { target: { value: 'cityslick1234a' }});
    await user.click(signinButton);
    await waitFor(() => {
      expect(windowFetchSpy).toHaveBeenCalled();
      expect(screen.getByTestId('message')).toBeInTheDocument();
      expect(screen.getByText('Start Ordering 😋')).toBeInTheDocument();
    });
  });

  test('redirects to <Order /> if user already signed in', () => {
    render(<App redirectTo={<SignIn />} />, {
      preloadedState: {
        customer: {
          authorized: true,
          email: 'test',
          token: 'test',
          message: 'test',
          address: 'test'
        }
      }
    });

    expect(screen.getByTestId('ordering-app')).toBeInTheDocument();
  });
});

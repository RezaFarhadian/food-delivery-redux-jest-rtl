import { screen, waitFor } from "@testing-library/react";
import { render } from "./testUtils";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe('<PrivateRoutes />', () => {
  test('redirects unauthorized users to <SignIn />', async () => {
    render(<App />, {
      preloadedState: {
        customer: {
          authorized: false,
          email: '',
          token: '',
          message: '',
          address: ''
        }
      }
    });

    const user = userEvent.setup();
    await user.click(screen.getByTestId('go-to-app'));

    await waitFor(() => {
      expect(screen.getByText(/Start Ordering 😋/i)).toBeInTheDocument();
    });
  });
});

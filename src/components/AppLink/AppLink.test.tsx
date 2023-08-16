import AppLink from "./AppLink";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './../../App';
import { render } from "../../app/testUtils";

describe('<AppLink />', () => {
  test('routes onClick dispatch', async () => {
    render(
      <>
        <App/>
        <AppLink href='/sustainability' testid='solo-sustainability'/>
      </>
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('solo-sustainability'));
    await waitFor(() => {
      expect(screen.getByAltText('refueling sustainable car')).toBeInTheDocument();
    });
  });
});

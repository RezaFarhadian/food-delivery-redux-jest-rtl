import { render } from '../../app/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import Diner from './Diner';

beforeAll(() => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: 'mock-diner'
    }),
    useRouteMatch: () => ({ url: '/order/mock-diner' }),
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('<Diner />', () => {
  test('like the diner', () => {
    render(<Diner />, {
      preloadedState: {
        favourites: []
      }
    });
    fireEvent.click(screen.getByTestId('like-btn'));
    expect(screen.getByTestId('like-icon')).toHaveStyle('color: red');
  });

  test('Correct UI when no menu entered by merchant', () => {
    render(<Diner />);
    expect(screen.getByTestId('no-menu-entered')).toBeInTheDocument();
  });
});

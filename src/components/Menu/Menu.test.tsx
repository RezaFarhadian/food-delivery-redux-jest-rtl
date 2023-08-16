import { render } from "../../app/testUtils";
import { fireEvent, screen } from "@testing-library/react";
import Menu from "./Menu";

describe('<Menu />', () => {
  test('renders correct <Tab /> according to state', () => {
    render(<Menu dinerId='decoto-road-mcdonalds' />);

    expect(screen.queryAllByTestId('tab').length).toBe(3);
  });

  test('navigates through <Tab />', () => {
    render(<Menu dinerId='decoto-road-mcdonalds' />);

    expect(screen.getByTestId('McChicken')).toBeInTheDocument();

    fireEvent.click(screen.queryAllByTestId('tab')[1]);

    expect(screen.getByTestId('Beverage Item #2')).toBeInTheDocument();
  });

  test('parents accurate <FootItem />`s', () => {
    render(<Menu dinerId='decoto-road-mcdonalds' />);
    
    expect(screen.queryAllByTitle('food').length).toBe(3);
  });

  test('Opens <VisitingFood /> Modal `onClick`ing', () => {
    render(<Menu dinerId='decoto-road-mcdonalds' />);

    fireEvent.click(screen.getByTestId('McChicken'));

    expect(screen.getByTestId('modal-wrapper')).toBeInTheDocument();
  });
});

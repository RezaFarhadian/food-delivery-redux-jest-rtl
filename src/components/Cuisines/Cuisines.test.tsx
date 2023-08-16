import { render } from "../../app/testUtils";
import { screen } from "@testing-library/react";
import Cuisines from "./Cuisines";
import { CuisinesList } from "../../app/CuisinesList";

describe('<Cuisines />', () => {
  test('holds 10 cuisine', () => {
    render(<Cuisines />);
    
    expect(screen.queryAllByTestId('single-cuisine').length).toBe(10);
  });

  test('shows empty plate when theres no cuisines', () => {
    render(<Cuisines />, {
      preloadedState: {
        diners: {
          selected: [],
          index: [],
          filteredBy: CuisinesList.Burger
        }
      }
    });

    expect(screen.getByAltText('no fastfoods')).toBeInTheDocument();
  });

  test('render two <DinerCard />', () => {
    render(<Cuisines />);

    expect(screen.queryAllByTestId('dinercard').length).toBe(2);
  });
});

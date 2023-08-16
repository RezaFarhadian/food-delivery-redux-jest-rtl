import { render } from "../../app/testUtils";
import { screen } from "@testing-library/react";
import Cart from "./Cart";

describe('<Cart />', () => {
  test('Empty Cart', () => {
    render(<Cart />);

    expect(screen.getByAltText('no food on table')).toBeInTheDocument();
  });
});

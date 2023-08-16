import { render } from "../../app/testUtils";
import { fireEvent, getByTestId, screen, within } from "@testing-library/react";
import VisitingFood from "./VisitingFood";
import { mockFood } from "../FoodItem/FoodItem.test";

const VisitingFoodComponent = <VisitingFood
  open={true}
  onClose={() => {}}
  food={mockFood}
/>;

const withPreloadedState = {
  preloadedState: {
    prepare: {
      unitCost: 3.62,
      iclusiveAmount: 3.62,
      quantity: 1,
      options: {}
    }
  }
};

describe('<VisitingFood /> (opened)', () => {
  test('Title, Calories and Picture<img />', () => {
    render(VisitingFoodComponent);

    expect(screen.getAllByText('French Fries').length).toBeGreaterThan(1);
    expect(screen.getByText('480 cal')).toBeInTheDocument();
    expect(screen.getByAltText('French Fries $3.62')).toBeInTheDocument();
  });

  describe('Options corresponded to capacity', () => {
    test('renders all options in state', () => {
      render(VisitingFoodComponent, withPreloadedState);

      expect(screen.queryAllByTestId('child-checkbox').length).toBe(2);
    });

    test('Add, remove', () => {
      render(VisitingFoodComponent, withPreloadedState);

      fireEvent.click(screen.getByText('Add Ketchup Packet'));

      expect(screen.getByText(/5.62/)).toBeInTheDocument();

      fireEvent.click(screen.getByText('Add Ketchup Packet'));

      expect(screen.getByText(/3.62/)).toBeInTheDocument();
    });
  });

  describe('Action Bar Controls', () => {
    test('Single purchase with no additions', () => {
      render(VisitingFoodComponent, withPreloadedState);

      expect(screen.getByText(/3.62/)).toBeInTheDocument();
    });

    test('Decrease`s <IconButton /> [disabled] on single purchase', () => {
      render(VisitingFoodComponent, withPreloadedState);

      expect(screen.getByTestId('one-less')).toBeDisabled();
    });

    test('Increase then decrease costs', () => {
      render(VisitingFoodComponent, withPreloadedState);

      fireEvent.click(screen.getByTestId('one-more'));

      expect(screen.getByText(/7.24/)).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('one-less'));

      expect(screen.getByText(/3.62/)).toBeInTheDocument();
    });
  });
});

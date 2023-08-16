import { render } from "../../app/testUtils";
import { screen } from "@testing-library/react";
import FoodItem from "./FoodItem";
import { Food, OptionCapacity } from "../../features/menus/menusSlice";

export const mockFood: Food = {
  name: 'French Fries',
  estimatedCalories: 480,
  earlyCost: 3.62,
  options: [{
    label: 'Select Size',
    capacity: OptionCapacity.Single,
    items: [{
      name: 'Small',
      caloriesVolume: 230,
      chargeBy: 0
    }, {
      name: 'Medium',
      caloriesVolume: 320,
      chargeBy: 1.43
    }, {
      name: 'Large',
      caloriesVolume: 480,
      chargeBy: 2.21
    }]
  }, {
    label: 'Remove from French Fries',
    capacity: OptionCapacity.Collective,
    items: [{
      name: 'No Salt',
      caloriesVolume: 0,
      chargeBy: 0
    }]
  }, {
    label: 'Extra for French Fires',
    capacity: OptionCapacity.Collective,
    items: [{
      name: 'Add Ketchup Packet',
      caloriesVolume: 10,
      chargeBy: 2.00
    }]
  }],
  smallPictureUri: '/assets/images/menus/french_fries_small.avif',
  mediumPictureUri: '/assets/images/menus/french_fries_medium.avif',
  featureCaption: '#1 Top Seller'
};

describe('<FoodItem />', () => {
  test('Renders Name, Picture, Price and additional notes.', () => {
    render(<FoodItem food={mockFood} onClick={() => {}} />);

    expect(screen.getByText('French Fries')).toBeInTheDocument();
    expect(screen.getByText('$3.62')).toBeInTheDocument();
    expect(screen.getByText('#1 Top Seller')).toBeInTheDocument();
    expect(screen.getByAltText('French Fries')).toBeInTheDocument();
  });
});

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export enum OptionCapacity { 
  Collective,
  Single
};

export type OptionBasis = {
  label: string
  capacity: OptionCapacity
  items: {
    name: string
    caloriesVolume: number,
    chargeBy: number
  }[]
};

export type Food = {
  name: string
  estimatedCalories: number
  earlyCost: number
  options: OptionBasis[]
  smallPictureUri?: string
  mediumPictureUri?: string
  featureCaption?: string
  previousCost?: number
};

export type MenusState = {
  byId: {
    [id: string]: {
      byGrouping: {
        [grouping: string]: Food[]
      }
    }
  }
};

const initialState: MenusState = { byId: { 'decoto-road-mcdonalds': { byGrouping: { 'Popular Items': [{ name: 'French Fries', estimatedCalories: 480, earlyCost: 3.62, options: [{ label: 'Select Size', capacity: OptionCapacity.Single, items: [{ name: 'Small', caloriesVolume: 230, chargeBy: 0 }, { name: 'Medium', caloriesVolume: 320, chargeBy: 1.43 }, { name: 'Large', caloriesVolume: 480, chargeBy: 2.21 }] }, { label: 'Remove from French Fries', capacity: OptionCapacity.Collective, items: [{ name: 'No Salt', caloriesVolume: 0, chargeBy: 0 }] }, { label: 'Extra for French Fires', capacity: OptionCapacity.Collective, items: [{ name: 'Add Ketchup Packet', caloriesVolume: 10, chargeBy: 0 }] }], smallPictureUri: '/assets/images/menus/french_fries_small.avif', mediumPictureUri: '/assets/images/menus/french_fries_medium.avif', featureCaption: '#1 Top Seller' }, { name: 'McChicken', estimatedCalories: 400, earlyCost: 4.40, options: [{ label: 'Remove from McChicken', capacity: OptionCapacity.Collective, items: [{ name: 'No Shredded Lettuce', caloriesVolume: 0, chargeBy: 0 }, { name: 'No Mayonnaise', caloriesVolume: 70, chargeBy: 0 }, { name: 'No McChicken Patty', caloriesVolume: 150, chargeBy: 0 }, { name: 'No Regular Bun', caloriesVolume: 150, chargeBy: 0 }] }, { label: 'Extra for McChicken', capacity: OptionCapacity.Collective, items: [{ name: 'Extra Shredded Lettuce', caloriesVolume: 0, chargeBy: 0.33 }, { name: 'Extra Mayonnaise', caloriesVolume: 70, chargeBy: 0.30 }, { name: 'Add 2 Half Strips Bacon', caloriesVolume: 70, chargeBy: 2.05 }, { name: 'Add American Cheese', caloriesVolume: 50, chargeBy: 0.30 }, { name: 'Add Pickle', caloriesVolume: 0, chargeBy: 0 }, { name: 'Add Mustard', caloriesVolume: 5, chargeBy: 0 }, { name: 'Add Ketchup', caloriesVolume: 20, chargeBy: 0 }] }], smallPictureUri: '/assets/images/menus/mcchicken_small.avif', mediumPictureUri: '/assets/images/menus/mcchicken_medium.avif', previousCost: 5.01 }, { name: 'McDouble', estimatedCalories: 400, earlyCost: 4.27, options: [{ label: 'Remove from McDouble', capacity: OptionCapacity.Collective, items: [{ name: 'No Mustard', caloriesVolume: 5, chargeBy: 0 }, { name: 'No Ketchup', caloriesVolume: 20, chargeBy: 0 }, { name: 'No Diced Onions', caloriesVolume: 5, chargeBy: 0 }, { name: 'No Pickle', caloriesVolume: 0, chargeBy: 0 }, { name: 'No American Cheese', caloriesVolume: 50, chargeBy: 0 }, { name: 'No Meat', caloriesVolume: 180, chargeBy: 0 }, { name: 'No Salt', caloriesVolume: 0, chargeBy: 0 }, { name: 'No Regular Bun', caloriesVolume: 150, chargeBy: 0 }] }, { label: 'Extra for McDouble', capacity: OptionCapacity.Collective, items: [{ name: 'Extra Mustard', caloriesVolume: 5, chargeBy: 0 }, { name: 'Extra Ketchup', caloriesVolume: 20, chargeBy: 0 }, { name: 'Extra Diced Onions', caloriesVolume: 5, chargeBy: 0 }, { name: 'Extra Pickle', caloriesVolume: 0, chargeBy: 0 }, { name: 'Extra American Cheese', caloriesVolume: 50, chargeBy: 0.30 }, { name: 'Extra Meat', caloriesVolume: 180, chargeBy: 1.29 }, { name: 'Extra Salt', caloriesVolume: 0, chargeBy: 0 }, { name: 'Add 2 Half Strips Bacon', caloriesVolume: 70, chargeBy: 2.05 }, { name: 'Add Shredded Lettuce', caloriesVolume: 0, chargeBy: 0.33 }, { name: 'Add Mayonnaise', caloriesVolume: 70, chargeBy: 0.30 }] }], smallPictureUri: '/assets/images/menus/mcdouble_small.avif', mediumPictureUri: '/assets/images/menus/mcdouble_medium.avif' }], 'Beverages': [{ name: 'Beverage Item #1', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Beverage Item #2', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Beverage Item #3', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Beverage Item #4', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Beverage Item #5', estimatedCalories: 400, earlyCost: 5.99, options: [], }], 'Condiments': [{ name: 'Condiment Item #1', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Condiment Item #2', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Condiment Item #3', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Condiment Item #4', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Condiment Item #5', estimatedCalories: 400, earlyCost: 5.99, options: [], }, { name: 'Condiment Item #6', estimatedCalories: 400, earlyCost: 5.99, options: [], }] } } } };

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {}
});

export const getMenuById = (id: string) => (state: RootState) => state.menus.byId[id];

export default menusSlice.reducer;

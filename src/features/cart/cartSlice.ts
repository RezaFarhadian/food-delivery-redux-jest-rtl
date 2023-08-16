import { EntityAdapter, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Food } from "../menus/menusSlice";
import { RootState } from "../../app/store";

export type ExtendedFood = Food & {
  id: string,
  addedOn: string,
  cost: number,
  preferences?: string,
  quantity: number
};

const cartAdapter: EntityAdapter<ExtendedFood> = createEntityAdapter<ExtendedFood>({
  sortComparer: (a, b) => b.addedOn.localeCompare(a.addedOn)
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    expandCart: cartAdapter.addOne,
    easeCart: cartAdapter.removeOne
  }
});

export const {
  expandCart,
  easeCart
} = cartSlice.actions;

const cartSelectors = cartAdapter.getSelectors<RootState>(
  state => state.cart
);

export const allCartItems = (state: RootState) => cartSelectors.selectAll(state);

export default cartSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Checkout = {
  total: number;
};

const initialState: Checkout = {
  total: 0
};

const checkout = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setTotalFee: (state, action: PayloadAction<number>) => {
      state.total = Number(action.payload.toFixed(2));
    }
  }
});

export const {
  setTotalFee
} = checkout.actions;

export const totalFee = (state: RootState) => state.checkout.total;

export default checkout.reducer;

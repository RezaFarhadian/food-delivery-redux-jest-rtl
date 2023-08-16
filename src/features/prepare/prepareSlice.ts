import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PrepareState {
  unitCost: number,
  iclusiveAmount: number,
  quantity: number,
  options: {
    [option: string]: boolean
  }
};

const initialState: PrepareState = {
  unitCost: 0,
  iclusiveAmount: 0,
  quantity: 0,
  options: {}
};

const prepareSlice = createSlice({
  name: 'prepare',
  initialState,
  reducers: {
    tag: (state, action: PayloadAction<number>) => {
      state.unitCost = action.payload;
      state.iclusiveAmount = action.payload;
      state.quantity = 1;
      state.options = {};
    },

    changeOption: (state, action: PayloadAction<{
      name: string,
      value: boolean
    }>) => {
      state.options[action.payload.name] = action.payload.value;
    },

    increment: (state, action: PayloadAction<number>) => {
      state.unitCost += action.payload;
      state.iclusiveAmount += action.payload;
    },

    dropBy: (state, action: PayloadAction<number>) => {
      state.unitCost -= action.payload;
      state.iclusiveAmount -= action.payload;
    },

    addAnother: (state) => {
      state.quantity += 1;
      state.iclusiveAmount = state.unitCost * state.quantity;
    },

    diminish: (state) => {
      state.iclusiveAmount = (state.unitCost * state.quantity) - state.unitCost;
      state.quantity -= 1
    }
  }
});

export const {
  tag,
  changeOption,
  increment,
  dropBy,
  addAnother,
  diminish
} = prepareSlice.actions;

export const getCost = (state: RootState) => state.prepare.iclusiveAmount.toFixed(2);
export const getQuantity = (state: RootState) => state.prepare.quantity;
export const getCheckedOptions = (state: RootState) =>
  Object.keys(state.prepare.options).filter(name =>
    state.prepare.options[name]
  )

export default prepareSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type FavouritesSlice = string[];
const initialState: FavouritesSlice = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    like: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.includes(id)) {
        return state.filter(i => i !== id);
      } else {
        state.push(action.payload);
      }
    }
  }
});

export const { like } = favouritesSlice.actions;

export const isLiked = (id: string) =>
  (state: RootState) =>
    state.favourites.includes(id);

export default favouritesSlice.reducer;

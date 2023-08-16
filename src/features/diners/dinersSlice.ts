import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CuisinesList } from "../../app/CuisinesList";
import { RootState, Selector } from "../../app/store";

interface Franchise {
  id: string;
  address: string;
  currency: string;
  title: string;
  headerUri: string;
  pictureUri: string;
  cuisines: CuisinesList[];
};

interface DinersState {
  filteredBy: CuisinesList;
  selected: string[];
  index: Franchise[];
};

const initialState: DinersState = {
  filteredBy: CuisinesList.Burger,
  selected: ['decoto-road-mcdonalds', 'mowry-avenue-dennys'],
  index: [{
    id: 'decoto-road-mcdonalds',
    address: '3990 Decoto Road, Fremont, CA',
    currency: '$',
    title: `McDonald's`,
    headerUri: '/assets/images/mcdonalds_header.avif',
    pictureUri: '/assets/images/mcdonalds_picture.avif',
    cuisines: [CuisinesList.Burger]
  }, {
    id: 'mowry-avenue-dennys',
    address: '5280 Mowry Avenue, Fremont, CA',
    currency: '$',
    title: `Denny's`,
    headerUri: '/assets/images/dennys_header.avif',
    pictureUri: '/assets/images/dennys_picture.avif',
    cuisines: [CuisinesList.Burger]
  }]
};

export const dinersSlice = createSlice({
  name: 'diners',
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<CuisinesList>) => {
      const filteredBy = action.payload;
      return {
        ...state,
        filteredBy,
        selected: state.index
          .filter(franchise => franchise.cuisines.includes(filteredBy))
          .map(franchise => franchise.id)
      };
    }
  }
});

export const { filter } = dinersSlice.actions;

export const selectDinerById = (id: string) =>
  (state: RootState) =>
    state.diners.index.find((diner: Franchise) =>
      diner.id === id
    );

export const lookupFilteredDiners: Selector<(Franchise | undefined)[]> = (state: RootState) =>
  state.diners.selected.map(
    id =>
      state.diners.index.find(
        diner => diner.id === id
      )
  );

export default dinersSlice.reducer;

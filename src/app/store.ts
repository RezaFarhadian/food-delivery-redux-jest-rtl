import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customer/customerSlice';
import dinersReducer from '../features/diners/dinersSlice';
import favouritesReducer from '../features/favourites/favouritesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import menusReducer from '../features/menus/menusSlice';
import prepareReducer from '../features/prepare/prepareSlice';
import cartReducer from '../features/cart/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';

const rootReducer = combineReducers({
  customer: customerReducer,
  diners: dinersReducer,
  favourites: favouritesReducer,
  reviews: reviewsReducer,
  menus: menusReducer,
  prepare: prepareReducer,
  cart: cartReducer,
  checkout: checkoutReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type Selector<S> = (state: RootState) => S;

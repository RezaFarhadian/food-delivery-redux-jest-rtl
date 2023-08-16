import { BrowserRouter, MemoryRouter } from "react-router-dom";
import type { RenderOptions} from '@testing-library/react'
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "./store";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
};

interface WrapperProps {
  children?: React.ReactNode;
}

export const render = (
  ui: React.ReactElement,
  {
    route = '/',
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  window.history.pushState({}, 'Test page', route);
  const Wrapper = ({ children }: WrapperProps) => {
    return(
      <MemoryRouter initialEntries={[ route ]}>
        <Provider store={store}>
          { children }
        </Provider>
      </MemoryRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

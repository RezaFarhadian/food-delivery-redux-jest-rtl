import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound';
import SignIn from './pages/signin/SignIn';
import Sustainability from './pages/sustainability/Sustainability';
import Order from './pages/order/Order'
import PrivateRoutes from './app/PrivateRoutes';
import { useAppSelector } from './app/hooks';
import { selectAuthorized } from './features/customer/customerSlice';
import Cuisines from './components/Cuisines/Cuisines';
import Diner from './pages/diner/Diner';

interface AppProps {
  redirectTo?: JSX.Element;
};

function App(props: AppProps) {
  const authorized = useAppSelector(selectAuthorized);

  return (<>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={props.redirectTo ? props.redirectTo : <Home />} />
        <Route path='signin' element={<SignIn />}/>
        <Route path='sustainability' element={<Sustainability />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<PrivateRoutes authorized={authorized} />}>
          <Route path='order' element={<Order />}>
            <Route index element={<Cuisines />} />
            <Route path=':id' element={<Diner />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </>);
}

export default App;

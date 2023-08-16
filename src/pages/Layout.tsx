import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Chip
} from '@mui/material'
import { Outlet } from 'react-router-dom';
import { ReactComponent as AppLogo } from './../logo.svg';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppLink from './../components/AppLink/AppLink';
import { useAppSelector } from '../app/hooks';
import { selectAddress, selectAuthorized } from '../features/customer/customerSlice';
import Cart from '../components/Cart/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { allCartItems } from '../features/cart/cartSlice';

function Layout() {
  const isAuthorized = useAppSelector(selectAuthorized);
  const address = useAppSelector(selectAddress);
  const cartMass = useAppSelector(allCartItems).length;

  let AppBarSx: any = {};
  if (isAuthorized) {
    AppBarSx['width'] = `calc(100% - 400px)`;
    AppBarSx['mr'] = `400px`;
  }

  return (
    <>
      {isAuthorized && <Cart />}
      
      <AppBar
        position={isAuthorized ? 'fixed' : 'relative'}
        sx={AppBarSx}
      >
        <Toolbar sx={{ gap: 1 }}>
          <AppLogo style={{ width: 60 }} />
          <Typography color='primary' variant='h5' sx={{ flexGrow: isAuthorized ? 0.1 : 1, fontFamily: 'Courgette' }}>
            {isAuthorized ? 'Food Delivery' :
              <AppLink href='/' underline='none' testid='take-me-home'>
                Food Delivery
              </AppLink>
            }
          </Typography>
          {!isAuthorized ?
            <Button variant='contained' data-testid='login-top-btn' startIcon={<LoginOutlinedIcon />}>
              <AppLink href='signin' underline='none' color='inherit'>
                Sign In
              </AppLink>
            </Button> : <>
            <Typography data-testid='top-your-address' variant='subtitle2' sx={{
              flexGrow: 1,
              ml: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'end',
              cursor: 'pointer',
              color: '#000'
            }} onClick={() => address === '' ? document.getElementById('address-input')!.focus() : false }>
              <b style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100px'
              }}>{address !== '' ? address : 'Your Address'}</b>
              <ArrowDropDownIcon/>
            </Typography>
            <Chip
              label='✨ Get 30% discount on newcomer order!'
              size='medium'
              color='primary'
              onClick={() => {}}
            />
            <Chip
              label={cartMass}
              size='medium'
              sx={{ p: 2, cursor: 'pointer', fontWeight: 'bold' }}
              variant='filled'
              icon={<ShoppingCartIcon />}
              onClick={() => {}}
            /></>
          }
        </Toolbar>
      </AppBar>
      
      <Outlet />
    </>
  );
}

export default Layout;

import { Box, Container, Typography } from "@mui/material";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import AddressInput from "../../components/AddressInput/AddressInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAddress, setAddress } from "../../features/customer/customerSlice";
import Banner from '../../components/Banner/Banner';
import { ReactComponent as ShoppingAppSvg } from './images/shopping_app.svg';
import { Outlet } from "react-router-dom";
import Nuggets from './images/nuggets.png';

function Order() {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectAddress);

  return(
    <Container data-testid='ordering-app' sx={{
      ml: 2,
      mt: 12,
      width: '1000px',
      position: 'absolute',
      left: -35
    }}>
      <Container sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {address === '' ?
          <Banner sx={{ backgroundColor: 'rgb(254, 241, 238)' }} data-testid='ordering-top-banner'>
            <DeliveryDiningOutlinedIcon sx={{ fontSize: '30px' }} />
            <Typography variant='h6' gutterBottom>
              <b>Food on your sight</b>
            </Typography>
            <Typography variant='subtitle2'>
              <b>Get it delivered to your door</b>
            </Typography> <br />
            <AddressInput placeholder={'Enter delivery address...'} onKeyDown={(e, ref) => {
              if (e.key === 'Enter') {
                dispatch(
                  setAddress(
                    ref.current?.value!
                  )
                )
              }
            }}/>
          </Banner> :
          <Banner data-testid='ordering-top-banner' sx={{
            backgroundColor: '#42a5f5',
            color: '#fff',
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            alignItems: 'center'
          }}>
            <ShoppingAppSvg />
            <Box>
              <Typography variant='h5' gutterBottom>
                <b>Grab Your Newcomer Meal!</b>
              </Typography>
              <Typography variant='subtitle1'>
                You'r First Order Drops 30% of It's Expenses.
              </Typography>
            </Box>
          </Banner>
        }
        <Banner sx={{
          backgroundColor: '#FFC72C',
          color: '#fff',
          backgroundImage: `url(${Nuggets})`,
          backgroundSize: '55%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '200px 90px'
        }} data-testid='ordering-top-banner'>
          <Typography variant='h5' sx={{ textShadow: '2px 2px #d32f2f' }} gutterBottom>
            <b>
              🏷️ Free 10 piece McNuggets on $15+ at McDonald’s. Now - 4/23
            </b>
          </Typography>
          <Typography variant='body1'>
            code: <u>NUmNUM</u>
          </Typography>
        </Banner>
      </Container>
      <br />
      <Container sx={{ pb: 20 }}>
        <Outlet />
      </Container>
    </Container>
  );
}

export default Order;

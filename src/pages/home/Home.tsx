import { Box, Chip, Container, Paper, Typography, Button } from "@mui/material";
import Banner from './images/banner.webp';
import AddressInput from "../../components/AddressInput/AddressInput";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import { ReactComponent as DiscountIllustration } from "./images/discount_illustration.svg";
import { ReactComponent as EnviromentIllustraton } from "./images/environment_illustration.svg";
import { ReactComponent as MobileIllustration } from "./images/mobile_illustration.svg";
import FirstBlob from "./images/blob.svg";
import SecondBlob from "./images/blob1.svg";
import ThirdBlob from "./images/blob2.svg";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableOne from './images/table1.webp';
import TableTwo from './images/table2.webp';
import { useNavigate } from "react-router-dom";
import AppLink from "../../components/AppLink/AppLink";
import { setAddress } from "../../features/customer/customerSlice";
import { useAppDispatch } from "../../app/hooks";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  return (
    <Container maxWidth='xl' disableGutters>
      <Box sx={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: 'cover',
        pt: 15,
        pb: 15,
      }}>
        <Paper sx={{
          width: '60vw',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 6,
          backgroundColor: theme => theme.palette.lightPink
        }}>
          <Typography sx={{ textAlign: 'center' }} component='div'>
            <Typography variant='h4' sx={{ fontWeight: 'bold' }} data-testid='banner-title' gutterBottom>
              Your favourite meals at doorstep.
            </Typography>
            <Typography variant='h4'>
              First delivery fee is
              <Typography component='span' variant='inherit' color='primary'>
              &nbsp;<b>$0</b>
              </Typography> 
              , it's on us!
            </Typography>
          </Typography>

          <AddressInput placeholder={'Enter delivery address...'} onKeyDown={(e, ref) => {
            if (e.key === 'Enter') {
              dispatch(
                setAddress(
                  ref.current?.value!
                )
              )
              navigate('signin');
            }
          }}/>

          <Chip
            icon={<DiscountOutlinedIcon />}
            size='medium'
            sx={{ p: 1 }}
            variant='outlined'
            label='Enroll for discounts and special offers'
            onClick={() => {
              navigate('signin');
            }}
          />
        </Paper>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        mt: 6
      }}>
        <Paper elevation={0} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <DiscountIllustration style={{ backgroundImage: `url(${FirstBlob})`}} />
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Quality Foods, <br/>
            Cheap Expenses
          </Typography>
          <Typography variant='subtitle1'>
            Get personalized offers and discount <br/>
            as you continue serving your appetite through our <br/>
            fair priced menu.
          </Typography>
          <AppLink href='/order'>
            <b>Explore our rich menu</b> <ArrowForwardIcon fontSize='inherit' />
          </AppLink>
        </Paper>

        <Paper elevation={0} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <EnviromentIllustraton style={{ backgroundImage: `url(${SecondBlob})`}} />
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Sustainability
          </Typography>
          <Typography variant='subtitle1'>
            We ensure every ingredient in our supply chain <br/>
            produced under future-sighting standards <br/>
            — Save it or Waste it!
          </Typography>
          <AppLink href='/sustainability' testid='sustainability'>
            <b>Read our Community Commitment</b> <ArrowForwardIcon fontSize='inherit' />
          </AppLink>
        </Paper>

        <Paper elevation={0} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <MobileIllustration style={{ backgroundImage: `url(${ThirdBlob})`}} />
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            All-in-one
          </Typography>
          <Typography variant='subtitle1'>
          Experience vast landscape of flavors that your <br/>
          neighborhood sells and <br/>
          delicious features all-in-one app.
          </Typography>
          <AppLink href='/order' testid='go-to-app'>
            <b>Get the app</b> <ArrowForwardIcon fontSize='inherit' />
          </AppLink>
        </Paper>
      </Box>

      <Container maxWidth='lg' sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 12
      }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Care for Every Taste</Typography>
          <Typography variant='h6'>
            From Latino Chilli Snacks to American contemporary fast food culture,
            we make sure our menu stays diverse and please every customer's taste,
            check out your availablity for on-demand delivery or pickup.
          </Typography>
          <Button variant='contained' color='primary' sx={{ width: '50%', fontWeight: 'bold' }}>
            <AppLink href='/order' underline='none' color='white'>
              Discover your Meal
            </AppLink>
          </Button>
        </Box>
        <Box>
          <img src={TableOne} width={600} alt='Table containing foods' />
        </Box>
      </Container>


      <Container maxWidth='lg' sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 12
      }}>
        <Box sx={{ flex: 1 }}>
          <img src={TableTwo} width={600}  alt='Table containing foods'/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Reliable and Swift Deliverance</Typography>
          <Typography variant='h6'>
          You never gonna miss a meal again, our chefs and delivery drivers are qualified to serve
          your order as fast as possible with praised industry procedures, 
          our partnership program extend from coast to coast to fulfil your cravings.
          </Typography>
          <Button variant='contained' color='primary' sx={{ width: '50%', fontWeight: 'bold' }}>
            <AppLink href='/order' underline='none' color='white'>
              Book your First Order
            </AppLink>
          </Button>
        </Box>
      </Container>
    </Container>
  );
}

export default Home;

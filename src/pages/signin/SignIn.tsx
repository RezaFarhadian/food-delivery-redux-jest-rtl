import { Alert, Box, Button, Container, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ReactComponent as OffersIcon } from './images/offers.svg';
import { ReactComponent as SavedIcon } from './images/saved.svg';
import { ReactComponent as AppIcon } from "./images/app.svg";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCredentials, selectAuthorized, selectMessage } from "../../features/customer/customerSlice";
import { Navigate, useNavigate } from "react-router-dom";

function SignIn() {
  const [exposedPassword, setExposedPassword] = useState<Boolean>(false);
  const handlePasswordExposure = () => setExposedPassword(show => !show);
  const handleExposureMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const authMsg = useAppSelector(selectMessage);

  const navigate = useNavigate();

  const authorized = useAppSelector(selectAuthorized);

  const signInBtnRef = useRef<HTMLButtonElement>(null);

  const handleSingInOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      signInBtnRef.current?.click();
    }
  }
  
  return(
    <Container maxWidth='xl' disableGutters sx={{
      pt: 10,
      pb: 10,
      backgroundColor: theme => theme.palette.lightPink
    }}>
      {authorized && <Navigate to='/order' />}
      <Paper sx={{
        width: '50%',
        m: '0 auto',
        p: 8,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3
      }}>
        <Typography variant='h4'>
          <b>Sign In</b>
        </Typography>
        <Typography variant='h6'>
          Start Ordering 😋
        </Typography>

        <Box component='form' sx={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}>
          <TextField
            type='text'
            variant='outlined'
            placeholder='Enter your Email'
            fullWidth
            inputProps={{
              'data-testid': 'email-input',
              'aria-label': 'email-input'
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            onKeyDown={handleSingInOnEnter}
          />
          <OutlinedInput
            onKeyDown={handleSingInOnEnter}
            placeholder='Enter your Password'
            type={exposedPassword ? 'text' : 'password'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  data-testid='toggle-password-visibility'
                  onClick={handlePasswordExposure}
                  onMouseDown={handleExposureMouseDown}
                edge='end'
                >
                  { exposedPassword ? <Visibility/> : <VisibilityOff/> }
                </IconButton>
              </InputAdornment>
            } fullWidth inputProps={{
              'data-testid': 'password-input',
              'aria-label': 'password-input'
            }}
          />
          <Button ref={signInBtnRef} data-testid='signin-btn' variant='contained' size='large' startIcon={<LockOpenIcon />} onClick={() => {
            dispatch(fetchCredentials({ email, password })).then(() => {
              navigate('/order');
            })
          }}>
            <Typography variant='h6'>
              <b>Sign In</b>
            </Typography>
          </Button>
          {authMsg !== '' &&
            <Alert severity='error' data-testid='message'>{authMsg}</Alert>
          }
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, mt: 5, color: 'grey' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <AppIcon />
            <Typography variant='body2'>
              Access all features <br/>
              and express delivery <br/>
              all through one app.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <SavedIcon />
            <Typography variant='body2'>
              Have your addresses <br/>
              saved into your <br/>
              synced account.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <OffersIcon />
            <Typography variant='body2'>
              Get notified on fresh <br/>
              special offers and <br/>
              discounts on your device.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignIn;

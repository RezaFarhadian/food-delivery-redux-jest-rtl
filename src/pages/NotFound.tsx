import { Container, Link, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function NotFound() {
  return(
    <Container sx={{
      textAlign: 'center',
      mt: 10
    }}>
      <Typography variant='h4'>
      There is nothing to eat here.
      </Typography>
      <br/>
      <Typography variant='h6'>
        <Link href='/' underline='none'>
          Find food <ArrowForwardIcon fontSize='inherit' />
        </Link>
      </Typography>
    </Container>
  )
}

export default NotFound;

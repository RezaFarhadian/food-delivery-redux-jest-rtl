import { Box, Typography } from "@mui/material";
import { ReactComponent as ReviewsSvg } from './images/reviews.svg';

function NoReviews() {
  return(
    <Box sx={{
      textAlign: 'center',
      color: theme => theme.palette.gray,
      mt: 6
    }} data-testid='no-reviews'>
      <ReviewsSvg /> <br /><br />
      <Typography variant='subtitle2'>
        No reviews yet.
      </Typography>
    </Box>
  );
}

export default NoReviews;

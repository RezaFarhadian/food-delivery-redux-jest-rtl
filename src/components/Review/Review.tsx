import { Card, CardContent, CardProps, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { Review as ReviewType } from '../../features/reviews/reviewsSlice';

interface ReviewProps extends CardProps {
  data: ReviewType;
  attachTestProps?: boolean;
};

function Review(props: ReviewProps) {
  return (
    <Card data-testid={props.attachTestProps ? 'a-review' : ''} sx={{
      flex: 1,
      minWidth: '250px',
      height: '200px',
      cursor: 'default'
    }}>
      <CardContent>
        <Typography variant='subtitle2'>
          <b>{props.data.commentor}</b> <br />
          <Typography component='span' sx={{ '& > *': {
            width: '16px',
            position: 'relative',
            top: 5
          } }}>
            {
              [...new Array(props.data.rate)].map(n => <StarIcon data-testid={props.attachTestProps ? `point-up` : ''} />)
            }
            {
              [...new Array(5 - props.data.rate)].map(n => <StarBorderIcon data-testid={props.attachTestProps ? `neutral-point` : ''} />)
            }
          </Typography>
          —
          {props.data.publishedOn.toDateString()}
        </Typography>
        <Typography variant='body2'>
          {props.data.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Review;

import { Box, Button, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import NoReviews from "./NoReviews";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { getReviewsAverage, getReviewsById } from "../../features/reviews/reviewsSlice";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Transition } from 'react-transition-group';
import { useRef } from 'react';
import Review from "../Review/Review";
import Modal from "../Modal/Modal";

interface ReviewsProps {
  dinerId: string;
};

function Reviews(props: ReviewsProps) {
  const reviews = useAppSelector(getReviewsById(props.dinerId));
  const reviewsAvailable = reviews !== undefined && reviews.length > 0;
  const overallRate = useAppSelector(getReviewsAverage(props.dinerId));

  const transitionGroupRef = useRef(null);
  const [swipe, setSwipe] = useState<boolean>(false);

  const [fullReviews, setFullReviews] = useState<boolean>(false);
  const handleFullReviewsOpen = () => setFullReviews(true);
  const handleFullReviewsClose = () => setFullReviews(false);

  const transitionStyles = {
    entering: {
      transform: `translateX(-50%)`
    },
    entered: {
      transform: `translateX(-50%)`
    },
    exiting: {
      transform: `translateX(0)`
    },
    exited: {
      transform: `translateX(0)`
    },
    unmounted: {}
  };
  
  return(
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Typography variant='h6' sx={{ flex: 1 }}>
          <b>
            Comments on Place
          </b>
        </Typography>
        {
          reviewsAvailable &&
            <Button
              variant='outlined'
              size='small'
              data-testid='show-all-reviews'
              onClick={handleFullReviewsOpen}
            >
              See all Reviews
            </Button>
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: 1
        }}
      >
        <Typography variant='h6' sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'safe center',
          flex: 1
        }}>
          <b data-testid='average'>{ overallRate }</b>
          <StarIcon sx={{ color: '#e0b712', ml: 0.5 }} />
          <Typography
            component='span'
            variant='subtitle2'
            sx={{
              color: theme => theme.palette.gray,
              ml: 1
            }}
          >
            {reviewsAvailable ? reviews.length : '0'} ratings
          </Typography>
        </Typography>
        {
          reviewsAvailable &&
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button variant='outlined' data-testid='swipe-right' disabled={swipe ? false : true} onClick={() => setSwipe(false)} sx={{ borderRadius: 8 }} startIcon={<ChevronLeftIcon />}/>
              <Button variant='outlined' data-testid='swipe-left' disabled={swipe ? true : false} onClick={() => setSwipe(true)} sx={{ borderRadius: 8 }} endIcon={<ChevronRightIcon />}/>
            </Box>
        }
      </Box>
      {
        reviewsAvailable ? <Box sx={{
          overflowX: 'hidden',
          pb: 1,
          pl: 1
        }}>
          <Transition
            nodeRef={transitionGroupRef}
            in={swipe}
            timeout={1000}
          >
            {
              state =>
                <Box ref={transitionGroupRef} sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  gap: 3,
                  transform: `translateX(0)`,
                  transition: 'transform 1s ease-in-out',
                  ...transitionStyles[state]
                }} data-testid='reviews-row'>
                  {reviews.slice(0, 5).map(review =>
                    <Review
                      data={review}
                      attachTestProps
                    />
                  )}
                </Box>
            }
          </Transition>
        </Box> : <NoReviews />
      }
      {
        reviewsAvailable &&
          <Modal
            open={fullReviews}
            onClose={handleFullReviewsClose}
            heading='All Reviews on this diner'
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              {
                reviews.map(review =>
                  <Review
                    data={review}
                  />
                )
              }
            </Box>
          </Modal>
      }
    </Box>
  );
}

export default Reviews;

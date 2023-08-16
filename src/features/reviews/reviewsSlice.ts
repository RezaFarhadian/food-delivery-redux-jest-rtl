import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Review = {
  commentor: string
  rate: number
  publishedOn: Date
  body: string
};

type NormalizedReviews<T> = {
  populateByDiner: {
    [relatedId: string]: T[]
  }
};

type ReviewsState = NormalizedReviews<Review>;

const initialState:ReviewsState = {
  populateByDiner: {
    'decoto-road-mcdonalds': [{
      commentor: 'Jimmy R.',
      publishedOn: new Date(),
      rate: 4,
      body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit`
    }, {
      commentor: 'Clare W.',
      publishedOn: new Date(),
      rate: 5,
      body: `sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    }, {
      commentor: 'Chris D.',
      publishedOn: new Date(),
      rate: 3,
      body: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    }, {
      commentor: 'Leonard R.',
      publishedOn: new Date(),
      rate: 4,
      body: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    }, {
      commentor: 'Jake P.',
      publishedOn: new Date(),
      rate: 4,
      body: `Excepteur sint occaecat cupidatat non proident,`
    }, {
      commentor: 'Logan P.',
      publishedOn: new Date(),
      rate: 3,
      body: `sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }]
  }
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {}
});

export const getReviewsById = (id: string) =>
  (state: RootState) =>
    state.reviews.populateByDiner[id];

export const getReviewsAverage = (id: string) =>
  (state: RootState): string => {

    const reviews: number[] = state.reviews.populateByDiner[id]
      ?.map(
        (review: Review) => review.rate
      );

    if (!reviews || reviews?.length === 0) return '0.0';

    const size: number = reviews.length;

    return (reviews.reduce(
      (
        a: number,
        b: number
      ) => a + b
    ) / size).toFixed(1);

  };

export default reviewsSlice.reducer;

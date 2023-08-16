import { render } from '../../app/testUtils';
import { screen } from '@testing-library/react';
import DinerCard from './DinerCard';

describe('<DinerCard />', () => {
  test('renders correctly', () => {
    render(<DinerCard
      id='decoto-road-mcdonalds'
      address='3990 Decoto Road, Fremont, CA'
      title='McDonalds'
      headerUri='/assets/images/mcdonalds_header.avif'
      pictureUri='/assets/images/mcdonalds_picture.avif'
    />);

    expect(screen.getByTestId('dinercard')).toBeInTheDocument();
  });
});

import { render } from '../../app/testUtils';
import Reviews from './Reviews';
import { fireEvent, screen } from '@testing-library/react';

describe('<Review />', () => {
  test('shows 404 component when no review written', () => {
    render(<Reviews dinerId='mowry-avenue-dennys' />, {
      preloadedState: {
        reviews: {
          populateByDiner: {
            'mowry-avenue-dennys': []
          }
        }
      }
    });

    expect(screen.getByTestId('no-reviews')).toBeInTheDocument();
  });

  test('renders only 5 first reviews on vicinity', () => {
    render(<Reviews dinerId='decoto-road-mcdonalds' />);
    expect(screen.queryAllByTestId('a-review').length).toBe(5);
  });

  test('hides show all reviews button also', () => {
    render(<Reviews dinerId='mowry-avenue-dennys' />, {
      preloadedState: {
        reviews: {
          populateByDiner: {
            'mowry-avenue-dennys': []
          }
        }
      }
    });

    expect(screen.queryByTestId('show-all-reviews')).not.toBeInTheDocument();
  })

  test('correct ratings length number', () => {
    render(<Reviews dinerId='decoto-road-mcdonalds' />);
    expect(screen.getByText(/6 ratings/i)).toBeInTheDocument();
  });

  test('only one decimal number allowed for average', () => {
    render(<Reviews dinerId='decoto-road-mcdonalds' />);
    expect(
      /^(\d)*(\.)?([0-9]{1})?$/gm.test(
        screen.getByTestId('average').innerHTML
      )
    ).toBe(true);
  });

  describe('swipe', () => {
    test('accessibility', () => {
      render(<Reviews dinerId='decoto-road-mcdonalds' />);
      expect(screen.getByTestId('swipe-right')).toBeDisabled();
      fireEvent.click(screen.getByTestId('swipe-left'));
      expect(screen.getByTestId('swipe-left')).toBeDisabled();
    });

    test('animate whole row to max negative wv and toggle back to origin', () => {
      render(<Reviews dinerId='decoto-road-mcdonalds' />);
      expect(screen.getByTestId('reviews-row')).toHaveStyle('transform: translateX(0)');
      fireEvent.click(screen.getByTestId('swipe-left'));
      expect(screen.getByTestId('reviews-row')).toHaveStyle('transform: translateX(-50%)');
      fireEvent.click(screen.getByTestId('swipe-right'));
      expect(screen.getByTestId('reviews-row')).toHaveStyle('transform: translateX(0)');
    });

    test('goes away when no review written', () => {
      render(<Reviews dinerId='mowry-avenue-dennys' />, {
        preloadedState: {
          reviews: {
            populateByDiner: {
              'mowry-avenue-dennys': []
            }
          }
        }
      });

      expect(screen.queryByTestId('swipe-right')).not.toBeInTheDocument();
      expect(screen.queryByTestId('swipe-left')).not.toBeInTheDocument();
    });
  });
});

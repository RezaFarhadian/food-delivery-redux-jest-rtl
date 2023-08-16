import { render, screen } from '@testing-library/react';
import Review from "./Review";

describe('<Review />', () => {
  test('renders corrent rating points', () => {
    render(<Review
      data={{
        commentor: 'Jimmy R.',
        publishedOn: new Date(),
        rate: 4,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
      }}
      attachTestProps
    />);
    expect(screen.queryAllByTestId('point-up').length).toBe(4);
    expect(screen.queryAllByTestId('neutral-point').length).toBe(1);
  });
});

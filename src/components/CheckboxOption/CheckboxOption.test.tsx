import { screen } from '@testing-library/react';
import CheckboxOption from './CheckboxOption';
import { render } from '../../app/testUtils';

describe('<CheckboxOtion />', () => {
  test('connects to Redux <Provider> and renders', () => {
    render(<CheckboxOption value='test-option' amount={200} />);

    expect(screen.getByTestId('child-checkbox')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('<Modal />', () => {
  test('renders', () => {
    render(<Modal open={true} onClose={() => {}}><p>This is a test modal</p></Modal>);
  })
});

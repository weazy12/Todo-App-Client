import { render, screen } from '@testing-library/react';
import { First } from './First';

test('renders component text', () => {
  render(<First />);
  expect(screen.getByText('Hello Jest')).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import Gallery from '../pages/gallery';

describe('Gallery Page', () => {
  it('renders header', () => {
    render(<Gallery />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });
});

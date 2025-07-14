import { render, screen } from '@testing-library/react';
import Upload from '../pages/upload';

describe('Upload Page', () => {
  it('renders upload button', () => {
    render(<Upload />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

// Mock the Supabase client to avoid loading ESM modules during tests
jest.mock('../utils/supabaseClient', () => ({
  supabase: {
    auth: { getUser: jest.fn().mockResolvedValue({ data: { user: null } }) },
    storage: { from: jest.fn().mockReturnValue({ list: jest.fn() }) },
  },
}));

import Gallery from '../pages/gallery';

describe('Gallery Page', () => {
  it('renders header', () => {
    render(<Gallery />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });
});

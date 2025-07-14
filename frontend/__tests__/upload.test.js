import { render, screen } from '@testing-library/react';

jest.mock('../utils/supabaseClient', () => ({
  supabase: {
    auth: { getSession: jest.fn().mockResolvedValue({ data: { session: null } }) },
  },
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

import Upload from '../pages/upload';

describe('Upload Page', () => {
  it('renders upload button', () => {
    render(<Upload />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });
});

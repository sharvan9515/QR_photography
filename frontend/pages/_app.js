import '../styles/globals.css';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function MyApp({ Component, pageProps }) {
  const [initialSession] = useState(pageProps.initialSession || null);
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

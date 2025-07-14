import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function CustomerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/gallery');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Customer Login</h1>
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Sign In</button>
      </form>
    </div>
  );
}

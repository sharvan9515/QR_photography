import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.session) {
        await supabase.auth.setSession(data.session);
        router.push('/upload');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <input className="border p-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sign In</button>
      </form>
    </div>
  );
}

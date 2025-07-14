import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import axios from 'axios';

export default function Upload() {
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    const form = new FormData();
    form.append('file', file);
    form.append('galleryId', 'default');
    await axios.post('/api/upload', form, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    router.push('/upload/success?gallery=default');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md space-y-4">
        <h1 className="text-xl font-bold">Upload Media</h1>
        <input className="border p-2 w-full" type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-purple-500 text-white px-4 py-2 rounded" type="submit">Upload</button>
      </form>
    </div>
  );
}

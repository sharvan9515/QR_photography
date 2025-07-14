import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      const { data, error } = await supabase.storage.from('images').list(user.id);
      if (!error && data) {
        const urls = await Promise.all(
          data.map((file) => supabase.storage.from('images').createSignedUrl(`${user.id}/${file.name}`, 60))
        );
        setImages(urls.map(u => u.data.signedUrl));
      }
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src) => (
          <img key={src} src={src} className="w-full" />
        ))}
      </div>
    </div>
  );
}

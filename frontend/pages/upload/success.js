import QRCode from 'react-qr-code';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { gallery } = router.query;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-xl font-bold">Upload Success</h1>
      {gallery && <QRCode value={gallery} />}
    </div>
  );
}

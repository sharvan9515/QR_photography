import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">QR Photography</h1>
      <ul className="space-y-1">
        <li>
          <Link className="text-blue-500 underline" href="/login/admin">
            Admin Login
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 underline" href="/login/customer">
            Customer Login
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 underline" href="/gallery">
            Gallery
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 underline" href="/upload">
            Upload Media
          </Link>
        </li>
      </ul>
    </div>
  );
}

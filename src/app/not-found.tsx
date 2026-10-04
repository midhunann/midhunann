import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[60rem] px-6 py-32">
      <h1 className="text-6xl">404</h1>
      <p className="mt-4 text-muted">that page does not exist.</p>
      <Link href="/" className="link tap mt-6">
        back to the start
      </Link>
    </div>
  );
}

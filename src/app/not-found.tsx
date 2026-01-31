import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="glass-card p-12 max-w-lg mx-auto">
          {/* 404 */}
          <h1 className="text-8xl font-bold text-ocean mb-4">404</h1>
          
          {/* Message */}
          <h2 className="text-2xl font-semibold text-pearl mb-2">
            Page Not Found
          </h2>
          <p className="text-pearl/60 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home size={18} />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">
                <ArrowLeft size={18} />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

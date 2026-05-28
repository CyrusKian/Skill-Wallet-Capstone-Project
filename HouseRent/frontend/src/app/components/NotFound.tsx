import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

import { PageShell } from './PageShell';

export function NotFound() {
  const navigate = useNavigate();


  return (
    <PageShell
      paddingTop={40}
      paddingBottom={40}
      background={'var(--bg-main)'}
      className="flex items-center justify-center"
    >
      <div className="text-center">

        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[var(--primary)] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">Page Not Found</h2>
          <p className="text-[var(--text-muted)] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary inline-flex items-center gap-2"
          style={{ padding: '12px 18px' }}
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </PageShell>
  );
}

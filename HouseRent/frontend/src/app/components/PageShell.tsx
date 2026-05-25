import { ReactNode } from 'react';

export function PageShell({
  children,
  className = '',
  paddingTop = 30,
  paddingBottom = 60,
  background = 'var(--bg-main)',
}: {
  children: ReactNode;
  className?: string;
  paddingTop?: number;
  paddingBottom?: number;
  background?: string;
}) {
  return (
    <div
      className={className}
      style={{
        minHeight: '100vh',
        width: '100%',
        background,
        paddingTop,
        paddingBottom,
      }}
    >
      <div className="container">
        {children}
      </div>
    </div>
  );
}


import type { ReactNode } from 'react';
import './PageLayout.css';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  actionButton?: ReactNode;
  children: ReactNode;
}

export default function PageLayout({ title, subtitle, description, actionButton, children }: PageLayoutProps) {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {description && <p>{description}</p>}
        </div>
        {actionButton && (
          <div className="page-action">
            {actionButton}
          </div>
        )}
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

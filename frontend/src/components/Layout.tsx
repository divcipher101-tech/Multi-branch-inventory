import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
}

export default function Layout({ children, onLogout }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar onLogout={onLogout} />
      <div className="main-wrapper">
        <Header onLogout={onLogout} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto" style={{ marginLeft: 'var(--sidebar)' }}>
        {children}
      </main>
    </div>
  );
}

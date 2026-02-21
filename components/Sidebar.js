'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: '/form',
    label: 'My Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    href: '/results',
    label: 'My Matches',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    href: '/calendar',
    label: 'Deadline Tracker',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    badge: '4',
  },
  {
    href: '/resume',
    label: 'Resume Upload',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-40"
      style={{ width: 'var(--sidebar)', background: 'white', borderRight: '1.5px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
            S
          </div>
          <div>
            <div className="font-bold text-base" style={{ color: 'var(--text)', letterSpacing: '-0.3px' }}>
              ScholarSync
            </div>
            <div className="text-xs" style={{ color: 'var(--text3)' }}>v1.0 · Checkpoint 1</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-semibold px-3 mb-2 uppercase tracking-widest" style={{ color: 'var(--text3)' }}>
          Menu
        </p>
        {nav.map(item => {
          const active = path === item.href || (item.href !== '/' && path.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
              style={{
                background: active ? 'var(--indigo-light)' : 'transparent',
                color: active ? 'var(--indigo)' : 'var(--text2)',
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: active ? 'var(--indigo)' : 'var(--text3)' }}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: '#ef4444', fontSize: '10px' }}>
                  {item.badge}
                </span>
              )}
              {active && (
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--indigo)' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile pill at bottom */}
      <div className="px-4 pb-5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--surface2)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
            ST
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>Student</p>
            <p className="text-xs truncate" style={{ color: 'var(--text3)' }}>Profile incomplete</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

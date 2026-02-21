'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppShell from '../../components/AppShell';

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('profileData');
    if (stored) setProfile(JSON.parse(stored));
    const now = new Date();
    const h = now.getHours();
    setTime(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, []);

  const name = profile?.name?.split(' ')[0] || 'Scholar';
  const hasProfile = !!profile;

  const stats = [
    {
      label: 'Scholarships Matched',
      value: hasProfile ? '10' : '—',
      sub: hasProfile ? 'Based on your profile' : 'Complete profile first',
      icon: '🎯',
      color: '#4f46e5',
      bg: '#eef2ff',
    },
    {
      label: 'High Fit Matches',
      value: hasProfile ? '4' : '—',
      sub: hasProfile ? 'Ready to apply' : 'Complete profile first',
      icon: '⭐',
      color: '#059669',
      bg: '#ecfdf5',
    },
    {
      label: 'Urgent Deadlines',
      value: '4',
      sub: 'Closing within 30 days',
      icon: '⏰',
      color: '#dc2626',
      bg: '#fef2f2',
    },
    {
      label: 'Success Score',
      value: hasProfile ? `${calcScore(profile)}%` : '—',
      sub: hasProfile ? 'Your win probability' : 'Complete profile first',
      icon: '📊',
      color: '#d97706',
      bg: '#fffbeb',
    },
  ];

  const quickActions = [
    { href: '/form', label: 'Complete Profile', desc: 'Fill in your academic details', icon: '👤', cta: true },
    { href: '/results', label: 'View Matches', desc: 'See your ranked scholarships', icon: '🎓', cta: false },
    { href: '/calendar', label: 'Check Deadlines', desc: '4 urgent deadlines this month', icon: '📅', cta: false },
    { href: '/resume', label: 'Upload Resume', desc: 'Boost your match accuracy', icon: '📄', cta: false },
  ];

  const recentActivity = [
    { text: 'National Merit Scholarship — Deadline in 8 days', time: 'Urgent', dot: '#dc2626' },
    { text: 'Inspire Scholarship DST — Deadline in 13 days', time: 'Urgent', dot: '#dc2626' },
    { text: 'Vidyasaarathi OBC — Deadline in 22 days', time: 'Urgent', dot: '#d97706' },
    { text: 'Post-Matric SC/ST — Deadline in 38 days', time: 'Soon', dot: '#d97706' },
    { text: 'Tata Scholarship STEM — Deadline in 3 months', time: 'Later', dot: '#059669' },
  ];

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 fade-up fade-up-1">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text3)' }}>{time} 👋</p>
            <h1 className="text-3xl font-bold serif" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
              {name}'s Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>
              {hasProfile
                ? `Profile complete · Last updated just now`
                : 'Your scholarship command center — start by completing your profile'}
            </p>
          </div>
          <Link href="/form" className="btn-primary" style={{ textDecoration: 'none', fontSize: '13px', padding: '10px 18px' }}>
            + Update Profile
          </Link>
        </div>

        {/* Profile completion banner — only if no profile */}
        {!hasProfile && (
          <div className="mb-7 p-4 rounded-2xl border flex items-center gap-4 fade-up fade-up-1"
            style={{ background: 'var(--indigo-light)', borderColor: 'var(--indigo-border)' }}>
            <div className="text-2xl">💡</div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: 'var(--indigo)' }}>Profile incomplete</p>
              <p className="text-xs mt-0.5" style={{ color: '#6366f1' }}>
                Fill in your profile to unlock personalized scholarship matches and your success score.
              </p>
            </div>
            <Link href="/form" className="btn-primary" style={{ textDecoration: 'none', fontSize: '12px', padding: '8px 16px', whiteSpace: 'nowrap' }}>
              Complete Now →
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7 fade-up fade-up-2">
          {stats.map(s => (
            <div key={s.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{s.icon}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              </div>
              <div className="text-2xl font-bold mb-1 serif" style={{ color: s.value === '—' ? 'var(--text3)' : s.color }}>
                {s.value}
              </div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{s.label}</div>
              <div className="text-xs" style={{ color: 'var(--text3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Quick Actions */}
          <div className="lg:col-span-2 fade-up fade-up-3">
            <div className="card p-6">
              <h2 className="font-bold text-base mb-5" style={{ color: 'var(--text)' }}>Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map(a => (
                  <Link key={a.href} href={a.href}
                    className="flex items-start gap-3 p-4 rounded-xl border transition-all"
                    style={{
                      textDecoration: 'none',
                      borderColor: a.cta ? 'var(--indigo-border)' : 'var(--border)',
                      background: a.cta ? 'var(--indigo-light)' : 'var(--surface2)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--indigo)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = a.cta ? 'var(--indigo-border)' : 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span className="text-xl shrink-0">{a.icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: a.cta ? 'var(--indigo)' : 'var(--text)' }}>{a.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{a.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Profile completion meter */}
            <div className="card p-6 mt-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>Profile Completeness</h2>
                <span className="text-sm font-bold" style={{ color: 'var(--indigo)' }}>
                  {hasProfile ? '80%' : '0%'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full mb-4" style={{ background: 'var(--surface3)' }}>
                <div className="h-2 rounded-full transition-all duration-700"
                  style={{ width: hasProfile ? '80%' : '0%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Personal Info', done: hasProfile },
                  { label: 'Academic Details', done: hasProfile && profile?.gpa },
                  { label: 'Family Background', done: hasProfile && profile?.income },
                  { label: 'Resume Upload', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ background: item.done ? '#ecfdf5' : 'var(--surface3)', border: `1.5px solid ${item.done ? '#059669' : 'var(--border)'}` }}>
                      {item.done ? <span style={{ color: '#059669' }}>✓</span> : ''}
                    </div>
                    <span className="text-xs font-medium" style={{ color: item.done ? 'var(--text)' : 'var(--text3)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="fade-up fade-up-4">
            <div className="card p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>Upcoming Deadlines</h2>
                <Link href="/calendar" className="text-xs font-semibold" style={{ color: 'var(--indigo)', textDecoration: 'none' }}>
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.dot }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-snug" style={{ color: 'var(--text)' }}>{a.text}</p>
                      <p className="text-xs mt-0.5 font-semibold" style={{
                        color: a.time === 'Urgent' ? '#dc2626' : a.time === 'Soon' ? '#d97706' : '#059669'
                      }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/calendar"
                className="block w-full text-center mt-5 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: 'var(--surface2)', color: 'var(--text2)', textDecoration: 'none', border: '1.5px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--indigo-light)'; e.currentTarget.style.color = 'var(--indigo)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text2)'; }}
              >
                Open Deadline Tracker →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

// Simple score calc for dashboard display
function calcScore(profile) {
  if (!profile) return 0;
  const gpa = parseFloat(profile.gpa) || 5;
  const g = gpa <= 4 ? (gpa / 4) * 10 : gpa;
  const incomeMap = { below1: 1, '1to3': 2, '3to6': 3, '6to10': 4, above10: 5 };
  const income = incomeMap[profile.income] || 3;
  const catBonus = { SC: 18, ST: 18, OBC: 14, EWS: 16, General: 10 };
  let s = (g / 10) * 45 + ((5 - income) / 4) * 25 + (catBonus[profile.category] || 10);
  return Math.min(Math.round(s), 98);
}

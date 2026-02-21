'use client';
import { useState } from 'react';
import AppShell from '../../components/AppShell';
import { scholarships } from '../../lib/scholarships';

const groups = {
  Urgent: scholarships.filter(s => s.deadline === 'Urgent'),
  Soon:   scholarships.filter(s => s.deadline === 'Soon'),
  Later:  scholarships.filter(s => s.deadline === 'Later'),
};

const gStyle = {
  Urgent: { label: 'Urgent — Apply Now', sub: 'Closing within 30 days', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', dot: '#ef4444', pill: '#fee2e2', pillText: '#dc2626' },
  Soon:   { label: 'Coming Soon', sub: '30–60 days remaining', color: '#d97706', bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b', pill: '#fef3c7', pillText: '#d97706' },
  Later:  { label: 'Plenty of Time', sub: '60+ days remaining', color: '#059669', bg: '#f0fdf4', border: '#bbf7d0', dot: '#10b981', pill: '#d1fae5', pillText: '#059669' },
};

export default function CalendarPage() {
  const [filter, setFilter] = useState('All');

  const shown = filter === 'All' ? ['Urgent', 'Soon', 'Later'] : [filter];

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 fade-up fade-up-1">
          <h1 className="text-3xl font-bold serif mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Deadline Tracker
          </h1>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            {scholarships.length} scholarships tracked · Never miss a closing date
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 fade-up fade-up-2">
          {Object.entries(groups).map(([key, list]) => {
            const st = gStyle[key];
            const active = filter === key;
            return (
              <button key={key} onClick={() => setFilter(active ? 'All' : key)}
                className="card p-5 text-left transition-all"
                style={{
                  borderColor: active ? st.color : 'var(--border)',
                  background: active ? st.bg : 'white',
                  boxShadow: active ? `0 0 0 2px ${st.color}22` : undefined,
                  transform: active ? 'translateY(-2px)' : undefined,
                }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: st.dot }} />
                  {active && <span className="text-xs font-bold" style={{ color: st.color }}>Active</span>}
                </div>
                <div className="text-3xl font-bold serif mb-1" style={{ color: st.color }}>{list.length}</div>
                <div className="text-xs font-bold" style={{ color: 'var(--text)' }}>{key}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{st.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-7 fade-up fade-up-2">
          {['All', 'Urgent', 'Soon', 'Later'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
              style={{
                background: filter === f ? 'var(--indigo)' : 'white',
                color: filter === f ? 'white' : 'var(--text2)',
                borderColor: filter === f ? 'var(--indigo)' : 'var(--border)',
              }}>
              {f}{f !== 'All' && ` (${groups[f]?.length})`}
            </button>
          ))}
        </div>

        {/* Scholarship rows */}
        <div className="space-y-8 fade-up fade-up-3">
          {shown.map(key => {
            const st = gStyle[key];
            const list = groups[key];
            return (
              <div key={key}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-8 rounded-full" style={{ background: st.color }} />
                  <div>
                    <h2 className="font-bold text-sm" style={{ color: st.color }}>
                      🔴 {key === 'Urgent' ? '🔴' : key === 'Soon' ? '🟡' : '🟢'} {st.label}
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>{st.sub}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {list.map(s => (
                    <div key={s.id} className="card px-5 py-4 flex items-center gap-4"
                      style={{ borderColor: 'var(--border)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = st.color; e.currentTarget.style.transform = 'translateX(2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: st.dot }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{s.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{s.provider}</p>
                      </div>
                      <div className="text-sm font-bold hidden sm:block" style={{ color: 'var(--text)' }}>{s.amount}</div>
                      <div className="flex items-center gap-1.5 text-xs font-medium hidden md:flex" style={{ color: 'var(--text2)' }}>
                        <span>📅</span> {s.deadlineDate}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                        style={{ background: st.pill, color: st.pillText }}>{key}</span>
                      <a href={s.link} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-bold px-4 py-2 rounded-xl border shrink-0 transition-all"
                        style={{ color: 'var(--indigo)', borderColor: '#c7d2fe', background: '#eef2ff', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--indigo)'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = 'var(--indigo)'; }}>
                        Apply →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro tip */}
        <div className="mt-10 p-5 rounded-2xl border flex items-start gap-4"
          style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
          <span className="text-2xl shrink-0">💡</span>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Pro Strategy</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
              Apply to all <strong>Urgent</strong> scholarships first — even a half-complete application is better than a missed deadline.
              Your profile data from ScholarSync is ready to paste directly into any application form.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

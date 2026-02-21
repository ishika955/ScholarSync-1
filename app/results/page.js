'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppShell from '../../components/AppShell';
import ScholarshipCard from '../../components/ScholarshipCard';

function Ring({ score }) {
  const r = 52, c = 2 * Math.PI * r;
  const offset = ((100 - score) / 100) * c;
  const color = score >= 70 ? '#4f46e5' : score >= 50 ? '#7c3aed' : '#8b91aa';
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      <svg className="absolute" style={{ transform: 'rotate(-90deg)' }} width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f3f9" strokeWidth="8" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }} />
      </svg>
      <div className="text-center z-10">
        <div className="text-2xl font-bold serif" style={{ color }}>{score}%</div>
        <div className="text-xs font-medium" style={{ color: 'var(--text3)' }}>Score</div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const stored = sessionStorage.getItem('profileData');
    if (!stored) { router.push('/form'); return; }
    const p = JSON.parse(stored);
    setProfile(p);
    Promise.all([
      fetch('/api/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) }).then(r => r.json()),
      fetch('/api/insights', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) }).then(r => r.json()),
    ]).then(([m, i]) => { setData(m); setInsights(i); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
          <div style={{ width: 44, height: 44, border: '4px solid #eef2ff', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 600, color: 'var(--text)' }}>Analyzing your profile...</p>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>Scoring across 10 scholarships</p>
          </div>
        </div>
      </AppShell>
    );
  }

  const all = data.scholarships;
  const highFit = all.filter(s => s.priority === 'High Fit');
  const filtered = filter === 'All' ? all : all.filter(s => s.priority === filter);
  const top3 = all.slice(0, 3);
  const rest = all.slice(3);

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 fade-up fade-up-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>Results for</p>
            <h1 className="text-3xl font-bold serif mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
              {profile?.name}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>
              {all.length} scholarships matched · {highFit.length} High Fit · Ranked by your win probability
            </p>
            <div className="flex gap-2 mt-3">
              {['All', 'High Fit', 'Medium Fit', 'Stretch'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
                  style={{
                    background: filter === f ? 'var(--indigo)' : 'white',
                    color: filter === f ? 'white' : 'var(--text2)',
                    borderColor: filter === f ? 'var(--indigo)' : 'var(--border)',
                  }}>
                  {f} {f !== 'All' && `(${all.filter(s => s.priority === f).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Success score card */}
          <div className="card p-6 flex items-center gap-6 shrink-0">
            <Ring score={insights.successProbability} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text3)' }}>
                Success Score
              </p>
              <div className="space-y-1.5">
                {[
                  ['GPA', profile?.gpa || '—'],
                  ['Category', profile?.category],
                  ['Field', profile?.field?.split(' ')[0]],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>{k}:</span>
                    <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Gap Analysis */}
        <div className="mb-8 p-6 rounded-2xl border fade-up fade-up-2"
          style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)', borderColor: '#c7d2fe' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>✦</div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4f46e5' }}>
              AI Gap Analysis
            </span>
          </div>
          <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text)' }}>
            {insights.gapAnalysis}
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {insights.tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-xl border p-4 flex items-start gap-2.5" style={{ borderColor: '#c7d2fe' }}>
                <span className="font-bold text-sm shrink-0 mt-0.5" style={{ color: '#4f46e5' }}>→</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text)' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {filter === 'All' ? (
          <>
            {/* Top 3 */}
            <div className="mb-8 fade-up fade-up-3">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold serif" style={{ color: 'var(--text)' }}>Top Matches</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Priority</span>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {top3.map((s, i) => <ScholarshipCard key={s.id} scholarship={s} rank={i + 1} highlight />)}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text3)' }}>
                More Opportunities
              </span>
              <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 fade-up fade-up-4">
              {rest.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 fade-up fade-up-3">
            {filtered.length > 0
              ? filtered.map((s, i) => <ScholarshipCard key={s.id} scholarship={s} rank={i < 3 ? i + 1 : null} highlight={i < 3} />)
              : <div className="col-span-3 text-center py-12" style={{ color: 'var(--text3)' }}>No scholarships in this category.</div>
            }
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text3)' }}>Want better matches? Update your profile.</p>
          <Link href="/form" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Edit Profile
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>S</div>
          <span className="font-bold text-lg" style={{ color: 'var(--text)', letterSpacing: '-0.3px' }}>ScholarSync</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-medium" style={{ color: 'var(--text2)' }}>Sign In</Link>
          <Link href="/dashboard" className="btn-primary text-sm" style={{ padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}>
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-10 pt-20 pb-16 text-center">
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
          style={{ background: 'var(--indigo-light)', color: 'var(--indigo)', border: '1px solid var(--indigo-border)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--indigo)' }} />
          AI-Powered · Checkpoint 1 Demo
        </div> */}

        <h1 className="serif text-6xl md:text-7xl mb-6 leading-tight" style={{ color: 'var(--text)', letterSpacing: '-1px' }}>
          The smartest way to find<br />
          <span style={{ color: 'var(--indigo)' }}>your scholarship.</span>
        </h1>

        <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text2)' }}>
          ScholarSync analyzes your academic profile, income, and background to surface
          the exact scholarships you're most likely to win — ranked and ready to apply.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-16">
          <Link href="/dashboard"
            className="btn-primary"
            style={{ padding: '13px 28px', fontSize: '15px', textDecoration: 'none', display: 'inline-block', borderRadius: '12px' }}>
            Open Dashboard →
          </Link>
          <Link href="/calendar"
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '15px', textDecoration: 'none', display: 'inline-block', borderRadius: '12px' }}>
            View Deadlines
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 max-w-2xl mx-auto">
          {[
            { n: '10+', l: 'Scholarships Tracked' },
            { n: '5', l: 'Matching Signals' },
            { n: '< 2 min', l: 'To Get Results' },
          ].map(s => (
            <div key={s.l} className="card py-5 px-4 text-center" style={{ border: '1.5px solid var(--border)' }}>
              <div className="text-3xl font-bold mb-1 serif" style={{ color: 'var(--indigo)' }}>{s.n}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--text3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto px-10 pb-24 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '⚡', title: 'Smart Matching', desc: 'Scored across GPA, income, category, field & gender.' },
          { icon: '📊', title: 'Success Score', desc: 'Your personalized probability of winning each scholarship.' },
          { icon: '📅', title: 'Deadline Tracker', desc: 'Visual urgency tracker so you never miss a deadline.' },
          { icon: '📄', title: 'Resume Upload', desc: 'Upload your resume for AI-powered profile enhancement.' },
        ].map(f => (
          <div key={f.title} className="card p-5" style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

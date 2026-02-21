export default function ScholarshipCard({ scholarship: s, rank, highlight }) {
  const dlStyle = {
    Urgent: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', dot: '#ef4444' },
    Soon:   { bg: '#fffbeb', border: '#fde68a', text: '#d97706', dot: '#f59e0b' },
    Later:  { bg: '#f0fdf4', border: '#bbf7d0', text: '#059669', dot: '#10b981' },
  }[s.deadline] || { bg: '#f8f9fc', border: '#e2e6f0', text: '#8b91aa', dot: '#8b91aa' };

  const prStyle = {
    'High Fit':   { bg: '#eef2ff', border: '#c7d2fe', text: '#4f46e5' },
    'Medium Fit': { bg: '#faf5ff', border: '#e9d5ff', text: '#7c3aed' },
    'Stretch':    { bg: '#f8f9fc', border: '#e2e6f0', text: '#8b91aa' },
  }[s.priority] || { bg: '#f8f9fc', border: '#e2e6f0', text: '#8b91aa' };

  const scoreColor = s.matchScore >= 75 ? '#4f46e5' : s.matchScore >= 50 ? '#7c3aed' : '#8b91aa';

  return (
    <div
      className="card p-5 flex flex-col"
      style={{
        borderColor: highlight ? '#c7d2fe' : 'var(--border)',
        background: highlight ? '#fafbff' : 'white',
        position: 'relative',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,22,41,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(15,22,41,0.04)'; }}
    >
      {/* Rank badge */}
      {rank && (
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>
          {rank}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm leading-snug" style={{ color: 'var(--text)' }}>{s.name}</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{s.provider}</p>
        </div>
        <div className="text-2xl font-bold shrink-0 serif" style={{ color: scoreColor }}>{s.matchScore}%</div>
      </div>

      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>{s.description}</p>

      {/* Amount */}
      <div className="flex items-center gap-1.5 mb-3 py-2 px-3 rounded-lg" style={{ background: 'var(--surface2)' }}>
        <span className="text-sm">💰</span>
        <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{s.amount}</span>
        <span className="text-xs ml-auto" style={{ color: 'var(--text3)' }}>📅 {s.deadlineDate}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
          style={{ background: dlStyle.bg, borderColor: dlStyle.border, color: dlStyle.text }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: dlStyle.dot }} />
          {s.deadline}
        </span>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold border"
          style={{ background: prStyle.bg, borderColor: prStyle.border, color: prStyle.text }}>
          {s.priority}
        </span>
        {s.tags?.slice(0, 1).map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium border"
            style={{ background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text3)' }}>
            {t}
          </span>
        ))}
      </div>

      {/* Apply button */}
      <a href={s.link} target="_blank" rel="noopener noreferrer"
        className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold mt-auto border transition-all"
        style={{ background: 'white', borderColor: 'var(--border)', color: 'var(--text)', textDecoration: 'none' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--indigo)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--indigo)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        Apply Now →
      </a>
    </div>
  );
}

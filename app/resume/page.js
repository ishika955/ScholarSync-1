'use client';
import { useState, useRef } from 'react';
import AppShell from '../../components/AppShell';

const tips = [
  'Add your CGPA prominently in the header section',
  'List all state/national level awards with year',
  'Include your income certificate reference number',
  'Mention NSS, NCC, or volunteering hours',
  'Add a personal statement section (3–4 lines)',
];

const skills = ['Academic Excellence', 'Problem Solving', 'Leadership', 'Communication', 'Research Aptitude'];

export default function ResumePage() {
  const [stage, setStage] = useState('idle'); // idle | uploading | analyzing | done
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const ref = useRef();

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert('File must be under 5MB'); return; }
    setFile(f);
    setStage('uploading');
    setProgress(0);

    // Simulate upload
    let p = 0;
    const up = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(up);
        setProgress(100);
        setTimeout(() => {
          setStage('analyzing');
          // Simulate AI analysis steps
          setTimeout(() => {
            setScore(Math.floor(Math.random() * 20) + 68); // 68–88
            setStage('done');
          }, 2800);
        }, 400);
      }
      setProgress(Math.round(p));
    }, 120);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const reset = () => { setStage('idle'); setFile(null); setProgress(0); setScore(0); };

  return (
    <AppShell>
      <div className="px-8 py-8 max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 fade-up fade-up-1">
          <h1 className="text-3xl font-bold serif mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Resume Upload
          </h1>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            Upload your resume for AI-powered analysis and scholarship optimization tips.
          </p>
        </div>

        {/* Idle / Upload zone */}
        {stage === 'idle' && (
          <div
            className="card p-10 text-center mb-6 fade-up fade-up-2 cursor-pointer transition-all"
            style={{
              borderStyle: 'dashed',
              borderColor: dragOver ? 'var(--indigo)' : 'var(--border2)',
              background: dragOver ? 'var(--indigo-light)' : 'white',
              borderWidth: 2,
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => ref.current.click()}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: dragOver ? 'var(--indigo)' : 'var(--surface2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dragOver ? 'white' : '#8b91aa'} strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <p className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>
              {dragOver ? 'Drop it here!' : 'Drop your resume here'}
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--text3)' }}>or click to browse files</p>
            <span className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--indigo)' }}>
              Browse Files
            </span>
            <p className="text-xs mt-4" style={{ color: 'var(--text3)' }}>
              Accepts PDF, DOC, DOCX · Max 5MB
            </p>
            <input ref={ref} type="file" accept=".pdf,.doc,.docx" className="hidden"
              onChange={e => handleFile(e.target.files[0])} />
          </div>
        )}

        {/* Uploading */}
        {stage === 'uploading' && (
          <div className="card p-8 mb-6 fade-up fade-up-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                style={{ background: 'var(--indigo)' }}>📄</div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{file?.name}</p>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>
                  {(file?.size / 1024).toFixed(0)} KB · Uploading...
                </p>
              </div>
              <span className="font-bold text-sm" style={{ color: 'var(--indigo)' }}>{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: 'var(--surface2)' }}>
              <div className="h-2 rounded-full transition-all duration-200"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />
            </div>
          </div>
        )}

        {/* Analyzing */}
        {stage === 'analyzing' && (
          <div className="card p-8 mb-6 text-center fade-up fade-up-1">
            <div className="w-14 h-14 border-4 rounded-full mx-auto mb-5"
              style={{ borderColor: 'var(--indigo-light)', borderTopColor: 'var(--indigo)', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>AI is reading your resume...</p>
            <div className="space-y-2 text-sm text-left max-w-xs mx-auto mt-5">
              {['Extracting academic details...', 'Identifying achievements...', 'Scoring scholarship readiness...'].map((t, i) => (
                <div key={t} className="flex items-center gap-2" style={{ color: 'var(--text2)' }}>
                  <span style={{ color: '#059669' }}>✓</span> {t}
                </div>
              ))}
              <div className="flex items-center gap-2" style={{ color: 'var(--text3)' }}>
                <span className="w-4 h-4 border-2 rounded-full inline-block"
                  style={{ borderColor: 'var(--indigo-light)', borderTopColor: 'var(--indigo)', animation: 'spin 0.8s linear infinite' }} />
                Generating optimization tips...
              </div>
            </div>
          </div>
        )}

        {/* Done — Results */}
        {stage === 'done' && (
          <div className="space-y-5 fade-up fade-up-1">
            {/* Score card */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text3)' }}>
                    Resume Analysis Complete
                  </p>
                  <p className="font-bold text-base" style={{ color: 'var(--text)' }}>{file?.name}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold serif" style={{ color: score >= 75 ? '#4f46e5' : '#d97706' }}>
                    {score}
                    <span className="text-xl">/100</span>
                  </div>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text3)' }}>Scholarship Readiness</p>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full h-3 rounded-full mb-2" style={{ background: 'var(--surface2)' }}>
                <div className="h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${score}%`, background: score >= 75 ? 'linear-gradient(90deg, #4f46e5, #7c3aed)' : 'linear-gradient(90deg, #d97706, #f59e0b)' }} />
              </div>
              <p className="text-xs" style={{ color: 'var(--text3)' }}>
                {score >= 75 ? 'Strong resume — ready for top-tier applications' : 'Good resume — a few improvements will increase your match rate'}
              </p>
            </div>

            {/* Detected skills */}
            <div className="card p-6">
              <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Detected Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ background: 'var(--indigo-light)', borderColor: 'var(--indigo-border)', color: 'var(--indigo)' }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Improvement tips */}
            <div className="card p-6">
              <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>
                AI Optimization Tips
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'var(--indigo)' }}>{tips.length}</span>
              </h3>
              <div className="space-y-3">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--surface2)' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                      style={{ background: 'var(--indigo)' }}>{i + 1}</span>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={reset} className="btn-secondary flex-1">
                Upload Different Resume
              </button>
              <a href="/results" className="btn-primary flex-1 text-center"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                View My Matches →
              </a>
            </div>
          </div>
        )}

        {/* Info cards at bottom if idle */}
        {stage === 'idle' && (
          <div className="grid grid-cols-3 gap-4 fade-up fade-up-3">
            {[
              { icon: '🔍', title: 'What we analyze', desc: 'GPA, achievements, skills, certifications, and extracurriculars' },
              { icon: '📈', title: 'What you get', desc: 'Readiness score, detected skills, and 5 personalized improvement tips' },
              { icon: '🔒', title: 'Your privacy', desc: 'File is analyzed locally. Never stored or shared with anyone.' },
            ].map(c => (
              <div key={c.title} className="card p-4">
                <div className="text-xl mb-2">{c.icon}</div>
                <p className="font-bold text-xs mb-1" style={{ color: 'var(--text)' }}>{c.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

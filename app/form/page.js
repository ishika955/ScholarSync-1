'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '../../components/AppShell';

const STEPS = ['Personal Info', 'Academics', 'Background'];

const states = ['Andhra Pradesh','Bihar','Delhi','Gujarat','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana',
  'Uttar Pradesh','West Bengal','Other'];

const fields = ['Computer Science','Engineering','Medicine','Law','Business',
  'Arts & Humanities','Social Sciences','Agriculture','Architecture','Other'];

const categories = ['General','OBC','SC','ST','EWS','Other'];

function StepDots({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all"
                style={{
                  background: done ? '#059669' : active ? 'var(--indigo)' : 'white',
                  color: done || active ? 'white' : 'var(--text3)',
                  border: `2px solid ${done ? '#059669' : active ? 'var(--indigo)' : 'var(--border)'}`,
                  boxShadow: active ? '0 0 0 4px rgba(79,70,229,0.15)' : 'none',
                }}>
                {done ? '✓' : n}
              </div>
              <span className="text-xs font-semibold whitespace-nowrap"
                style={{ color: active ? 'var(--indigo)' : done ? '#059669' : 'var(--text3)' }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-0.5 w-16 mx-3 mb-5 rounded"
                style={{ background: done ? '#059669' : 'var(--border)' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Label({ children, hint }) {
  return (
    <div className="mb-1.5">
      <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{children}</label>
      {hint && <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{hint}</p>}
    </div>
  );
}

export default function FormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '',
    gpa: '', percentage: '', field: 'Computer Science', year: '', achievements: '',
    income: '', category: 'General', gender: 'Male', disability: 'No',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    setLoading(true);
    sessionStorage.setItem('profileData', JSON.stringify(form));
    setTimeout(() => router.push('/results'), 1600);
  };

  const ic = 'input-base';
  const sel = 'input-base';

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Page header */}
        <div className="mb-8 fade-up fade-up-1">
          <h1 className="text-3xl font-bold serif mb-1" style={{ color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Build Your Profile
          </h1>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            We use this to rank scholarships by your real odds of winning.
          </p>
        </div>

        <StepDots current={step} />

        <div className="card p-8 fade-up fade-up-2">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="pb-4 mb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>Personal Information</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>Basic details to identify scholarship categories</p>
              </div>

              <div>
                <Label>Full Name *</Label>
                <input className={ic} placeholder="e.g. Arjun Sharma" value={form.name}
                  onChange={e => set('name', e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email Address</Label>
                  <input className={ic} type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <input className={ic} type="tel" placeholder="+91 98765 43210" value={form.phone}
                    onChange={e => set('phone', e.target.value)} />
                </div>
              </div>

              <div>
                <Label hint="Used to surface state-level scholarships">State / UT</Label>
                <select className={sel} value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">Select your state</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <Label>Gender</Label>
                <div className="flex gap-2 mt-1">
                  {['Male','Female','Other'].map(g => (
                    <button key={g} type="button" onClick={() => set('gender', g)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                      style={{
                        borderColor: form.gender === g ? 'var(--indigo)' : 'var(--border)',
                        background: form.gender === g ? 'var(--indigo-light)' : 'white',
                        color: form.gender === g ? 'var(--indigo)' : 'var(--text2)',
                      }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="pb-4 mb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>Academic Details</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>This is the biggest factor in your scholarship match score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label hint="Out of 10 or 4.0 — we auto-detect">GPA / CGPA</Label>
                  <input className={ic} type="number" min="0" max="10" step="0.01"
                    placeholder="e.g. 8.5 or 3.7" value={form.gpa}
                    onChange={e => set('gpa', e.target.value)} />
                </div>
                <div>
                  <Label hint="Your last board/university exam">Percentage %</Label>
                  <input className={ic} type="number" min="0" max="100" step="0.1"
                    placeholder="e.g. 86.4" value={form.percentage}
                    onChange={e => set('percentage', e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Field of Study</Label>
                <select className={sel} value={form.field} onChange={e => set('field', e.target.value)}>
                  {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <Label>Current Year of Study</Label>
                <select className={sel} value={form.year} onChange={e => set('year', e.target.value)}>
                  <option value="">Select year</option>
                  <option value="1">1st Year (UG)</option>
                  <option value="2">2nd Year (UG)</option>
                  <option value="3">3rd Year (UG)</option>
                  <option value="4">4th Year (UG)</option>
                  <option value="pg">Post Graduate</option>
                  <option value="phd">PhD / Research</option>
                </select>
              </div>

              <div>
                <Label hint="Awards, sports, clubs, volunteering — each helps your score">
                  Achievements & Extracurriculars
                </Label>
                <textarea className={ic} rows={3} style={{ resize: 'none' }}
                  placeholder="e.g. State chess champion, NSS volunteer, Hackathon finalist, NCC..."
                  value={form.achievements} onChange={e => set('achievements', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="pb-4 mb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-base" style={{ color: 'var(--text)' }}>Family & Background</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>Used to match you with need-based and reserved category scholarships</p>
              </div>

              <div>
                <Label hint="Total household income per year">Annual Family Income</Label>
                <select className={sel} value={form.income} onChange={e => set('income', e.target.value)}>
                  <option value="">Select income range</option>
                  <option value="below1">Below ₹1 Lakh</option>
                  <option value="1to3">₹1 Lakh – ₹3 Lakh</option>
                  <option value="3to6">₹3 Lakh – ₹6 Lakh</option>
                  <option value="6to10">₹6 Lakh – ₹10 Lakh</option>
                  <option value="above10">Above ₹10 Lakh</option>
                </select>
              </div>

              <div>
                <Label hint="Select your social category for reserved quota scholarships">Category</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {categories.map(cat => (
                    <button key={cat} type="button" onClick={() => set('category', cat)}
                      className="py-3 rounded-xl text-sm font-semibold border transition-all"
                      style={{
                        borderColor: form.category === cat ? 'var(--indigo)' : 'var(--border)',
                        background: form.category === cat ? 'var(--indigo)' : 'white',
                        color: form.category === cat ? 'white' : 'var(--text2)',
                        boxShadow: form.category === cat ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Person with Disability (PwD)?</Label>
                <div className="flex gap-2 mt-1">
                  {['No','Yes'].map(v => (
                    <button key={v} type="button" onClick={() => set('disability', v)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                      style={{
                        borderColor: form.disability === v ? 'var(--indigo)' : 'var(--border)',
                        background: form.disability === v ? 'var(--indigo-light)' : 'white',
                        color: form.disability === v ? 'var(--indigo)' : 'var(--text2)',
                      }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary preview */}
              <div className="p-4 rounded-xl" style={{ background: 'var(--surface2)', border: '1.5px solid var(--border)' }}>
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--text3)' }}>PROFILE PREVIEW</p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    ['Name', form.name || '—'],
                    ['GPA', form.gpa || '—'],
                    ['Field', form.field],
                    ['Category', form.category],
                    ['Income', form.income || '—'],
                    ['Gender', form.gender],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: 'var(--text3)' }}>{k}:</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className="btn-secondary" style={{ opacity: step === 1 ? 0.4 : 1 }}>
              ← Back
            </button>
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i + 1 === step ? 'var(--indigo)' : i + 1 < step ? '#059669' : 'var(--border)' }} />
              ))}
            </div>
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-primary">
                Continue →
              </button>
            ) : (
              <button onClick={submit} disabled={loading} className="btn-primary">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                    Analyzing...
                  </span>
                ) : 'Find My Scholarships →'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--text3)' }}>
          Step {step} of 3 · Your data stays on your device only
        </p>
      </div>
    </AppShell>
  );
}

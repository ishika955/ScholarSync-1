import { scholarships } from '../../../lib/scholarships';

function normalizeGPA(gpa, pct) {
  const g = parseFloat(gpa);
  if (g > 0) return g <= 4.0 ? (g / 4.0) * 10 : g;
  const p = parseFloat(pct);
  if (p > 0) return (p / 100) * 10;
  return 5;
}

function incomeTier(income) {
  return { below1: 1, '1to3': 2, '3to6': 3, '6to10': 4, above10: 5 }[income] || 3;
}

function score(profile, s) {
  const gpa = normalizeGPA(profile.gpa, profile.percentage);
  const income = incomeTier(profile.income);
  let pts = 0;

  pts += (gpa / 10) * 38;

  if (s.needBased) pts += ((5 - income) / 4) * 20;
  else pts += 10;

  if (s.categories.includes('All') || s.categories.includes(profile.category)) pts += 20;
  else pts += 2;

  if (s.fields.includes('All') || s.fields.includes(profile.field)) pts += 15;
  else pts += 2;

  if (!s.genderEligible.includes('All') && !s.genderEligible.includes(profile.gender)) return 5;

  if (profile.gender === 'Female' && s.genderEligible.includes('Female')) pts += 7;

  if (profile.achievements?.trim().length > 20) pts += 5;
  if (profile.disability === 'Yes') pts += 3;

  if (gpa < s.minGPA) pts *= 0.35;

  return Math.round(Math.min(pts, 100));
}

function priority(sc) {
  return sc >= 75 ? 'High Fit' : sc >= 50 ? 'Medium Fit' : 'Stretch';
}

export async function POST(req) {
  const profile = await req.json();
  const matched = scholarships
    .map(s => ({ ...s, matchScore: score(profile, s), priority: priority(score(profile, s)) }))
    .sort((a, b) => b.matchScore - a.matchScore);
  return Response.json({ scholarships: matched });
}

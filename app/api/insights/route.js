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

function calcScore(p) {
  const gpa = normalizeGPA(p.gpa, p.percentage);
  const inc = incomeTier(p.income);
  const catBonus = { SC: 18, ST: 18, OBC: 14, EWS: 16, General: 10, Other: 11 };
  let s = (gpa / 10) * 45 + ((5 - inc) / 4) * 25 + (catBonus[p.category] || 10);
  if (p.gender === 'Female') s += 5;
  if (p.disability === 'Yes') s += 4;
  if (p.achievements?.trim().length > 20) s += 4;
  return Math.min(Math.round(s), 98);
}

function gapAnalysis(p) {
  const gpa = normalizeGPA(p.gpa, p.percentage);
  const inc = incomeTier(p.income);
  const first = p.name?.split(' ')[0] || 'there';

  if (gpa >= 8.5 && inc <= 2)
    return `${first}, your profile is in the top tier! High GPA combined with financial need puts you in contention for India's most prestigious scholarships. Apply early — your biggest edge is timing.`;
  if (gpa >= 7.5 && inc <= 3)
    return `Strong profile, ${first}! You qualify for most merit scholarships. Adding need-based ones to your list will significantly increase your total chances. Focus on early deadlines first.`;
  if (gpa >= 7.0)
    return `You're close to unlocking top scholarships, ${first}. A 0.5 GPA improvement would push you into High Fit for 3 more prestigious ones. For now, field-specific scholarships in ${p.field} are your strongest bets.`;
  if (inc <= 2)
    return `${first}, your income profile is a real asset. Even with a lower GPA, you qualify for multiple need-based scholarships where financial situation matters more than grades. Apply to all of them.`;
  return `${first}, there are solid opportunities available. Applying to multiple scholarships and tailoring your personal statement for each significantly improves your total win probability.`;
}

function tips(p) {
  const gpa = normalizeGPA(p.gpa, p.percentage);
  const inc = incomeTier(p.income);
  const t = [];
  if (gpa < 8) t.push('Improving CGPA by 0.5 unlocks 3+ additional merit scholarships');
  else t.push('Your GPA is strong — prioritize early deadline applications now');
  if (inc <= 2) t.push('Your income tier qualifies for maximum need-based aid — apply to all');
  else t.push('Write tailored personal statements — they matter more for merit scholarships');
  if (['SC','ST','OBC','EWS'].includes(p.category))
    t.push(`Use your ${p.category} quota advantage — apply to reserved category scholarships first`);
  else t.push(`Target field-specific scholarships for ${p.field} — competition is lower`);
  return t;
}

export async function POST(req) {
  const p = await req.json();
  return Response.json({
    successProbability: calcScore(p),
    gapAnalysis: gapAnalysis(p),
    tips: tips(p),
  });
}

// OnePageSummaryDocument.jsx — Premium HR / Psychometric Report Design
// Rendered off-screen via createRoot → captured by html2canvas-pro → single-page landscape PDF.
// ALL styles are inline (html2canvas reads computed styles; Tailwind is NOT used here).

// ─── Design tokens ─────────────────────────────────────────────────────────
const C = {
  navyDark: '#0D2249',
  navy: '#1A3A6B',
  blue: '#1E40AF',
  blueVivid: '#2563EB',
  blueSoft: '#EFF6FF',
  blueLight: '#DBEAFE',
  bluePale: '#F0F5FF',

  ink: '#0F172A',
  inkMid: '#1E293B',
  inkSoft: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  ghost: '#CBD5E1',

  bg: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceAlt: '#F1F5F9',

  border: '#E2E8F0',
  borderBlack: '#000000',

  green: '#15803D',
  greenVivid: '#16A34A',
  greenLight: '#DCFCE7',
  greenBg: '#F0FDF4',

  amber: '#B45309',
  amberVivid: '#D97706',
  amberLight: '#FEF3C7',
  amberBg: '#FFFBEB',

  orange: '#C2410C',
  orangeVivid: '#EA580C',
  orangeLight: '#FFEDD5',
  orangeBg: '#FFF7ED',

  red: '#B91C1C',
  redVivid: '#DC2626',
  redLight: '#FEE2E2',
  redBg: '#FEF2F2',

  purple: '#6D28D9',
  purpleVivid: '#7C3AED',
  purpleLight: '#EDE9FE',
  indigo: '#3730A3',
  indigoVivid: '#4338CA',
  indigoLight: '#E0E7FF',
  teal: '#0F766E',
  tealVivid: '#0D9488',
  tealLight: '#CCFBF1',
  sky: '#0369A1',
  skyVivid: '#0284C7',
  skyLight: '#E0F2FE',
  rose: '#BE123C',
  roseVivid: '#E11D48',
  roseLight: '#FFE4E6',
};

// Big Five: Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Stability
const BIG5_PALETTE = [
  { color: C.purpleVivid, light: C.purpleLight },
  { color: C.indigoVivid, light: C.indigoLight },
  { color: C.tealVivid,   light: C.tealLight },
  { color: C.skyVivid,    light: C.skyLight },
  { color: C.roseVivid,   light: C.roseLight },
];

// Shared card border style applied to every major section
const CARD = {
  border: '2px solid #000',
  borderRadius: 12,
  overflow: 'hidden',
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function HBar({ value, color, height = 5, bg = C.surfaceAlt }) {
  const w = `${Math.max(3, Math.min(100, value))}%`;
  return (
    <div style={{ height, backgroundColor: bg, borderRadius: height / 2, overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ height: '100%', width: w, backgroundColor: color, borderRadius: height / 2 }} />
    </div>
  );
}

function SecHead({ label, accent = C.blueVivid }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 4, height: 17, backgroundColor: accent, borderRadius: 3, flexShrink: 0 }} />
      <span style={{ fontSize: 9, fontWeight: 800, color: C.inkMid, textTransform: 'uppercase', letterSpacing: '0.13em' }}>
        {label}
      </span>
    </div>
  );
}

function Pill({ label, color, bg }) {
  return (
    <span style={{
      fontSize: 7.5, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
      backgroundColor: bg, color: color, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

function LevelBadge({ level }) {
  const s =
    level === 'High'     ? { bg: C.greenLight, color: C.green     } :
    level === 'Moderate' ? { bg: C.blueLight,  color: C.blueVivid } :
                            { bg: C.amberLight, color: C.amber     };
  return <Pill label={level} color={s.color} bg={s.bg} />;
}

function Stars({ count, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ fontSize: 12, color: i < count ? '#F59E0B' : '#E2E8F0', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

function ScoreRing({ value, size = 120 }) {
  const sw = 12;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * circ;
  const col =
    value >= 75 ? C.greenVivid :
    value >= 60 ? C.blueVivid :
    value >= 45 ? C.amberVivid : C.redVivid;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={sw} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={col} strokeWidth={sw} fill="none"
          strokeLinecap="round" strokeDasharray={`${filled} ${circ}`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: C.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</span>
        <span style={{ fontSize: 8.5, color: C.muted, fontWeight: 600, marginTop: 2, letterSpacing: '0.05em' }}>/100</span>
      </div>
    </div>
  );
}

// Small labelled tile used inside the expanded Profile Summary block
function InsightTile({ label, value, color, light, full = false }) {
  return (
    <div style={{
      gridColumn: full ? '1 / -1' : 'auto',
      padding: '10px 13px',
      background: `linear-gradient(135deg, ${light}, #FFFFFF)`,
      borderRadius: 8, borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 7, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{label}</div>
      <div style={{ fontSize: full ? 12.5 : 10.5, color: C.ink, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </div>
  );
}

const PRIORITY_STYLE = {
  High: { color: C.red, bg: C.redLight },
  Medium: { color: C.amber, bg: C.amberLight },
  Low: { color: C.green, bg: C.greenLight },
};

const big5Level = (value) => (value >= 70 ? 'High' : value >= 45 ? 'Moderate' : 'Developing');

// ─── Main component ──────────────────────────────────────────────────────────

export default function OnePageSummaryDocument({
  studentName = 'Student',
  role = 'Assessment Candidate',
  rollNumber = 'N/A',
  college = 'N/A',
  branch = 'N/A',
  collegeEmail = 'student@college.edu',
  personalEmail = 'student@gmail.com',
  assessmentDate = '',
  overallScore = 0,
  employabilityLevel = 'Average',
  profileSummary = '',
  archetype = { name: '', emoji: '👤' },
  bigFiveTraits = [],
  personalityHighlights = [],
  workplaceReadiness = [],
  careerMatches = [],
  topStrengths = [],
  developmentAreas = [],
  preferenceIndicators = [],
  interviewFocusAreas = [],
  hiringRecommendation = { level: 'Recommended', color: C.blueVivid, bgColor: C.blueSoft, icon: '✓' },
  hiringText = '',
  coreLearningStyle = '',
  growthMindsetIndicator = '',
  cognitiveProcessingStyle = '',
  decisionMakingStyle = '',
}) {
  const rec = hiringRecommendation;

  const fitColorFor = (match) => (match >= 85 ? C.greenVivid : match >= 75 ? C.blueVivid : C.amberVivid);
  const fitBgFor = (match) => (match >= 85 ? C.greenLight : match >= 75 ? C.blueLight : C.amberLight);
  const fitLabelFor = (match) => (match >= 85 ? 'Strong' : match >= 75 ? 'Good' : 'Fair');

  return (
    <div style={{
      width: 1200,
      backgroundColor: C.bg,
      fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
      color: C.ink,
      fontSize: 10,
      lineHeight: 1.55,
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '22px 30px 0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 18, gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 11,
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>P</span>
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.1 }}>PersonaVerse</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 3 }}>AI-Powered Psychometric Platform</div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>
              Student Intelligence Report
            </div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: '0.04em' }}>
              Personality Assessment &amp; Employability Analysis
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Report Date</div>
            <div style={{ fontSize: 10.5, color: '#FFFFFF', fontWeight: 600 }}>{assessmentDate}</div>
            <div style={{
              marginTop: 8, display: 'inline-block', padding: '3px 12px', borderRadius: 20,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              fontSize: 7.5, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Confidential</div>
          </div>
        </div>
        <div style={{ height: 4, background: 'linear-gradient(90deg, #6D28D9, #2563EB, #0D9488)' }} />
      </div>

      {/* ── CONTENT (padded, bordered cards) ── */}
      <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* ROW 1 — Explorer Card · Employability Index · Profile Summary */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'stretch' }}>

          {/* Explorer Card */}
          <div style={{ ...CARD, width: 320, flexShrink: 0, backgroundColor: C.surface, padding: '18px 20px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.blueVivid}, ${C.navy})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 13, border: `2px solid ${C.blueLight}`,
            }}>
              <span style={{ fontSize: 24, lineHeight: 1 }}>{archetype.emoji || '👤'}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, marginBottom: 11, lineHeight: 1.2 }}>{studentName}</div>
            {[
              ['Role', role],
              ['Roll Number', rollNumber],
              ['College', college],
              ['Branch', branch],
              ['College Email', collegeEmail],
              ['Personal Email', personalEmail],
              ['Assessment Date', assessmentDate],
            ].map(([lbl, val]) => (
              <div key={lbl} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 7, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{lbl}</div>
                <div style={{ fontSize: 9, color: C.inkSoft, fontWeight: 600, marginTop: 2, wordBreak: 'break-word' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Employability Index */}
          <div style={{
            ...CARD, width: 248, flexShrink: 0, padding: '18px 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bluePale} 100%)`,
          }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, textAlign: 'center' }}>
              Overall Employability Index
            </div>
            <ScoreRing value={overallScore} size={120} />
            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, letterSpacing: '-0.01em' }}>{employabilityLevel}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{
                  display: 'inline-block', padding: '5px 14px', borderRadius: 20,
                  backgroundColor: rec.bgColor, color: rec.color,
                  fontSize: 8.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
                  border: `1px solid ${rec.color}30`,
                }}>
                  {rec.icon} {rec.level}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div style={{ ...CARD, flex: 1, padding: '18px 22px' }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Profile Summary</div>
            <div style={{ fontSize: 9.5, lineHeight: 1.7, color: C.inkSoft, marginBottom: 14 }}>{profileSummary}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <InsightTile full label="Primary Archetype" value={archetype.name} color={C.blueVivid} light={C.blueSoft} />
              {coreLearningStyle ? (
                <InsightTile label="Core Learning Style" value={coreLearningStyle} color={C.tealVivid} light={C.tealLight} />
              ) : null}
              {growthMindsetIndicator ? (
                <InsightTile label="Growth Mindset Indicator" value={growthMindsetIndicator} color={C.purpleVivid} light={C.purpleLight} />
              ) : null}
              {cognitiveProcessingStyle ? (
                <InsightTile label="Cognitive Processing Style" value={cognitiveProcessingStyle} color={C.skyVivid} light={C.skyLight} />
              ) : null}
              {decisionMakingStyle ? (
                <InsightTile label="Decision Making Style" value={decisionMakingStyle} color={C.roseVivid} light={C.roseLight} />
              ) : null}
            </div>
          </div>
        </div>

        {/* ROW 2 — Big Five Traits · Personality Highlights */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'stretch' }}>

          {/* Big Five Traits */}
          <div style={{ ...CARD, width: 640, flexShrink: 0, padding: '20px 24px' }}>
            <SecHead label="Big Five Personality Traits" />
            {bigFiveTraits.map((trait, i) => {
              const pal = BIG5_PALETTE[i] || BIG5_PALETTE[0];
              const level = big5Level(trait.value);
              return (
                <div key={trait.key} style={{ marginBottom: i < bigFiveTraits.length - 1 ? 16 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 6,
                        backgroundColor: pal.light, border: `1.5px solid ${pal.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: pal.color }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.inkMid }}>{trait.label}</span>
                      <span style={{ fontSize: 7.5, color: C.faint, fontWeight: 700, letterSpacing: '0.08em' }}>{trait.abbr}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 8, color: C.muted, fontWeight: 500 }}>{trait.value}th percentile</span>
                      <LevelBadge level={level} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <HBar value={trait.value} color={pal.color} height={9} bg={pal.light} />
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: pal.color, width: 30, textAlign: 'right', flexShrink: 0 }}>
                      {trait.value}
                    </span>
                  </div>
                  {trait.desc ? (
                    <div style={{ fontSize: 8, color: C.faint, marginTop: 4, lineHeight: 1.5 }}>{trait.desc}</div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Personality Highlights */}
          <div style={{ ...CARD, flex: 1, padding: '20px 22px' }}>
            <SecHead label="Personality Highlights" accent={C.purpleVivid} />
            {personalityHighlights.slice(0, 5).map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 11,
                marginBottom: i < personalityHighlights.length - 1 ? 11 : 0,
                padding: '10px 13px', borderRadius: 8,
                backgroundColor: i % 2 === 0 ? C.surface : C.bg,
                borderLeft: `3px solid ${BIG5_PALETTE[i % 5].color}`,
              }}>
                <span style={{ fontSize: 17, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: C.inkMid }}>{s.title}</div>
                  <div style={{ fontSize: 8, color: C.muted, lineHeight: 1.55, marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3 — Workplace Readiness · Top Strengths · Development Areas */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'stretch' }}>

          {/* Workplace Readiness */}
          <div style={{ ...CARD, flex: 1, padding: '16px 18px' }}>
            <SecHead label="Workplace Readiness" accent={C.tealVivid} />
            {workplaceReadiness.map((item, i) => (
              <div key={item.key} style={{ marginBottom: i < workplaceReadiness.length - 1 ? 11 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: C.inkSoft, fontWeight: 600 }}>{item.label}</span>
                  <Stars count={item.stars} />
                </div>
                <HBar value={(item.stars / 5) * 100} color={C.tealVivid} height={5} bg={C.tealLight} />
              </div>
            ))}
          </div>

          {/* Top Strengths */}
          <div style={{ ...CARD, flex: 1, padding: '16px 18px' }}>
            <SecHead label="Top Strengths" accent={C.greenVivid} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {topStrengths.slice(0, 4).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <div style={{
                    width: 19, height: 19, borderRadius: '50%',
                    backgroundColor: C.greenBg, border: `1.5px solid ${C.greenLight}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 0.5,
                  }}>
                    <span style={{ fontSize: 9.5, color: C.green, lineHeight: 1, fontWeight: 700 }}>✓</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.inkMid }}>{s.title}</div>
                    <div style={{ fontSize: 8, color: C.muted, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Areas */}
          <div style={{ ...CARD, flex: 1, padding: '16px 18px' }}>
            <SecHead label="Development Areas" accent={C.orangeVivid} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {developmentAreas.slice(0, 3).map((area) => {
                const pri = PRIORITY_STYLE[area.priority] || PRIORITY_STYLE.Medium;
                return (
                  <div key={area.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{
                      width: 19, height: 19, borderRadius: '50%',
                      backgroundColor: C.orangeBg, border: `1.5px solid ${C.orangeLight}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 0.5,
                    }}>
                      <span style={{ fontSize: 9.5, color: C.orangeVivid, lineHeight: 1, fontWeight: 700 }}>!</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: C.inkMid }}>{area.label}</span>
                        {area.priority ? <Pill label={`${area.priority} Priority`} color={pri.color} bg={pri.bg} /> : null}
                      </div>
                      <div style={{ fontSize: 8, color: C.muted, lineHeight: 1.5 }}>{area.action}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ROW 4 — Role Fit Analysis (full width, one row per role) */}
        <div style={{ ...CARD, padding: '20px 24px' }}>
          <SecHead label="Role Fit Analysis" accent={C.blueVivid} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {careerMatches.slice(0, 6).map((career) => {
              const fitColor = fitColorFor(career.match);
              const fitBg = fitBgFor(career.match);
              const fitLabel = fitLabelFor(career.match);
              return (
                <div key={career.title} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 16px', borderRadius: 8, backgroundColor: C.surface,
                }}>
                  <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, width: 26 }}>{career.emoji}</span>
                  <span style={{ flex: '0 0 230px', fontSize: 10.5, fontWeight: 700, color: C.inkMid }}>{career.title}</span>
                  <div style={{ flex: 1 }}>
                    <HBar value={career.match} color={fitColor} height={10} bg={C.surfaceAlt} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: fitColor, width: 50, textAlign: 'right', flexShrink: 0 }}>{career.match}%</span>
                  <div style={{ width: 78, textAlign: 'right', flexShrink: 0 }}>
                    <Pill label={fitLabel} color={fitColor} bg={fitBg} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 5 — Interview Focus Areas (2x2 large cards) */}
        <div style={{ ...CARD, padding: '20px 24px' }}>
          <SecHead label="Interview Focus Areas" accent={C.skyVivid} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {interviewFocusAreas.map((area, i) => {
              const isStrength = area.type === 'strength';
              const col = isStrength ? C.tealVivid : C.skyVivid;
              const bg = isStrength ? C.tealLight : C.skyLight;
              return (
                <div key={area.title + i} style={{
                  padding: '18px 20px',
                  backgroundColor: bg, borderRadius: 10, borderLeft: `4px solid ${col}`,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: col, textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 }}>
                    {area.title}
                  </div>
                  <div style={{ fontSize: 9.5, color: C.inkSoft, lineHeight: 1.7 }}>{area.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 6 — Preference Indicators (equal-width horizontal cards) */}
        <div style={{ ...CARD, padding: '20px 24px', backgroundColor: C.surface }}>
          <SecHead label="Preference Indicators" accent={C.indigoVivid} />
          <div style={{ display: 'flex', gap: 14 }}>
            {preferenceIndicators.map((pref) => (
              <div key={pref.dimension} style={{
                flex: 1, padding: '16px 18px', backgroundColor: C.bg, borderRadius: 10,
                border: `1px solid ${C.border}`, borderTop: `4px solid ${C.indigoVivid}`,
              }}>
                <div style={{ fontSize: 7.5, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{pref.dimension}</div>
                <div style={{ fontSize: 13.5, color: C.inkMid, fontWeight: 800, marginTop: 6 }}>{pref.label}</div>
                {pref.desc ? (
                  <div style={{ fontSize: 8.5, color: C.muted, marginTop: 7, lineHeight: 1.65 }}>{pref.desc}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* ROW 7 — Hiring Recommendation (full-width banner) */}
        <div style={{
          ...CARD,
          padding: '22px 26px',
          display: 'flex', alignItems: 'center', gap: 24,
          background: `linear-gradient(135deg, ${rec.bgColor}, ${C.bg})`,
          borderLeft: `6px solid ${rec.color}`,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', backgroundColor: rec.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, border: `3px solid ${rec.color}40`, boxShadow: `0 0 0 5px ${rec.bgColor}`,
          }}>
            <span style={{ fontSize: 30, color: '#FFFFFF', lineHeight: 1 }}>{rec.icon}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 5 }}>Hiring Recommendation</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: rec.color, letterSpacing: '-0.02em', marginBottom: 7, lineHeight: 1 }}>{rec.level}</div>
            <div style={{ fontSize: 10, color: C.inkSoft, lineHeight: 1.65, maxWidth: 760 }}>{hiringText}</div>
          </div>
          <div style={{
            textAlign: 'center', padding: '12px 26px', backgroundColor: C.bg, borderRadius: 10,
            border: `1.5px solid ${C.border}`, flexShrink: 0,
          }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: rec.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{overallScore}</div>
            <div style={{ fontSize: 7.5, color: C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>Overall Score</div>
          </div>
        </div>

      </div>

      {/* ── FOOTER (3-column layout) ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`, padding: '22px 28px 18px' }}>
        <div style={{ display: 'flex', gap: 32, marginBottom: 14 }}>
          {[
            {
              title: 'Assessment Details',
              body: `Assessment: PersonaVerse Personality Index\nDate: ${assessmentDate}\nStudent: ${studentName}`,
            },
            {
              title: 'Percentile Guide',
              body: '■ 70–100 · High Proficiency\n■ 45–69 · Moderate Proficiency\n■ 0–44 · Developing Stage',
            },
            {
              title: 'About This Report',
              body: 'Derived from the PersonaVerse Psychometric Assessment using validated Big Five methodology. For academic and institutional use. © 2026 PersonaVerse.',
            },
          ].map((col) => (
            <div key={col.title} style={{ flex: 1 }}>
              <div style={{
                fontSize: 8, fontWeight: 800, color: '#FFFFFF',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8,
                paddingBottom: 7, borderBottom: '1px solid rgba(255,255,255,0.12)',
              }}>
                {col.title}
              </div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
                {col.body}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, textAlign: 'center', fontSize: 8.5, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', letterSpacing: '0.01em' }}>
          "The best investment you can make is an investment in yourself. The more you learn, the more you earn." — Warren Buffett
        </div>
      </div>

    </div>
  );
}

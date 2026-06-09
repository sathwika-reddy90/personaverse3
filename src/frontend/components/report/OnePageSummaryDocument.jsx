// OnePageSummaryDocument.jsx — Premium HR / Psychometric Report Design
// Rendered off-screen via createRoot → captured by html2canvas-pro → A4 PDF.
// ALL styles are inline (html2canvas reads computed styles; Tailwind is NOT used here).

// ─── Design tokens ─────────────────────────────────────────────────────────
const C = {
  // Brand blues
  navyDark: '#0D2249',
  navy: '#1A3A6B',
  blue: '#1E40AF',
  blueVivid: '#2563EB',
  blueSoft: '#EFF6FF',
  blueLight: '#DBEAFE',
  bluePale: '#F0F5FF',

  // Text
  ink: '#0F172A',
  inkMid: '#1E293B',
  inkSoft: '#334155',
  muted: '#64748B',
  faint: '#94A3B8',
  ghost: '#CBD5E1',

  // Surfaces
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceAlt: '#F1F5F9',

  // Borders
  border: '#E2E8F0',

  // Semantic
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

  // Trait palette
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
  { color: C.purpleVivid, light: C.purpleLight, label: 'OPN' },
  { color: C.indigoVivid, light: C.indigoLight, label: 'CON' },
  { color: C.tealVivid,   light: C.tealLight,   label: 'EXT' },
  { color: C.skyVivid,    light: C.skyLight,     label: 'AGR' },
  { color: C.roseVivid,   light: C.roseLight,    label: 'EST' },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function ScoreRing({ value, size = 108 }) {
  const sw = 11;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * circ;
  const col =
    value >= 75 ? C.greenVivid :
    value >= 60 ? C.blueVivid :
    value >= 45 ? C.amberVivid : C.redVivid;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        {/* track */}
        <circle cx={size/2} cy={size/2} r={r} stroke="#E2E8F0" strokeWidth={sw} fill="none" />
        {/* filled arc */}
        <circle cx={size/2} cy={size/2} r={r} stroke={col} strokeWidth={sw} fill="none"
          strokeLinecap="round" strokeDasharray={`${filled} ${circ}`} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: C.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</span>
        <span style={{ fontSize: 7, color: C.muted, fontWeight: 600, marginTop: 1, letterSpacing: '0.05em' }}>/100</span>
      </div>
    </div>
  );
}

function Stars({ count, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 1.5 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ fontSize: 10.5, color: i < count ? '#F59E0B' : '#E2E8F0', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      <div style={{ width: 3, height: 15, backgroundColor: accent, borderRadius: 3, flexShrink: 0 }} />
      <span style={{ fontSize: 8, fontWeight: 800, color: C.inkMid, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {label}
      </span>
    </div>
  );
}

function Pill({ label, color, bg }) {
  return (
    <span style={{
      fontSize: 6.5, fontWeight: 700, padding: '2px 7px', borderRadius: 20,
      backgroundColor: bg, color: color, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

function LevelBadge({ level }) {
  const s =
    level === 'High'      ? { bg: C.greenLight,  color: C.green       } :
    level === 'Moderate'  ? { bg: C.blueLight,   color: C.blueVivid   } :
                            { bg: C.amberLight,  color: C.amber       };
  return <Pill label={level} color={s.color} bg={s.bg} />;
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function OnePageSummaryDocument({
  studentName = 'Student',
  rollNumber = 'N/A',
  college = 'N/A',
  branch = 'N/A',
  assessmentDate = '',
  overallScore = 0,
  employabilityLevel = 'Average',
  profileSummary = '',
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
  archetype = { name: '' },
}) {
  const rec = hiringRecommendation;

  return (
    <div style={{
      width: 794,
      backgroundColor: C.bg,
      fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
      color: C.ink,
      fontSize: 9,
      lineHeight: 1.45,
    }}>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — HEADER
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '14px 22px 0',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14 }}>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>P</span>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                PersonaVerse
              </div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>
                AI-Powered Psychometric Platform
              </div>
            </div>
          </div>

          {/* Report title (center) */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>
              Student Intelligence Report
            </div>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.55)', marginTop: 3, letterSpacing: '0.04em' }}>
              Personality Assessment &amp; Employability Analysis
            </div>
          </div>

          {/* Meta right */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
              Report Date
            </div>
            <div style={{ fontSize: 9, color: '#FFFFFF', fontWeight: 600 }}>{assessmentDate}</div>
            <div style={{
              marginTop: 6, display: 'inline-block',
              padding: '2px 10px', borderRadius: 20,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: 6.5, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Confidential
            </div>
          </div>
        </div>

        {/* Accent stripe */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #6D28D9, #2563EB, #0D9488)' }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — PROFILE OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', borderBottom: `1.5px solid ${C.border}` }}>

        {/* LEFT — student info */}
        <div style={{
          width: '26%',
          backgroundColor: C.surface,
          padding: '14px 16px',
          borderRight: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.blueVivid}, ${C.navy})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 10,
            border: `3px solid ${C.blueLight}`,
          }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>👤</span>
          </div>

          {/* Name */}
          <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginBottom: 1, lineHeight: 1.2 }}>{studentName}</div>
          <div style={{ fontSize: 7, color: C.muted, marginBottom: 10, fontWeight: 500 }}>Assessment Candidate</div>

          {/* Info rows */}
          {[
            ['Roll Number', rollNumber],
            ['College', college],
            ['Branch', branch],
            ['Assessment Date', assessmentDate],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ marginBottom: 7 }}>
              <div style={{ fontSize: 6, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{lbl}</div>
              <div style={{ fontSize: 8, color: C.inkSoft, fontWeight: 600, marginTop: 1.5 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* CENTER — employability score */}
        <div style={{
          width: '26%',
          padding: '16px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRight: `1px solid ${C.border}`,
          flexShrink: 0,
          background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bluePale} 100%)`,
        }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, textAlign: 'center' }}>
            Overall Employability Index
          </div>

          <ScoreRing value={overallScore} size={108} />

          <div style={{ marginTop: 11, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.navy, letterSpacing: '-0.01em' }}>{employabilityLevel}</div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                backgroundColor: rec.bgColor, color: rec.color,
                fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
                border: `1px solid ${rec.color}30`,
              }}>
                {rec.icon} {rec.level}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — profile summary */}
        <div style={{ flex: 1, padding: '14px 16px' }}>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 7 }}>
            Profile Summary
          </div>
          <div style={{ fontSize: 8.5, lineHeight: 1.6, color: C.inkSoft }}>{profileSummary}</div>

          {/* Archetype pill */}
          <div style={{
            marginTop: 10, padding: '8px 11px',
            background: `linear-gradient(135deg, ${C.blueSoft}, ${C.bluePale})`,
            borderRadius: 8,
            borderLeft: `3px solid ${C.blueVivid}`,
          }}>
            <div style={{ fontSize: 6.5, color: C.blueVivid, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
              Primary Archetype
            </div>
            <div style={{ fontSize: 10, color: C.navy, fontWeight: 800, marginTop: 2 }}>{archetype.name}</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTIONS 3 + 4 — BIG FIVE  +  PERSONALITY HIGHLIGHTS
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', borderBottom: `1.5px solid ${C.border}` }}>

        {/* Big Five */}
        <div style={{ width: '54%', padding: '12px 16px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Big Five Personality Traits" />

          {bigFiveTraits.map((trait, i) => {
            const pal = BIG5_PALETTE[i] || BIG5_PALETTE[0];
            return (
              <div key={trait.key} style={{ marginBottom: 9 }}>
                {/* Trait header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {/* Color swatch */}
                    <div style={{
                      width: 18, height: 18, borderRadius: 5,
                      backgroundColor: pal.light,
                      border: `1.5px solid ${pal.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: pal.color }} />
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.inkMid }}>{trait.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 7, color: C.muted, fontWeight: 500 }}>{trait.value}th percentile</span>
                    <LevelBadge level={trait.level} />
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1 }}>
                    <HBar value={trait.value} color={pal.color} height={7} bg={pal.light} />
                  </div>
                  <span style={{
                    fontSize: 7.5, fontWeight: 800, color: pal.color,
                    width: 26, textAlign: 'right', flexShrink: 0,
                  }}>
                    {trait.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personality Highlights */}
        <div style={{ flex: 1, padding: '12px 14px' }}>
          <SecHead label="Personality Highlights" accent={C.purpleVivid} />
          {personalityHighlights.slice(0, 5).map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8,
              padding: '5px 8px', borderRadius: 7,
              backgroundColor: i % 2 === 0 ? C.surface : C.bg,
              borderLeft: `2.5px solid ${BIG5_PALETTE[i % 5].color}`,
            }}>
              <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: 8.5, fontWeight: 700, color: C.inkMid }}>{s.title}</div>
                <div style={{ fontSize: 7, color: C.muted, lineHeight: 1.45, marginTop: 1 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTIONS 5 + 6 + 7 + 8 — WORKPLACE  ·  ROLE FIT  ·  STRENGTHS  ·  DEV
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ display: 'flex', borderBottom: `1.5px solid ${C.border}` }}>

        {/* Workplace Readiness */}
        <div style={{ width: '28%', padding: '12px 14px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Workplace Readiness" accent={C.tealVivid} />
          {workplaceReadiness.map((item) => (
            <div key={item.key} style={{ marginBottom: 7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2.5 }}>
                <span style={{ fontSize: 7.5, color: C.inkSoft, fontWeight: 500 }}>{item.label}</span>
                <Stars count={item.stars} />
              </div>
              <HBar value={(item.stars / 5) * 100} color={C.tealVivid} height={3} bg={C.tealLight} />
            </div>
          ))}
        </div>

        {/* Role Fit Analysis */}
        <div style={{ width: '40%', padding: '12px 13px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Role Fit Analysis" accent={C.blueVivid} />

          {/* Column headers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5,
            padding: '3px 7px', backgroundColor: C.surface, borderRadius: 5 }}>
            <span style={{ flex: 1, fontSize: 6.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Role</span>
            <span style={{ width: 80, fontSize: 6.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Score</span>
            <span style={{ width: 32, fontSize: 6.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'right' }}>Fit</span>
          </div>

          {careerMatches.slice(0, 8).map((career) => {
            const fitColor = career.match >= 85 ? C.greenVivid : career.match >= 75 ? C.blueVivid : C.amberVivid;
            const fitBg    = career.match >= 85 ? C.greenLight  : career.match >= 75 ? C.blueLight  : C.amberLight;
            const fitLabel = career.match >= 85 ? 'Strong' : career.match >= 75 ? 'Good' : 'Fair';
            return (
              <div key={career.title} style={{
                display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4.5,
                padding: '3px 7px', borderRadius: 5,
              }}>
                <span style={{ fontSize: 10, lineHeight: 1, flexShrink: 0, width: 14 }}>{career.emoji}</span>
                <span style={{ flex: 1, fontSize: 8, fontWeight: 600, color: C.inkMid }}>{career.title}</span>
                <div style={{ width: 80, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ flex: 1 }}>
                    <HBar value={career.match} color={fitColor} height={4} bg={C.surfaceAlt} />
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 700, color: fitColor, width: 22, textAlign: 'right', flexShrink: 0 }}>{career.match}%</span>
                </div>
                <div style={{ width: 32, textAlign: 'right', flexShrink: 0 }}>
                  <Pill label={fitLabel} color={fitColor} bg={fitBg} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengths + Development */}
        <div style={{ flex: 1, padding: '12px 13px' }}>
          <SecHead label="Top Strengths" accent={C.greenVivid} />
          {topStrengths.slice(0, 4).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: C.greenBg,
                border: `1.5px solid ${C.greenLight}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 0.5,
              }}>
                <span style={{ fontSize: 8, color: C.green, lineHeight: 1, fontWeight: 700 }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: 8, fontWeight: 700, color: C.inkMid }}>{s.title}</div>
                <div style={{ fontSize: 6.5, color: C.muted, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 9, paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
            <SecHead label="Development Areas" accent={C.orangeVivid} />
            {developmentAreas.slice(0, 3).map((area) => (
              <div key={area.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5.5 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  backgroundColor: C.orangeBg,
                  border: `1.5px solid ${C.orangeLight}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 0.5,
                }}>
                  <span style={{ fontSize: 8, color: C.orangeVivid, lineHeight: 1, fontWeight: 700 }}>!</span>
                </div>
                <div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: C.inkMid }}>{area.label}</div>
                  <div style={{ fontSize: 6.5, color: C.muted, lineHeight: 1.4 }}>{area.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9 — PREFERENCE INDICATORS
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: '11px 16px', borderBottom: `1.5px solid ${C.border}`, backgroundColor: C.surface }}>
        <SecHead label="Preference Indicators" accent={C.indigoVivid} />
        <div style={{ display: 'flex', gap: 8 }}>
          {preferenceIndicators.map((pref) => (
            <div key={pref.label} style={{
              flex: 1,
              padding: '7px 10px',
              backgroundColor: C.bg,
              borderRadius: 8,
              borderTop: `3px solid ${C.indigoVivid}`,
              border: `1px solid ${C.border}`,
              borderTopWidth: 3,
              borderTopColor: C.indigoVivid,
            }}>
              <div style={{ fontSize: 6, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{pref.label}</div>
              <div style={{ fontSize: 8.5, color: C.inkMid, fontWeight: 700, marginTop: 3 }}>{pref.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 10 — INTERVIEW FOCUS AREAS
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ padding: '11px 16px', borderBottom: `1.5px solid ${C.border}` }}>
        <SecHead label="Interview Focus Areas" accent={C.skyVivid} />
        <div style={{ display: 'flex', gap: 8 }}>
          {interviewFocusAreas.map((area, i) => {
            const palette = [C.blueVivid, C.purpleVivid, C.tealVivid, C.indigoVivid];
            const palLight = [C.blueSoft, C.purpleLight, C.tealLight, C.indigoLight];
            const col = palette[i % palette.length];
            const bg  = palLight[i % palLight.length];
            return (
              <div key={area.title} style={{
                flex: 1,
                padding: '8px 10px',
                backgroundColor: bg,
                borderRadius: 8,
                borderLeft: `3px solid ${col}`,
              }}>
                <div style={{
                  fontSize: 7, fontWeight: 800, color: col,
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4,
                }}>
                  {area.title}
                </div>
                <div style={{ fontSize: 7.5, color: C.inkSoft, lineHeight: 1.5 }}>{area.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 11 — HIRING RECOMMENDATION
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: '13px 16px',
        background: `linear-gradient(135deg, ${rec.bgColor}, ${C.bg})`,
        borderBottom: `1.5px solid ${C.border}`,
        borderLeft: `5px solid ${rec.color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Recommendation circle */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            backgroundColor: rec.color,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: `3px solid ${rec.color}40`,
            boxShadow: `0 0 0 4px ${rec.bgColor}`,
          }}>
            <span style={{ fontSize: 26, color: '#FFFFFF', lineHeight: 1 }}>{rec.icon}</span>
          </div>

          {/* Text block */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 6.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>
              Hiring Recommendation
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: rec.color, letterSpacing: '-0.02em', marginBottom: 5, lineHeight: 1 }}>
              {rec.level}
            </div>
            <div style={{ fontSize: 8.5, color: C.inkSoft, lineHeight: 1.6, maxWidth: 620 }}>{hiringText}</div>
          </div>

          {/* Score badge */}
          <div style={{
            textAlign: 'center', padding: '10px 16px',
            backgroundColor: C.bg, borderRadius: 10,
            border: `1.5px solid ${C.border}`,
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: rec.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{overallScore}</div>
            <div style={{ fontSize: 6.5, color: C.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Overall Score</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 12 — FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
        padding: '12px 22px 11px',
      }}>
        {/* 3-column info */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 9 }}>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 7, fontWeight: 800, color: '#FFFFFF',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5,
              paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}>
              Assessment Details
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              Assessment: PersonaVerse Personality Index<br />
              Date: {assessmentDate}<br />
              Student: {studentName}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 7, fontWeight: 800, color: '#FFFFFF',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5,
              paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}>
              Percentile Guide
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              <span style={{ color: '#86EFAC' }}>■</span> 70–100 · High Proficiency<br />
              <span style={{ color: '#93C5FD' }}>■</span> 45–69 · Moderate Proficiency<br />
              <span style={{ color: '#FCA5A5' }}>■</span> 0–44 · Developing Stage
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 7, fontWeight: 800, color: '#FFFFFF',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5,
              paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}>
              About This Report
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
              Derived from the PersonaVerse Psychometric Assessment using validated Big Five methodology. For academic and institutional use. © 2026 PersonaVerse.
            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 8,
          textAlign: 'center',
          fontSize: 7.5,
          color: 'rgba(255,255,255,0.4)',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}>
          "The best investment you can make is an investment in yourself. The more you learn, the more you earn." — Warren Buffett
        </div>
      </div>

    </div>
  );
}

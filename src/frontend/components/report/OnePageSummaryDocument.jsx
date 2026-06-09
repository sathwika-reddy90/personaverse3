// OnePageSummaryDocument.jsx
// React + inline-style HR report component, captured by html2canvas → A4 PDF.
// Rendered off-screen in Report/index.jsx; no Tailwind classes needed here
// because html2canvas reads computed styles, and inline styles are always safe.

const C = {
  navyDark: '#1B3A6B',
  navy: '#1D4ED8',
  blue: '#2563EB',
  blueSoft: '#EFF6FF',
  blueLight: '#DBEAFE',
  text: '#1E293B',
  textMuted: '#64748B',
  textFaint: '#94A3B8',
  bg: '#FFFFFF',
  bgLight: '#F8FAFC',
  border: '#E2E8F0',
  green: '#16A34A',
  greenBg: '#F0FDF4',
  greenLight: '#DCFCE7',
  orange: '#D97706',
  orangeBg: '#FFFBEB',
  orangeLight: '#FEF3C7',
  red: '#DC2626',
  redBg: '#FFF5F5',
  purple: '#7C3AED',
  teal: '#0D9488',
};

const BIG5_COLORS = [C.purple, C.blue, C.teal, C.orange, C.red];

// ─── Primitive sub-components ───────────────────────────────────────────────

function ScoreRing({ value, size = 86 }) {
  const stroke = 7;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * circ;
  const ringColor = value >= 75 ? C.green : value >= 60 ? C.blue : value >= 45 ? C.orange : C.red;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)', display: 'block' }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={ringColor}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: C.text, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 7, color: C.textMuted, marginTop: 2, letterSpacing: '0.04em' }}>/ 100</span>
      </div>
    </div>
  );
}

function Stars({ count, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ fontSize: 9, color: i < count ? '#F59E0B' : '#D1D5DB', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

function HBar({ value, color, height = 5 }) {
  return (
    <div style={{ height, backgroundColor: C.border, borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.max(3, Math.min(100, value))}%`, backgroundColor: color, borderRadius: height / 2 }} />
    </div>
  );
}

function SecHead({ label, accent = C.blue }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
      <div style={{ width: 3, height: 13, backgroundColor: accent, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 8.5, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
        {label}
      </span>
    </div>
  );
}

function LevelBadge({ level }) {
  const map = {
    High: { bg: C.greenLight, color: C.green },
    Moderate: { bg: C.blueLight, color: C.blue },
    Developing: { bg: C.orangeLight, color: C.orange },
  };
  const s = map[level] || map.Developing;
  return (
    <span style={{
      fontSize: 6.5, fontWeight: 700, padding: '1.5px 5px', borderRadius: 8,
      backgroundColor: s.bg, color: s.color, letterSpacing: '0.04em',
    }}>
      {level}
    </span>
  );
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
  hiringRecommendation = { level: 'Recommended', color: C.blue, bgColor: C.blueSoft, icon: '✓' },
  hiringText = '',
  archetype = { name: '' },
}) {
  const rec = hiringRecommendation;

  return (
    <div style={{
      width: 794,
      backgroundColor: C.bg,
      fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
      color: C.text,
      fontSize: 9,
      lineHeight: 1.4,
    }}>

      {/* ══ SECTION 1: HEADER ══════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: C.navyDark,
        padding: '13px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em', lineHeight: 1.2 }}>
            PersonaVerse
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF', marginTop: 3, letterSpacing: '0.06em' }}>
            STUDENT INTELLIGENCE REPORT
          </div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
            Personality Assessment &amp; Employability Report
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Report Date</div>
          <div style={{ fontSize: 9.5, color: '#FFFFFF', fontWeight: 600, marginTop: 2 }}>{assessmentDate}</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confidential</div>
        </div>
      </div>

      {/* ══ SECTION 2: PROFILE OVERVIEW ════════════════════════════════════════ */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>

        {/* Left — student info */}
        <div style={{
          width: '27%',
          backgroundColor: C.bgLight,
          padding: '12px 14px',
          borderRight: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            backgroundColor: '#CBD5E1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 9, fontSize: 22, color: '#64748B',
          }}>
            👤
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 7 }}>{studentName}</div>
          {[
            ['Roll Number', rollNumber],
            ['College', college],
            ['Branch', branch],
            ['Assessment Date', assessmentDate],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ marginBottom: 5 }}>
              <div style={{ fontSize: 6.5, color: C.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{lbl}</div>
              <div style={{ fontSize: 8.5, color: C.text, fontWeight: 500, marginTop: 1 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Center — employability score */}
        <div style={{
          width: '27%',
          padding: '12px 10px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          borderRight: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, textAlign: 'center' }}>
            Overall Employability Index
          </div>
          <ScoreRing value={overallScore} size={86} />
          <div style={{ marginTop: 9, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.navyDark }}>{employabilityLevel}</div>
            <div style={{
              marginTop: 5, display: 'inline-block',
              padding: '3px 10px', borderRadius: 12,
              backgroundColor: rec.bgColor, color: rec.color,
              fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {rec.level}
            </div>
          </div>
        </div>

        {/* Right — profile summary */}
        <div style={{ flex: 1, padding: '12px 14px' }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>
            Profile Summary
          </div>
          <div style={{ fontSize: 8.5, lineHeight: 1.55, color: '#334155' }}>{profileSummary}</div>
          <div style={{
            marginTop: 9, padding: '7px 10px',
            backgroundColor: C.blueSoft, borderRadius: 6,
            borderLeft: `3px solid ${C.blue}`,
          }}>
            <div style={{ fontSize: 7, color: C.navy, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Primary Archetype</div>
            <div style={{ fontSize: 9.5, color: C.text, fontWeight: 700, marginTop: 2 }}>{archetype.name}</div>
          </div>
        </div>
      </div>

      {/* ══ SECTIONS 3 + 4: BIG FIVE  +  PERSONALITY HIGHLIGHTS ═══════════════ */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>

        {/* Big Five Traits */}
        <div style={{ width: '55%', padding: '11px 14px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Big Five Personality Traits" />
          {bigFiveTraits.map((trait, i) => (
            <div key={trait.key} style={{ marginBottom: 9 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: BIG5_COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 600, color: C.text }}>{trait.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 7.5, color: C.textMuted }}>{trait.value}th percentile</span>
                  <LevelBadge level={trait.level} />
                </div>
              </div>
              <HBar value={trait.value} color={BIG5_COLORS[i]} height={5} />
            </div>
          ))}
        </div>

        {/* Personality Highlights */}
        <div style={{ flex: 1, padding: '11px 14px' }}>
          <SecHead label="Personality Highlights" />
          {personalityHighlights.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 9 }}>
              <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: 8.5, fontWeight: 700, color: C.text }}>{s.title}</div>
                <div style={{ fontSize: 7.5, color: C.textMuted, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTIONS 5 + 6 + 7 + 8: WORKPLACE  +  ROLE FIT  +  STRENGTHS  +  DEV ══ */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>

        {/* Workplace Readiness */}
        <div style={{ width: '29%', padding: '11px 13px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Workplace Readiness" />
          {workplaceReadiness.map((item) => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6.5 }}>
              <span style={{ fontSize: 8, color: '#334155' }}>{item.label}</span>
              <Stars count={item.stars} />
            </div>
          ))}
        </div>

        {/* Role Fit Analysis */}
        <div style={{ width: '41%', padding: '11px 13px', borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <SecHead label="Role Fit Analysis" />
          <div style={{ fontSize: 7.5, color: C.textMuted, marginBottom: 6, fontWeight: 600 }}>
            Top Career Matches
          </div>
          {careerMatches.slice(0, 8).map((career) => (
            <div key={career.title} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5.5 }}>
              <span style={{ fontSize: 10, lineHeight: 1, flexShrink: 0 }}>{career.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: 8, fontWeight: 600, color: C.text }}>{career.title}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: C.blue }}>{career.match}%</span>
                </div>
                <HBar value={career.match} color={C.blue} height={4} />
              </div>
              <div style={{
                fontSize: 6, fontWeight: 700, padding: '1px 5px', borderRadius: 6,
                backgroundColor: career.match >= 85 ? C.greenLight : career.match >= 75 ? C.blueLight : C.orangeLight,
                color: career.match >= 85 ? C.green : career.match >= 75 ? C.blue : C.orange,
                flexShrink: 0,
              }}>
                {career.match >= 85 ? 'Strong' : career.match >= 75 ? 'Good' : 'Fair'}
              </div>
            </div>
          ))}
        </div>

        {/* Top Strengths + Development Areas */}
        <div style={{ flex: 1, padding: '11px 13px' }}>
          <SecHead label="Top Strengths" accent={C.green} />
          {topStrengths.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 6 }}>
              <span style={{ color: C.green, fontSize: 10, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>✓</span>
              <div>
                <div style={{ fontSize: 8, fontWeight: 700, color: C.text }}>{s.title}</div>
                <div style={{ fontSize: 7, color: C.textMuted, lineHeight: 1.35 }}>{s.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 9 }}>
            <SecHead label="Development Areas" accent={C.orange} />
            {developmentAreas.slice(0, 3).map((area) => (
              <div key={area.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 5 }}>
                <span style={{ color: C.orange, fontSize: 9, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>⚠</span>
                <div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: C.text }}>{area.label}</div>
                  <div style={{ fontSize: 7, color: C.textMuted, lineHeight: 1.35 }}>{area.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 9: PREFERENCE INDICATORS ══════════════════════════════════ */}
      <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}` }}>
        <SecHead label="Preference Indicators" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
          {preferenceIndicators.map((pref) => (
            <div key={pref.label} style={{
              flex: '0 0 calc(33.33% - 7px)',
              padding: '6px 9px',
              backgroundColor: C.bgLight,
              borderRadius: 6,
              borderLeft: `2.5px solid ${C.blue}`,
              boxSizing: 'border-box',
            }}>
              <div style={{ fontSize: 6.5, color: C.textFaint, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>{pref.label}</div>
              <div style={{ fontSize: 8.5, color: C.text, fontWeight: 600, marginTop: 2 }}>{pref.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 10: INTERVIEW FOCUS AREAS ══════════════════════════════════ */}
      <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}` }}>
        <SecHead label="Interview Focus Areas" />
        <div style={{ display: 'flex', gap: 8 }}>
          {interviewFocusAreas.map((area) => (
            <div key={area.title} style={{
              flex: 1,
              padding: '8px 10px',
              backgroundColor: C.blueSoft,
              borderRadius: 7,
              borderTop: `2.5px solid ${C.blue}`,
            }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.navyDark, marginBottom: 4 }}>{area.title}</div>
              <div style={{ fontSize: 7.5, color: '#475569', lineHeight: 1.45 }}>{area.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SECTION 11: HIRING RECOMMENDATION ══════════════════════════════════ */}
      <div style={{
        padding: '11px 14px',
        backgroundColor: rec.bgColor,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <SecHead label="Hiring Recommendation" accent={rec.color} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            backgroundColor: rec.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 22, color: '#FFFFFF', lineHeight: 1 }}>{rec.icon}</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: rec.color, marginBottom: 4 }}>{rec.level}</div>
            <div style={{ fontSize: 8.5, color: '#334155', lineHeight: 1.55, maxWidth: 660 }}>{hiringText}</div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 12: FOOTER ════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.navyDark, padding: '11px 20px 10px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 9 }}>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#FFFFFF', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Assessment Details
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Assessment: PersonaVerse Personality Index<br />
              Date: {assessmentDate}<br />
              Student: {studentName}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#FFFFFF', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Percentile Guide
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              70–100: High Proficiency<br />
              45–69: Moderate Proficiency<br />
              0–44: Developing Stage
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#FFFFFF', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              About This Report
            </div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Scores are derived from the PersonaVerse Psychometric Assessment. For academic and institutional reference only. © 2026 PersonaVerse.
            </div>
          </div>

        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: 7,
          textAlign: 'center',
          fontSize: 7.5,
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic',
        }}>
          "The best investment you can make is an investment in yourself. The more you learn, the more you earn." — Warren Buffett
        </div>
      </div>

    </div>
  );
}

import { Document, Page, View, Text, StyleSheet, Svg, Defs, LinearGradient, Stop, Rect, Circle, G } from '@react-pdf/renderer';

// @react-pdf/renderer renders straight to PDF primitives (no DOM/canvas), so every
// color here is an explicit hex from the PersonaNova palette — Tailwind classes and
// CSS variables don't reach this tree.
const COLORS = {
  primary: '#3A0CA3',
  support: '#22D3C5',
  accent: '#FF4D6D',
  highlight: '#FFC868',
  surface: '#F0F4F8',
  ink: '#1A1530',
  inkSoft: '#6B6580',
  inkFaint: '#9B96AC',
  white: '#FFFFFF',
  card: '#FFFFFF',
  track: '#E3E1ED',
};

const PRIORITY_COLORS = {
  High: COLORS.accent,
  Medium: COLORS.highlight,
  Low: COLORS.support,
};

const ABS_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.surface,
    padding: 20,
    fontFamily: 'Helvetica',
    color: COLORS.ink,
  },

  // ── Header band ────────────────────────────────────────────
  heroPanel: { borderRadius: 14, marginBottom: 9, overflow: 'hidden' },
  heroInner: { padding: 14, position: 'relative' },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandKicker: { fontSize: 7, letterSpacing: 2.5, color: 'rgba(255,255,255,0.65)', fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  heroTitle: { fontSize: 18, color: COLORS.white, fontFamily: 'Helvetica-Bold' },
  heroMetaRow: { flexDirection: 'row', marginTop: 12, gap: 8 },
  heroChip: { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, flex: 1 },
  heroChipLabel: { fontSize: 6, letterSpacing: 1.4, color: 'rgba(255,255,255,0.6)', fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  heroChipValue: { fontSize: 9, color: COLORS.white, fontFamily: 'Helvetica-Bold' },

  scoreRingWrap: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  scoreRingNumber: { position: 'absolute', fontSize: 16, color: COLORS.white, fontFamily: 'Helvetica-Bold' },
  scoreRingLabel: { fontSize: 5.5, letterSpacing: 1, color: 'rgba(255,255,255,0.7)', fontFamily: 'Helvetica-Bold', marginTop: 2, textAlign: 'center' },
  scoreRingCol: { alignItems: 'center' },

  // ── Generic section frame ──────────────────────────────────
  row: { flexDirection: 'row', gap: 10, marginBottom: 9 },
  col: { flex: 1 },
  card: { backgroundColor: COLORS.card, borderRadius: 12, padding: 10 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  sectionAccent: { width: 3, height: 10, borderRadius: 2, marginRight: 6 },
  sectionTitle: { fontSize: 9, letterSpacing: 1.2, fontFamily: 'Helvetica-Bold', color: COLORS.ink, textTransform: 'uppercase' },

  // ── Personality snapshot ───────────────────────────────────
  traitGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  traitItem: { width: '50%', marginBottom: 6, paddingRight: 8 },
  traitLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  traitLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  traitValue: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: COLORS.primary },
  track: { height: 4.5, borderRadius: 3, backgroundColor: COLORS.track, overflow: 'hidden' },
  fill: { height: 4.5, borderRadius: 3 },

  // ── Archetype card ─────────────────────────────────────────
  archCard: { borderRadius: 12, padding: 14, flex: 1, position: 'relative', overflow: 'hidden' },
  archKicker: { fontSize: 6.5, letterSpacing: 1.8, color: 'rgba(255,255,255,0.65)', fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  archName: { fontSize: 14, color: COLORS.white, fontFamily: 'Helvetica-Bold', marginBottom: 6 },
  archBlurb: { fontSize: 7.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)', marginBottom: 10 },
  archTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  archTag: { fontSize: 6, fontFamily: 'Helvetica-Bold', color: COLORS.white, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },

  // ── Strength chips ─────────────────────────────────────────
  strengthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  strengthChip: { width: '48%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F4FB', borderRadius: 10, paddingVertical: 7, paddingHorizontal: 8, marginBottom: 6 },
  strengthDot: { width: 16, height: 16, borderRadius: 8, marginRight: 7, alignItems: 'center', justifyContent: 'center' },
  strengthDotText: { fontSize: 7, color: COLORS.white, fontFamily: 'Helvetica-Bold' },
  strengthChipText: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: COLORS.ink, flex: 1 },

  // ── Growth areas ───────────────────────────────────────────
  growthItem: { borderRadius: 10, backgroundColor: '#F6F4FB', padding: 9, marginBottom: 7 },
  growthTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  growthLabel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  priorityChip: { fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: COLORS.white, borderRadius: 7, paddingVertical: 2.5, paddingHorizontal: 6 },
  growthDesc: { fontSize: 6.5, lineHeight: 1.4, color: COLORS.inkSoft },

  // ── Career matches ─────────────────────────────────────────
  careerItem: { marginBottom: 8 },
  careerTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  careerTitle: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: COLORS.ink },
  careerPercent: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: COLORS.primary },

  // ── Learning profile ───────────────────────────────────────
  profileRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: '#E7E4F1' },
  profileLabel: { fontSize: 6.5, letterSpacing: 0.6, color: COLORS.inkFaint, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', width: '42%' },
  profileValue: { fontSize: 7.5, color: COLORS.ink, fontFamily: 'Helvetica-Bold', width: '58%', textAlign: 'right', lineHeight: 1.35 },

  skillsLabel: { fontSize: 6.5, letterSpacing: 0.6, color: COLORS.inkFaint, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 6 },
  skillBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skillBadge: { fontSize: 6, fontFamily: 'Helvetica-Bold', color: COLORS.primary, backgroundColor: '#EAE3F8', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8 },

  // ── Final insight ──────────────────────────────────────────
  insightPanel: { borderRadius: 14, overflow: 'hidden' },
  insightInner: { padding: 11 },
  insightKicker: { fontSize: 7, letterSpacing: 2, color: 'rgba(255,255,255,0.65)', fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  insightLine: { fontSize: 7.5, lineHeight: 1.45, color: 'rgba(255,255,255,0.95)', marginBottom: 2 },

  footer: { marginTop: 4, textAlign: 'center', fontSize: 6, color: COLORS.inkFaint, letterSpacing: 1 },
});

// Renders an absolutely-positioned diagonal gradient rect behind its children —
// the PDF-primitive equivalent of `linear-gradient(135deg, from, to)`.
function GradientPanel({ id, from, to, style, innerStyle, children }) {
  return (
    <View style={style}>
      <View style={ABS_FILL}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={from} />
              <Stop offset="100%" stopColor={to} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100" height="100" fill={`url(#${id})`} />
        </Svg>
      </View>
      <View style={innerStyle}>{children}</View>
    </View>
  );
}

// A small radial progress ring built from two stacked SVG circles (track + arc),
// rotated so the arc starts at 12 o'clock — the "radial chart" for the hero score.
function ScoreRing({ value, label }) {
  const size = 64;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <View style={styles.scoreRingCol}>
      <View style={styles.scoreRingWrap}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
            <Circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.28)" strokeWidth={stroke} fill="none" />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={COLORS.white}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${filled} ${c}`}
              fill="none"
            />
          </G>
        </Svg>
        <Text style={styles.scoreRingNumber}>{value}</Text>
      </View>
      <Text style={styles.scoreRingLabel}>{label}</Text>
    </View>
  );
}

function SectionTitle({ children, color = COLORS.primary }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionAccent, { backgroundColor: color }]} />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

function ProgressBar({ value, color }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(4, Math.min(100, value))}%`, backgroundColor: color }]} />
    </View>
  );
}

const TRAIT_BAR_COLORS = [COLORS.primary, COLORS.support, COLORS.accent, COLORS.highlight];

export default function OnePageSummaryDocument({
  studentName,
  assessmentDate,
  archetype,
  overallScore,
  snapshotTraits,
  strengths,
  growthAreas,
  careerMatches,
  profile,
  skills,
  insightLines,
}) {
  return (
    <Document title={`Student Intelligence Summary — ${studentName}`} author="PersonaNova">
      <Page size="A4" style={styles.page}>
        {/* Section 1 — Header */}
        <GradientPanel
          id="heroGrad"
          from={COLORS.primary}
          to={COLORS.support}
          style={styles.heroPanel}
          innerStyle={styles.heroInner}
        >
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.brandKicker}>PERSONANOVA · STUDENT INTELLIGENCE SUMMARY</Text>
              <Text style={styles.heroTitle}>One-Page Executive Summary</Text>
            </View>
            <ScoreRing value={overallScore} label="INTELLIGENCE SCORE" />
          </View>
          <View style={styles.heroMetaRow}>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipLabel}>STUDENT</Text>
              <Text style={styles.heroChipValue}>{studentName}</Text>
            </View>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipLabel}>ASSESSMENT DATE</Text>
              <Text style={styles.heroChipValue}>{assessmentDate}</Text>
            </View>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipLabel}>PRIMARY ARCHETYPE</Text>
              <Text style={styles.heroChipValue}>{archetype.name}</Text>
            </View>
            <View style={styles.heroChip}>
              <Text style={styles.heroChipLabel}>OVERALL SCORE</Text>
              <Text style={styles.heroChipValue}>{overallScore} / 100</Text>
            </View>
          </View>
        </GradientPanel>

        {/* Section 2 — Personality Snapshot  +  Section 3 — Primary Archetype */}
        <View style={styles.row}>
          <View style={[styles.card, { flex: 1.35 }]}>
            <SectionTitle>Personality Snapshot</SectionTitle>
            <View style={styles.traitGrid}>
              {snapshotTraits.map((t, i) => (
                <View key={t.key} style={styles.traitItem}>
                  <View style={styles.traitLabelRow}>
                    <Text style={styles.traitLabel}>{t.label}</Text>
                    <Text style={styles.traitValue}>{t.value}</Text>
                  </View>
                  <ProgressBar value={t.value} color={TRAIT_BAR_COLORS[i % TRAIT_BAR_COLORS.length]} />
                </View>
              ))}
            </View>
          </View>

          <GradientPanel
            id="archGrad"
            from={COLORS.primary}
            to={COLORS.accent}
            style={[styles.archCard, { flex: 1 }]}
            innerStyle={{ position: 'relative' }}
          >
            <Text style={styles.archKicker}>PRIMARY ARCHETYPE</Text>
            <Text style={styles.archName}>{archetype.name}</Text>
            <Text style={styles.archBlurb}>{archetype.blurb}</Text>
            <View style={styles.archTagRow}>
              {strengths.slice(0, 3).map((s) => (
                <Text key={s.title} style={styles.archTag}>{s.title}</Text>
              ))}
            </View>
          </GradientPanel>
        </View>

        {/* Section 4 — Top Strengths  +  Section 5 — Growth Areas */}
        <View style={styles.row}>
          <View style={[styles.card, styles.col]}>
            <SectionTitle color={COLORS.support}>Top Strengths</SectionTitle>
            <View style={styles.strengthGrid}>
              {strengths.map((s, i) => (
                <View key={s.title} style={styles.strengthChip}>
                  <View style={[styles.strengthDot, { backgroundColor: TRAIT_BAR_COLORS[i % TRAIT_BAR_COLORS.length] }]}>
                    <Text style={styles.strengthDotText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.strengthChipText}>{s.title}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.card, styles.col]}>
            <SectionTitle color={COLORS.accent}>Growth Areas</SectionTitle>
            {growthAreas.map((g) => (
              <View key={g.key} style={styles.growthItem}>
                <View style={styles.growthTopRow}>
                  <Text style={styles.growthLabel}>{g.label}</Text>
                  <Text style={[styles.priorityChip, { backgroundColor: PRIORITY_COLORS[g.priority] || COLORS.support }]}>
                    {g.priority.toUpperCase()} PRIORITY
                  </Text>
                </View>
                <Text style={styles.growthDesc}>{g.action}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section 6 — Career Matches  +  Section 7/8 — Learning Profile & Skills */}
        <View style={styles.row}>
          <View style={[styles.card, styles.col]}>
            <SectionTitle>Career Matches</SectionTitle>
            {careerMatches.map((c) => (
              <View key={c.title} style={styles.careerItem}>
                <View style={styles.careerTopRow}>
                  <Text style={styles.careerTitle}>{c.title}</Text>
                  <Text style={styles.careerPercent}>{c.match}%</Text>
                </View>
                <ProgressBar value={c.match} color={COLORS.primary} />
              </View>
            ))}
          </View>

          <View style={[styles.card, styles.col]}>
            <SectionTitle color={COLORS.highlight}>Learning Profile</SectionTitle>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Learning Style</Text>
              <Text style={styles.profileValue}>{profile.learningStyle}</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Social Style</Text>
              <Text style={styles.profileValue}>{profile.socialStyle}</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Best Study Method</Text>
              <Text style={styles.profileValue}>{profile.studyMethod}</Text>
            </View>
            <View style={[styles.profileRow, { borderBottomWidth: 0, marginBottom: 10, paddingBottom: 0 }]}>
              <Text style={styles.profileLabel}>Preferred Environment</Text>
              <Text style={styles.profileValue}>{profile.environment}</Text>
            </View>

            <Text style={styles.skillsLabel}>Recommended Skills</Text>
            <View style={styles.skillBadgeRow}>
              {skills.map((s) => (
                <Text key={s} style={styles.skillBadge}>{s}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Section 9 — Final Insight */}
        <GradientPanel id="insightGrad" from={COLORS.ink} to={COLORS.primary} style={styles.insightPanel} innerStyle={styles.insightInner}>
          <Text style={styles.insightKicker}>FINAL INSIGHT</Text>
          {insightLines.map((line, i) => (
            <Text key={i} style={styles.insightLine}>{line}</Text>
          ))}
        </GradientPanel>

        <Text style={styles.footer}>GENERATED BY PERSONANOVA · {assessmentDate.toUpperCase()} · CONFIDENTIAL STUDENT REPORT</Text>
      </Page>
    </Document>
  );
}

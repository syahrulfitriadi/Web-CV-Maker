/**
 * Executive Template — v1
 * Premium corporate layout with RIGHT sidebar
 * Formal design, dashed separators, diamond/star bullets
 * Geometric decorative elements, dark premium sidebar
 */

import { getPhotoStyle } from '../utils/photoStyle'
import { getFontConfig, migrateFontId } from '../utils/fonts'
import { getTranslations } from '../utils/translations'

function hexToRgba(hex, alpha) {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch { return `rgba(71,85,105,${alpha})` }
}

function lightenColor(hex, amount = 0.15) {
  try {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    r = Math.min(255, Math.round(r + (255 - r) * amount))
    g = Math.min(255, Math.round(g + (255 - g) * amount))
    b = Math.min(255, Math.round(b + (255 - b) * amount))
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
  } catch { return hex }
}

function darkenColor(hex, amount = 0.2) {
  try {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    r = Math.max(0, Math.round(r * (1 - amount)))
    g = Math.max(0, Math.round(g * (1 - amount)))
    b = Math.max(0, Math.round(b * (1 - amount)))
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
  } catch { return hex }
}

export default function ExecutiveTemplate({ data, themeColor = '#475569', fontFamily = 'inter', lang = 'id' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const tcDark = darkenColor(tc, 0.3)
  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const ff = fontCfg.body
  const hf = fontCfg.heading
  const t = getTranslations(lang)

  const sidebarBg1 = '#111827'
  const sidebarBg2 = '#1f2937'
  const sidebarText = '#d1d5db'
  const sidebarMuted = '#9ca3af'

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: ff, background: 'white', overflow: 'hidden',
    }}>

      {/* ═══════ MAIN CONTENT — LEFT ═══════ */}
      <main style={{
        width: '64%', padding: '40px 32px 32px 40px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Decorative geometric corner */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 60, height: 60,
          borderBottom: `2px solid ${hexToRgba(tc, 0.08)}`,
          borderRight: `2px solid ${hexToRgba(tc, 0.08)}`,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 60, height: 60,
          borderTop: `2px solid ${hexToRgba(tc, 0.06)}`,
          borderLeft: `2px solid ${hexToRgba(tc, 0.06)}`,
        }} />

        {/* Name + Title */}
        <div style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 32, fontWeight: 800, color: '#0f172a',
            lineHeight: 1.1, margin: 0, fontFamily: hf,
            letterSpacing: '-0.02em',
          }}>
            {personalInfo.name || t.yourName}
          </h1>
          {/* Double line separator */}
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <div style={{ height: 2.5, width: 80, background: tc, borderRadius: 2 }} />
            <div style={{ height: 1, width: 120, background: hexToRgba(tc, 0.3), marginTop: 3, borderRadius: 1 }} />
          </div>
          <p style={{
            fontSize: 12, fontWeight: 600, color: tc,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            margin: 0, fontFamily: hf,
          }}>
            {personalInfo.title || t.jobTitle}
          </p>
        </div>

        {/* SUMMARY */}
        {summary && (
          <section style={{ marginBottom: 22, position: 'relative', zIndex: 1 }}>
            <ExecHeading text={t.profileSummary} color={tc} font={hf} />
            <p style={{
              fontSize: '10pt', lineHeight: 1.75, color: '#374151',
              margin: '10px 0 0', textAlign: 'justify',
              paddingLeft: 14, borderLeft: `3px solid ${hexToRgba(tc, 0.2)}`,
            }}>
              {summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.some(e => e.company || e.role) && (
          <section style={{ marginBottom: 22, position: 'relative', zIndex: 1 }}>
            <ExecHeading text={t.workExperience} color={tc} font={hf} />
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} style={{
                  paddingLeft: 14,
                  borderLeft: `3px solid ${tc}`,
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'baseline', flexWrap: 'wrap', gap: 4,
                  }}>
                    <h3 style={{
                      fontSize: 12.5, fontWeight: 700, color: '#0f172a',
                      margin: 0, fontFamily: hf,
                    }}>
                      {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                    </h3>
                    {exp.startDate && (
                      <span style={{
                        fontSize: '8pt', color: '#64748b', fontWeight: 500,
                      }}>
                        {exp.startDate} – {exp.current ? t.present : exp.endDate || ''}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '9.5pt', fontWeight: 600, color: tc,
                    margin: '3px 0 7px',
                  }}>
                    {exp.role}
                    {exp.type ? <span style={{ fontWeight: 400, color: '#94a3b8' }}> · {exp.type}</span> : ''}
                  </p>
                  <ul style={{
                    listStyleType: 'none', margin: 0, padding: 0,
                    display: 'flex', flexDirection: 'column', gap: 3,
                  }}>
                    {exp.bullets?.filter(b => b).map((b, j) => (
                      <li key={j} style={{
                        fontSize: '9pt', lineHeight: 1.6, color: '#374151',
                        display: 'flex', alignItems: 'flex-start', gap: 7,
                      }}>
                        <span style={{
                          color: tc, fontSize: 6, flexShrink: 0, marginTop: 6,
                          fontWeight: 900,
                        }}>◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {certifications.some(c => c) && (
          <section style={{ marginBottom: 22, position: 'relative', zIndex: 1 }}>
            <ExecHeading text={t.certifications} color={tc} font={hf} />
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {certifications.filter(c => c).map((cert, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: '9.5pt', color: '#374151',
                }}>
                  <span style={{ color: tc, fontSize: 10 }}>★</span>
                  {cert}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom decorative line */}
        <div style={{
          marginTop: 'auto', paddingTop: 16,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <div style={{ width: 6, height: 6, background: tc, opacity: 0.15 }} />
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg, ${hexToRgba(tc, 0.15)}, transparent)`,
          }} />
        </div>
      </main>

      {/* ═══════ RIGHT SIDEBAR ═══════ */}
      <aside style={{
        width: '36%',
        background: `linear-gradient(180deg, ${sidebarBg1} 0%, ${sidebarBg2} 100%)`,
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Top accent bar */}
        <div style={{
          height: 5, flexShrink: 0,
          background: `linear-gradient(90deg, ${lightenColor(tc, 0.2)}, ${tc})`,
        }} />

        {/* Decorative geometric squares */}
        <div style={{
          position: 'absolute', top: -15, left: -15, width: 50, height: 50,
          border: `2px solid ${hexToRgba(tc, 0.08)}`, transform: 'rotate(45deg)',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, right: -20, width: 70, height: 70,
          border: `1.5px solid ${hexToRgba(tc, 0.06)}`, transform: 'rotate(45deg)',
        }} />

        {/* Photo */}
        <div style={{
          padding: '26px 0 14px',
          display: 'flex', justifyContent: 'center', flexShrink: 0,
          position: 'relative', zIndex: 1,
        }}>
          {personalInfo.photoPreview ? (
            <div style={{
              width: 130, height: 130, borderRadius: '50%', overflow: 'hidden',
              border: `4px solid ${tc}`, flexShrink: 0,
              background: '#111',
              boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 0 6px ${hexToRgba(tc, 0.15)}`,
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(personalInfo.photoCrop)}
              />
            </div>
          ) : (
            <div style={{
              width: 130, height: 130, borderRadius: '50%',
              border: `4px solid ${tc}`, background: '#374151',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 6px ${hexToRgba(tc, 0.1)}`,
            }}>
              <span style={{ fontSize: 40, color: '#6b7280' }}>👤</span>
            </div>
          )}
        </div>

        {/* Sidebar content */}
        <div style={{
          padding: '8px 22px 24px', flex: 1,
          display: 'flex', flexDirection: 'column', gap: 18,
          overflow: 'hidden', position: 'relative', zIndex: 1,
        }}>

          {/* CONTACT */}
          <section>
            <SidebarTitle text={t.contact} color={tc} />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { val: personalInfo.email, svg: EmailSvg },
                { val: personalInfo.phone, svg: PhoneSvg },
                { val: personalInfo.address, svg: LocationSvg },
                { val: personalInfo.website, svg: GlobeSvg },
                { val: personalInfo.linkedin, svg: LinkedinSvg },
              ].filter(i => i.val).map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 4,
                    background: hexToRgba(tc, 0.2), border: `1px solid ${hexToRgba(tc, 0.3)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.svg />
                  </span>
                  <span style={{
                    fontSize: '8pt', lineHeight: 1.4, color: sidebarText,
                    wordBreak: 'break-all',
                  }}>
                    {item.val}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* EDUCATION */}
          {education.some(e => e.institution) && (
            <section>
              <SidebarTitle text={t.education} color={tc} />
              {education.filter(e => e.institution).map((edu, i) => (
                <div key={i} style={{
                  marginBottom: 8, paddingLeft: 10,
                  borderLeft: `2px solid ${hexToRgba(tc, 0.3)}`,
                }}>
                  <p style={{
                    fontWeight: 700, fontSize: '8.5pt', color: '#ffffff',
                    margin: '0 0 2px',
                  }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: '7.5pt', color: sidebarText, margin: '0 0 1px' }}>
                    {edu.degree}{edu.field ? `${t.degreeOf}${edu.field}` : ''}
                    {edu.gpa ? ` — ${t.gpaLabel} ${edu.gpa}` : ''}
                  </p>
                  {edu.startDate && (
                    <p style={{ fontSize: '7pt', color: sidebarMuted, margin: 0 }}>
                      {edu.startDate} – {edu.endDate || t.present}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SKILLS */}
          {(skills.hard.some(s => s) || skills.soft.some(s => s)) && (
            <section>
              <SidebarTitle text={t.skills} color={tc} />

              {skills.hard.some(s => s) && (
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{
                    fontWeight: 700, color: tc, fontSize: '8pt',
                    marginTop: 0, marginBottom: 6, letterSpacing: '0.05em',
                  }}>
                    Hard Skills
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {skills.hard.filter(s => s).map((s, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        fontSize: '7.5pt', color: '#e5e7eb',
                      }}>
                        <span style={{
                          color: tc, fontSize: 6, flexShrink: 0,
                        }}>◆</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.some(s => s) && (
                <div>
                  <h3 style={{
                    fontWeight: 700, color: tc, fontSize: '8pt',
                    marginTop: 2, marginBottom: 6, letterSpacing: '0.05em',
                  }}>
                    Soft Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {skills.soft.filter(s => s).map((s, i) => (
                      <span key={i} style={{
                        display: 'inline-block', padding: '2px 8px',
                        background: hexToRgba(tc, 0.12),
                        color: lightenColor(tc, 0.5),
                        borderRadius: 4, fontSize: '7pt', fontWeight: 600,
                        border: `1px solid ${hexToRgba(tc, 0.2)}`,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Bottom accent bar */}
        <div style={{
          height: 5, flexShrink: 0,
          background: `linear-gradient(90deg, ${tc}, ${lightenColor(tc, 0.2)})`,
        }} />
      </aside>
    </div>
  )
}

/* ─── Main Section Heading ─── */
function ExecHeading({ text, color, font }) {
  return (
    <div style={{ marginBottom: 2 }}>
      <h2 style={{
        fontSize: 13, fontWeight: 800, color,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        margin: '0 0 6px', fontFamily: font,
      }}>
        {text}
      </h2>
      {/* Dashed separator */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            width: 12, height: 1.5,
            background: hexToRgba(color, 0.2 + (i < 3 ? 0.15 : 0)),
            borderRadius: 1,
          }} />
        ))}
      </div>
    </div>
  )
}

/* ─── Sidebar Heading ─── */
function SidebarTitle({ text, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{
        color: '#ffffff', fontWeight: 800, fontSize: '9pt',
        textTransform: 'uppercase', letterSpacing: '0.14em',
        margin: 0,
      }}>
        {text}
      </h2>
      {/* Dashed underline */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 3, marginTop: 5,
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            width: 8, height: 2,
            background: i < 2 ? color : hexToRgba(color, 0.3),
            borderRadius: 1,
          }} />
        ))}
      </div>
    </div>
  )
}

/* ─── SVG Contact Icons ─── */
function EmailSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function PhoneSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function LocationSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function GlobeSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
function LinkedinSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

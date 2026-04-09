/**
 * Modern Template — v5
 * Clean, contemporary design with light colored sidebar
 * Professional section headers, great typography
 * Elegant spacing and visual hierarchy
 */

import { getPhotoStyle } from '../utils/photoStyle'
import { getFontConfig, migrateFontId } from '../utils/fonts'

function hexToRgba(hex, alpha) {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch { return `rgba(59,130,246,${alpha})` }
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

export default function ModernTemplate({ data, themeColor = '#3B82F6', fontFamily = 'inter' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const tcDark = darkenColor(tc, 0.25)
  const sidebarBg = hexToRgba(tc, 0.08)
  const headerBg = hexToRgba(tc, 0.18)

  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const headingFont = fontCfg.heading
  const bodyFont = fontCfg.body

  const nameParts = (personalInfo.name || 'Nama Anda').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  const SectionHeader = ({ title }) => (
    <div style={{
      background: `linear-gradient(90deg, ${hexToRgba(tc, 0.22)}, ${hexToRgba(tc, 0.08)})`,
      color: tcDark,
      fontWeight: 700,
      textTransform: 'uppercase',
      padding: '6px 14px',
      marginBottom: 12,
      letterSpacing: '0.1em',
      fontSize: '0.8rem',
      fontFamily: headingFont,
      borderLeft: `3px solid ${tc}`,
    }}>
      {title}
    </div>
  )

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: bodyFont, background: 'white', overflow: 'hidden',
      color: '#1e293b',
    }}>
      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <aside style={{
        width: '35%', background: sidebarBg,
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative top accent */}
        <div style={{
          height: 100, flexShrink: 0, position: 'relative',
          background: `linear-gradient(135deg, ${tc}, ${lightenColor(tc, 0.2)})`,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: -20, right: -20, width: 80, height: 80,
            borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
          }} />
          <div style={{
            position: 'absolute', top: 10, left: -10, width: 50, height: 50,
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          }} />
        </div>

        {/* Photo overlapping the accent */}
        <div style={{
          display: 'flex', justifyContent: 'center', flexShrink: 0,
          marginTop: -65, position: 'relative', zIndex: 2,
        }}>
          {personalInfo.photoPreview ? (
            <div style={{
              width: 130, height: 130, borderRadius: '50%', overflow: 'hidden',
              border: '4px solid white', flexShrink: 0,
              background: '#f1f5f9', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(personalInfo.photoCrop)}
              />
            </div>
          ) : (
            <div style={{
              width: 130, height: 130, borderRadius: '50%',
              border: '4px solid white', background: '#f3f4f6',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}>
              <span style={{ fontSize: 44, color: '#9CA3AF' }}>👤</span>
            </div>
          )}
        </div>

        {/* Name below photo - in sidebar */}
        <div style={{ textAlign: 'center', padding: '12px 20px 6px' }}>
          <h1 style={{
            fontSize: 20, fontWeight: 800, color: '#1e293b',
            lineHeight: 1.2, margin: 0, fontFamily: headingFont,
          }}>
            {firstName}
            {lastName && <> {lastName}</>}
          </h1>
          <p style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
            color: tc, margin: '6px 0 0', textTransform: 'uppercase',
            fontFamily: headingFont,
          }}>
            {personalInfo.title || 'Posisi / Jabatan'}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 20px', flexShrink: 0,
        }}>
          <div style={{ flex: 1, height: 1, background: hexToRgba(tc, 0.2) }} />
          <div style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: tc, opacity: 0.4 }} />
          <div style={{ flex: 1, height: 1, background: hexToRgba(tc, 0.2) }} />
        </div>

        {/* CONTACT */}
        <div style={{ padding: '4px 22px 18px' }}>
          <SectionHeader title="Contact" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { val: personalInfo.address, Icon: LocationIcon },
              { val: personalInfo.email, Icon: EmailIcon },
              { val: personalInfo.phone, Icon: PhoneIcon },
              { val: personalInfo.website, Icon: WebIcon },
              { val: personalInfo.linkedin, Icon: LinkedInIcon },
            ].filter(i => i.val).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.75rem' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, background: tc,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: `0 2px 6px ${hexToRgba(tc, 0.25)}`,
                }}>
                  <item.Icon />
                </span>
                <span style={{ wordBreak: 'break-all', lineHeight: 1.4, color: '#334155' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        {education.some(e => e.institution) && (
          <div style={{ padding: '0 22px 18px' }}>
            <SectionHeader title="Education" />
            {education.filter(e => e.institution).map((edu, i) => (
              <div key={i} style={{
                fontSize: '0.78rem', marginBottom: 10,
                paddingLeft: 10, borderLeft: `2px solid ${hexToRgba(tc, 0.3)}`,
              }}>
                <p style={{ fontWeight: 700, margin: '0 0 2px', fontFamily: headingFont, color: '#1e293b' }}>{edu.institution}</p>
                <p style={{ fontWeight: 600, margin: '0 0 2px', color: '#334155' }}>
                  {edu.degree}{edu.field ? ` of ${edu.field}` : ''}
                </p>
                {edu.gpa && <p style={{ fontStyle: 'italic', color: '#475569', margin: '0 0 2px', fontSize: '0.72rem' }}>CGPA {edu.gpa}</p>}
                {edu.startDate && <p style={{ color: '#64748b', margin: 0, fontSize: '0.7rem' }}>{edu.startDate} - {edu.endDate || 'Sekarang'}</p>}
              </div>
            ))}
          </div>
        )}

        {/* TOOLS & HARD SKILL */}
        {skills.hard.some(s => s) && (
          <div style={{ padding: '0 22px 18px' }}>
            <SectionHeader title="Tools & Hard Skill" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {skills.hard.filter(s => s).map((s, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '3px 10px',
                  background: hexToRgba(tc, 0.12), color: tcDark,
                  borderRadius: 4, fontSize: '0.72rem', fontWeight: 500,
                  border: `1px solid ${hexToRgba(tc, 0.15)}`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SOFT SKILL */}
        {skills.soft.some(s => s) && (
          <div style={{ padding: '0 22px 18px' }}>
            <SectionHeader title="Soft Skill" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {skills.soft.filter(s => s).map((s, i) => (
                <span key={i} style={{
                  display: 'inline-block', padding: '3px 10px',
                  background: hexToRgba(tc, 0.1), color: darkenColor(tc, 0.15),
                  borderRadius: 4, fontSize: '0.72rem', fontWeight: 600,
                  border: `1px solid ${hexToRgba(tc, 0.18)}`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main style={{
        width: '65%', padding: '36px 36px', background: 'white',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Decorative corner */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 100, height: 100,
          background: `linear-gradient(225deg, ${hexToRgba(tc, 0.06)}, transparent)`,
        }} />

        {/* Name + Title Header */}
        <header style={{ marginBottom: 28, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 42, fontWeight: 800, lineHeight: 1.08,
            letterSpacing: -1.5, margin: 0, color: '#0f172a',
            fontFamily: headingFont,
          }}>
            {firstName}
            {lastName && <><br />{lastName}</>}
          </h1>
          <div style={{
            display: 'inline-block', marginTop: 10,
            padding: '4px 14px', borderRadius: 4,
            background: hexToRgba(tc, 0.1),
            borderLeft: `3px solid ${tc}`,
          }}>
            <h2 style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
              color: tcDark, fontFamily: headingFont, textTransform: 'uppercase',
              margin: 0,
            }}>
              {personalInfo.title || 'Posisi / Jabatan'}
            </h2>
          </div>
        </header>

        {/* SUMMARY */}
        {summary && (
          <section style={{ marginBottom: 24 }}>
            <MainSectionTitle text="Summary" color={tc} />
            <p style={{
              fontSize: '0.82rem', lineHeight: 1.75, textAlign: 'justify', margin: 0,
              color: '#374151', paddingLeft: 12, borderLeft: `2px solid ${hexToRgba(tc, 0.2)}`,
            }}>
              {summary}
            </p>
          </section>
        )}

        {/* CERTIFICATIONS — moved to top */}
        {certifications.some(c => c) && (
          <section style={{ marginBottom: 24 }}>
            <MainSectionTitle text="Certifications" color={tc} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {certifications.filter(c => c).map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: 4,
                    background: hexToRgba(tc, 0.1), border: `1px solid ${hexToRgba(tc, 0.2)}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 9, color: tc }}>✦</span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>{cert}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.some(e => e.company || e.role) && (
          <section style={{ marginBottom: 24 }}>
            <MainSectionTitle text="Experience" color={tc} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  {/* Timeline dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 3 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: tc, flexShrink: 0,
                      boxShadow: `0 0 0 3px ${hexToRgba(tc, 0.15)}`,
                    }} />
                    <div style={{ width: 1.5, flex: 1, background: hexToRgba(tc, 0.15), marginTop: 4 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                      <h3 style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0, fontFamily: headingFont, color: '#1e293b' }}>
                        {exp.role || exp.company}
                      </h3>
                      {exp.startDate && (
                        <span style={{
                          fontSize: '0.7rem', color: tc, fontWeight: 600,
                          padding: '1px 8px', borderRadius: 4,
                          background: hexToRgba(tc, 0.08),
                        }}>
                          {exp.startDate} – {exp.current ? 'Sekarang' : exp.endDate || ''}
                        </span>
                      )}
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: '0.75rem', color: '#64748b', margin: '2px 0 8px' }}>
                      {exp.company && exp.role ? exp.company : ''}
                      {exp.type ? ` · ${exp.type}` : ''}
                    </p>
                    <ul style={{
                      listStyleType: 'none', padding: 0, margin: 0,
                      fontSize: '0.8rem', lineHeight: 1.55,
                      display: 'flex', flexDirection: 'column', gap: 3,
                    }}>
                      {exp.bullets?.filter(b => b).map((b, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#374151' }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: tc, flexShrink: 0, marginTop: 7, opacity: 0.7,
                          }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Decorative bottom accent — pushes to bottom in PDF, stays after content in preview */}
        <div style={{
          marginTop: 'auto', paddingTop: 20,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg, ${hexToRgba(tc, 0.15)}, transparent)`,
          }} />
          <div style={{
            width: 5, height: 5, transform: 'rotate(45deg)',
            background: tc, opacity: 0.15,
          }} />
          <div style={{
            width: 30, height: 1,
            background: hexToRgba(tc, 0.1),
          }} />
        </div>
      </main>
    </div>
  )
}

/* ─── Main Section Title ─── */
function MainSectionTitle({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <h2 style={{
        fontSize: 14, fontWeight: 800, color,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        margin: 0, whiteSpace: 'nowrap',
      }}>
        {text}
      </h2>
      <div style={{
        flexGrow: 1, height: 1.5,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.25,
      }} />
    </div>
  )
}

/* ─── Modern SVG Contact Icons ─── */
function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

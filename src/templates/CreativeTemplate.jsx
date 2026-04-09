/**
 * Creative Template — v1
 * Bold hero header with gradient background
 * Two-column body (60/40), visual skill bars
 * Card-style experience entries, modern & vibrant
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
  } catch { return `rgba(99,102,241,${alpha})` }
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

export default function CreativeTemplate({ data, themeColor = '#6366f1', fontFamily = 'inter', lang = 'id' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const tcDark = darkenColor(tc, 0.2)
  const tcLight = lightenColor(tc, 0.85)
  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const ff = fontCfg.body
  const hf = fontCfg.heading
  const t = getTranslations(lang)

  const contactItems = [
    { val: personalInfo.email, icon: '✉' },
    { val: personalInfo.phone, icon: '☎' },
    { val: personalInfo.address, icon: '⌖' },
    { val: personalInfo.website, icon: '◎' },
    { val: personalInfo.linkedin, icon: '◉' },
  ].filter(i => i.val)

  return (
    <div style={{
      width: '100%', height: '100%',
      fontFamily: ff, background: 'white', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ═══════ HERO HEADER ═══════ */}
      <header style={{
        background: `linear-gradient(135deg, ${tcDark} 0%, ${tc} 50%, ${lightenColor(tc, 0.15)} 100%)`,
        padding: '28px 36px 24px',
        display: 'flex', alignItems: 'center', gap: 24,
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        {/* Decorative shapes */}
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 140, height: 140,
          borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, right: 80, width: 100, height: 100,
          borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{
          position: 'absolute', top: 10, left: -20, width: 70, height: 70,
          borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
        }} />

        {/* Photo */}
        {personalInfo.photoPreview ? (
          <div style={{
            width: 115, height: 115, borderRadius: '50%', overflow: 'hidden',
            flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            position: 'relative', zIndex: 1,
          }}>
            <img src={personalInfo.photoPreview} alt="Profile"
              style={getPhotoStyle(personalInfo.photoCrop)}
            />
          </div>
        ) : (
          <div style={{
            width: 115, height: 115, borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, position: 'relative', zIndex: 1,
          }}>
            <span style={{ fontSize: 40, opacity: 0.7 }}>👤</span>
          </div>
        )}

        {/* Name + Title + Contact */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, margin: 0, fontFamily: hf,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.15)',
          }}>
            {personalInfo.name || t.yourName}
          </h1>
          <p style={{
            fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            margin: '6px 0 10px', fontFamily: hf,
          }}>
            {personalInfo.title || t.jobTitle}
          </p>

          {/* Contact row */}
          {contactItems.length > 0 && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 10,
              fontSize: '8pt',
            }}>
              {contactItems.map((item, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  color: 'rgba(255,255,255,0.9)', fontWeight: 600,
                  background: 'rgba(255,255,255,0.18)',
                  padding: '2px 8px', borderRadius: 6,
                }}>
                  <span style={{ fontSize: 10, opacity: 0.8 }}>{item.icon}</span>
                  {item.val}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ═══════ BODY: 2 COLUMNS ═══════ */}
      <div style={{
        display: 'flex', flex: 1, overflow: 'hidden',
      }}>
        {/* LEFT COLUMN — 60% */}
        <div style={{
          width: '60%', padding: '22px 24px 24px 36px',
          display: 'flex', flexDirection: 'column', gap: 18,
          overflow: 'hidden',
        }}>

          {/* SUMMARY */}
          {summary && (
            <section>
              <CreativeHeading text={t.profileSummary} color={tc} font={hf} />
              <p style={{
                fontSize: '9.5pt', lineHeight: 1.75, color: '#374151',
                margin: '8px 0 0', textAlign: 'justify',
                paddingLeft: 12, borderLeft: `3px solid ${hexToRgba(tc, 0.2)}`,
              }}>
                {summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience.some(e => e.company || e.role) && (
            <section>
              <CreativeHeading text={t.workExperience} color={tc} font={hf} />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {experience.filter(e => e.company || e.role).map((exp, i) => (
                  <div key={i} style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: hexToRgba(tc, 0.03),
                    borderLeft: `4px solid ${tc}`,
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'baseline', flexWrap: 'wrap', gap: 4,
                    }}>
                      <h3 style={{
                        fontSize: 12, fontWeight: 700, color: '#0f172a',
                        margin: 0, fontFamily: hf,
                      }}>
                        {exp.role || exp.company}
                      </h3>
                      {exp.startDate && (
                        <span style={{
                          fontSize: '7.5pt', color: tc, fontWeight: 600,
                          padding: '1px 8px', borderRadius: 4,
                          background: hexToRgba(tc, 0.08),
                        }}>
                          {exp.startDate} – {exp.current ? t.present : exp.endDate || ''}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '8.5pt', color: '#64748b', margin: '2px 0 6px',
                      fontStyle: 'italic',
                    }}>
                      {exp.company && exp.role ? exp.company : ''}
                      {exp.type ? ` · ${exp.type}` : ''}
                      {exp.location ? ` · ${exp.location}` : ''}
                    </p>
                    <ul style={{
                      listStyleType: 'none', margin: 0, padding: 0,
                      display: 'flex', flexDirection: 'column', gap: 3,
                    }}>
                      {exp.bullets?.filter(b => b).map((b, j) => (
                        <li key={j} style={{
                          fontSize: '8.5pt', lineHeight: 1.55, color: '#374151',
                          display: 'flex', alignItems: 'flex-start', gap: 6,
                        }}>
                          <span style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: tc, flexShrink: 0, marginTop: 5,
                            opacity: 0.6,
                          }} />
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
            <section>
              <CreativeHeading text={t.certifications} color={tc} font={hf} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 6 }}>
                {certifications.filter(c => c).map((cert, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: '9pt', color: '#374151',
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 5,
                      background: hexToRgba(tc, 0.1),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 9, color: tc }}>✦</span>
                    </span>
                    {cert}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN — 40% */}
        <div style={{
          width: '40%', padding: '22px 36px 24px 16px',
          background: hexToRgba(tc, 0.03),
          borderLeft: `1px solid ${hexToRgba(tc, 0.08)}`,
          display: 'flex', flexDirection: 'column', gap: 18,
          overflow: 'hidden',
        }}>

          {/* HARD SKILLS */}
          {skills.hard.some(s => s) && (
            <section>
              <CreativeHeading text={t.hardSkill || 'Hard Skills'} color={tc} font={hf} />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {skills.hard.filter(s => s).map((s, i) => (
                  <div key={i}>
                    <span style={{ fontSize: '8.5pt', fontWeight: 600, color: '#334155', display: 'block', marginBottom: 3 }}>
                      {s}
                    </span>
                    {/* Visual bar */}
                    <div style={{
                      height: 5, borderRadius: 3,
                      background: hexToRgba(tc, 0.12),
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: `linear-gradient(90deg, ${tc}, ${lightenColor(tc, 0.2)})`,
                        width: `${Math.min(65 + (i * 7) % 35, 95)}%`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SOFT SKILLS */}
          {skills.soft.some(s => s) && (
            <section>
              <CreativeHeading text={t.softSkill || 'Soft Skills'} color={tc} font={hf} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                {skills.soft.filter(s => s).map((s, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '3px 10px',
                    background: hexToRgba(tc, 0.08),
                    color: tcDark, borderRadius: 20,
                    fontSize: '7.5pt', fontWeight: 600,
                    border: `1px solid ${hexToRgba(tc, 0.18)}`,
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education.some(e => e.institution) && (
            <section>
              <CreativeHeading text={t.education} color={tc} font={hf} />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {education.filter(e => e.institution).map((edu, i) => (
                  <div key={i} style={{
                    paddingLeft: 10,
                    borderLeft: `3px solid ${hexToRgba(tc, 0.3)}`,
                  }}>
                    <p style={{
                      fontWeight: 700, fontSize: '9pt', color: '#0f172a',
                      margin: '0 0 2px', fontFamily: hf,
                    }}>
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: '8pt', color: '#475569', margin: '0 0 1px' }}>
                      {edu.degree}{edu.field ? `${t.degreeOf}${edu.field}` : ''}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: '7.5pt', color: '#64748b', margin: '0 0 1px' }}>
                        {t.gpaLabel} {edu.gpa}
                      </p>
                    )}
                    {edu.startDate && (
                      <p style={{ fontSize: '7pt', color: '#94a3b8', margin: 0 }}>
                        {edu.startDate} – {edu.endDate || t.present}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div style={{
        height: 5, flexShrink: 0,
        background: `linear-gradient(90deg, ${tcDark}, ${tc}, ${lightenColor(tc, 0.2)})`,
      }} />
    </div>
  )
}

/* ─── Section Heading ─── */
function CreativeHeading({ text, color, font }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      marginBottom: 2,
    }}>
      <div style={{
        width: 4, height: 16, borderRadius: 2,
        background: color,
      }} />
      <h2 style={{
        fontSize: 11, fontWeight: 800, color: darkenColor(color, 0.1),
        textTransform: 'uppercase', letterSpacing: '0.1em',
        margin: 0, fontFamily: font,
      }}>
        {text}
      </h2>
    </div>
  )
}

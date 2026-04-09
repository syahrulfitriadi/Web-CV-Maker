/**
 * Minimalist Template — "Horizontal Bands"
 * Architectural design with header band, structured grid body,
 * clean section dividers, and strong visual rhythm.
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
  } catch { return `rgba(74,92,138,${alpha})` }
}

export default function MinimalistTemplate({ data, themeColor = '#111827', fontFamily = 'inter', lang = 'id' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const ff = fontCfg.body
  const hf = fontCfg.heading
  const t = getTranslations(lang)

  const hasPhoto = !!personalInfo.photoPreview

  const contactItems = [
    { val: personalInfo.phone, icon: PhoneSvg },
    { val: personalInfo.email, icon: EmailSvg },
    { val: personalInfo.website, icon: GlobeSvg },
    { val: personalInfo.linkedin, icon: LinkedinSvg },
    { val: personalInfo.address, icon: LocationSvg },
  ].filter(c => c.val)

  return (
    <div style={{
      width: '100%', height: '100%',
      fontFamily: ff, background: '#ffffff', overflow: 'hidden',
      color: '#1c1c1c', display: 'flex', flexDirection: 'column'
    }}>

      {/* ═══════ HEADER BAND ═══════ */}
      <header style={{
        background: '#fafafa',
        padding: '34px 42px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, flexShrink: 0,
        borderBottom: `2px solid ${tc}`,
      }}>
        {/* Left: Photo + Name + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flex: 1 }}>
          {hasPhoto && (
            <div style={{
              width: 100, height: 100, borderRadius: '50%', overflow: 'hidden',
              flexShrink: 0, backgroundColor: '#f0f0f0',
              border: `2px solid ${hexToRgba(tc, 0.25)}`,
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={{ ...getPhotoStyle(personalInfo.photoCrop), filter: 'contrast(1.02)' }}
              />
            </div>
          )}
          <div>
            <h1 style={{
              fontSize: 30, fontWeight: 800, margin: '0 0 6px',
              color: '#111', fontFamily: hf,
              letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              {personalInfo.name || t.yourName}
            </h1>
            <p style={{
              fontSize: 11, fontWeight: 500, margin: 0, color: tc,
              letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: ff,
            }}>
              {personalInfo.title || t.jobTitle}
            </p>
          </div>
        </div>

        {/* Right: Contact info stacked */}
        {contactItems.length > 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            alignItems: 'flex-end', flexShrink: 0,
          }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontSize: '8pt', color: '#6b7280',
              }}>
                <span style={{ wordBreak: 'break-word', lineHeight: 1.3 }}>{item.val}</span>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 14,
                }}>
                  <item.icon color={tc} size={11} />
                </span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ═══════ SUMMARY BAND (Full-Width) ═══════ */}
      {summary && (
        <section style={{
          padding: '18px 42px',
          borderBottom: '1px solid #e5e7eb',
          flexShrink: 0, background: '#fff',
        }}>
          <SectionTitle text={t.profileSummary} color={tc} font={hf} />
          <p style={{
            fontSize: '9pt', lineHeight: 1.8, margin: 0, color: '#374151',
            textAlign: 'justify',
          }}>
            {summary}
          </p>
        </section>
      )}

      {/* ═══════ BODY: TWO COLUMNS ═══════ */}
      <div style={{
        display: 'flex', flex: 1, padding: '22px 42px', gap: 36, overflow: 'hidden'
      }}>

        {/* LEFT COLUMN (38%): Education, Skills, Certifications */}
        <div style={{
          width: '38%', display: 'flex', flexDirection: 'column', gap: 22, overflow: 'hidden'
        }}>

          {/* EDUCATION */}
          {education.some(e => e.institution) && (
            <section>
              <SectionTitle text={t.education} color={tc} font={hf} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {education.filter(e => e.institution).map((edu, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: '9.5pt', fontWeight: 700, margin: '0 0 3px', color: '#111' }}>
                      {edu.institution}
                    </h3>
                    <p style={{ fontSize: '8.5pt', margin: '0 0 2px', color: '#4b5563' }}>
                      {edu.degree}{edu.field ? `${t.degreeOf}${edu.field}` : ''}
                    </p>
                    <p style={{ fontSize: '8pt', margin: 0, color: '#9ca3af' }}>
                      {edu.startDate && `${edu.startDate} – `}{edu.endDate || t.present}
                      {edu.gpa ? ` • ${t.gpaLabel} ${edu.gpa}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* HARD SKILLS */}
          {skills.hard.some(s => s) && (
            <section>
              <SectionTitle text={t.hardSkill || t.skills} color={tc} font={hf} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {skills.hard.filter(s => s).map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: '8.5pt', color: '#4b5563',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: tc, flexShrink: 0, opacity: 0.7,
                    }} />
                    {s}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SOFT SKILLS */}
          {skills.soft.some(s => s) && (
            <section>
              <SectionTitle text={t.softSkill || 'Soft Skills'} color={tc} font={hf} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.soft.filter(s => s).map((s, i) => (
                  <span key={i} style={{
                    display: 'inline-block', padding: '3px 10px',
                    border: `1px solid ${hexToRgba(tc, 0.3)}`,
                    borderRadius: 12, fontSize: '8pt', color: '#4b5563',
                    lineHeight: 1.4,
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.some(c => c) && (
            <section>
              <SectionTitle text={t.certifications} color={tc} font={hf} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {certifications.filter(c => c).map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    fontSize: '8.5pt', color: '#4b5563', lineHeight: 1.5,
                  }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 13, flexShrink: 0, paddingTop: 1,
                    }}>
                      <CheckSvg color={tc} size={11} />
                    </span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN (62%): Experience */}
        <div style={{
          width: '62%', display: 'flex', flexDirection: 'column', gap: 22, overflow: 'hidden'
        }}>

          {/* WORK EXPERIENCE */}
          {experience.some(e => e.company || e.role) && (
            <section>
              <SectionTitle text={t.workExperience} color={tc} font={hf} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {experience.filter(e => e.company || e.role).map((exp, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'baseline', marginBottom: 3,
                    }}>
                      <h3 style={{ fontSize: '10.5pt', fontWeight: 700, margin: 0, color: '#111' }}>
                        {exp.role}
                      </h3>
                      <span style={{
                        fontSize: '8pt', color: tc, flexShrink: 0, fontWeight: 500,
                      }}>
                        {exp.startDate && `${exp.startDate} – `}{exp.current ? t.present : exp.endDate || ''}
                      </span>
                    </div>

                    <p style={{ fontSize: '8.5pt', margin: '0 0 8px', color: '#9ca3af' }}>
                      <span style={{ fontWeight: 500, color: '#6b7280' }}>{exp.company}</span>
                      {exp.location ? ` • ${exp.location}` : ''}
                      {exp.type ? ` • ${exp.type}` : ''}
                    </p>

                    {exp.bullets?.filter(b => b).length > 0 && (
                      <ul style={{
                        listStyle: 'none', margin: 0, padding: 0,
                        color: '#374151', fontSize: '8.5pt', lineHeight: 1.7,
                        display: 'flex', flexDirection: 'column', gap: 4,
                      }}>
                        {exp.bullets.filter(b => b).map((b, j) => (
                          <li key={j} style={{
                            paddingLeft: 14, position: 'relative',
                          }}>
                            <span style={{
                              position: 'absolute', left: 0, color: tc, fontWeight: 600,
                            }}>—</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  )
}

/* ─── Section Heading with underline ─── */
function SectionTitle({ text, color, font }) {
  return (
    <h2 style={{
      fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.14em', color: color,
      margin: '0 0 12px', fontFamily: font,
      paddingBottom: 7,
      borderBottom: `1px solid #e5e7eb`,
    }}>
      {text}
    </h2>
  )
}

/* ─── SVG Icons ─── */
function EmailSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function PhoneSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function GlobeSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
function LinkedinSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function LocationSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function CheckSvg({ color = '#555', size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

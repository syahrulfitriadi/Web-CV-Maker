/**
 * Classic Template — v5
 * Premium dark sidebar, elegant typography, refined spacing
 * Decorative accent elements, sophisticated visual hierarchy
 */

import { getPhotoStyle } from '../utils/photoStyle'
import { getFontConfig, migrateFontId } from '../utils/fonts'

function hexToRgba(hex, alpha) {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch { return `rgba(0,119,182,${alpha})` }
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

export default function ClassicTemplate({ data, themeColor = '#0077B6', fontFamily = 'inter' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const tcLight = lightenColor(tc, 0.85)
  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const ff = fontCfg.body

  const nameParts = (personalInfo.name || 'Nama Lengkap').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  const sidebarDark = '#0f172a'
  const sidebarMid = '#1e293b'
  const sidebarText = '#cbd5e1'
  const sidebarLight = '#94a3b8'

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: ff, background: 'white', overflow: 'hidden',
    }}>
      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <aside style={{
        width: '34%', background: `linear-gradient(180deg, ${sidebarDark} 0%, ${sidebarMid} 100%)`,
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Top accent gradient bar */}
        <div style={{
          height: 6, flexShrink: 0,
          background: `linear-gradient(90deg, ${tc}, ${lightenColor(tc, 0.3)})`,
        }} />

        {/* Decorative circle in background */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 180, height: 180,
          borderRadius: '50%', background: hexToRgba(tc, 0.06),
        }} />

        {/* Photo */}
        <div style={{ padding: '28px 0 14px', display: 'flex', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          {personalInfo.photoPreview ? (
            <div style={{
              width: 150, height: 150, borderRadius: '50%', overflow: 'hidden',
              border: `4px solid ${tc}`, flexShrink: 0,
              background: '#111', boxShadow: `0 8px 24px ${hexToRgba(tc, 0.25)}, 0 0 0 6px ${hexToRgba(tc, 0.1)}`,
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(personalInfo.photoCrop)}
              />
            </div>
          ) : (
            <div style={{
              width: 150, height: 150, borderRadius: '50%',
              border: `4px solid ${tc}`, background: '#334155',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 6px ${hexToRgba(tc, 0.1)}`,
            }}>
              <span style={{ fontSize: 44, color: '#64748b' }}>👤</span>
            </div>
          )}
        </div>

        {/* Name + Title */}
        <div style={{ padding: '0 22px 16px', textAlign: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 24, fontWeight: 800, color: '#ffffff',
            lineHeight: 1.2, margin: 0, fontFamily: ff,
            letterSpacing: '-0.02em',
          }}>
            {firstName}{lastName && <> {lastName}</>}
          </h1>
          <div style={{
            display: 'inline-block', marginTop: 8,
            padding: '4px 16px', borderRadius: 20,
            background: hexToRgba(tc, 0.2), border: `1px solid ${hexToRgba(tc, 0.3)}`,
          }}>
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: '0.15em',
              color: lightenColor(tc, 0.4), textTransform: 'uppercase',
            }}>
              {personalInfo.title || 'Jabatan / Posisi'}
            </span>
          </div>
        </div>

        {/* Elegant divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px', flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: tc, opacity: 0.5 }} />
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Sidebar content */}
        <div style={{
          padding: '16px 22px 24px', flex: 1,
          display: 'flex', flexDirection: 'column',
          gap: 18, overflow: 'hidden',
        }}>

          {/* KONTAK */}
          <section>
            <SidebarHeading text="KONTAK" color={tc} />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { val: personalInfo.email, svg: emailSvg },
                { val: personalInfo.phone, svg: phoneSvg },
                { val: personalInfo.address, svg: locationSvg },
                { val: personalInfo.website, svg: globeSvg },
                { val: personalInfo.linkedin, svg: linkedinSvg },
              ].filter(i => i.val).map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 22, height: 22, background: tc, borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: `0 2px 8px ${hexToRgba(tc, 0.3)}`,
                  }}>
                    <item.svg />
                  </span>
                  <span style={{ fontSize: '8pt', lineHeight: 1.4, color: sidebarText, wordBreak: 'break-all' }}>
                    {item.val}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* KEMAMPUAN */}
          {(skills.hard.some(s => s) || skills.soft.some(s => s)) && (
            <section>
              <SidebarHeading text="KEMAMPUAN" color={tc} />

              {skills.hard.some(s => s) && (
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{
                    fontWeight: 700, color: tc, fontSize: '8pt',
                    marginTop: 0, marginBottom: 6, letterSpacing: '0.05em',
                  }}>
                    Hard Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {skills.hard.filter(s => s).map((s, i) => (
                      <span key={i} style={{
                        display: 'inline-block', padding: '2px 8px',
                        background: hexToRgba(tc, 0.12), color: '#e2e8f0',
                        borderRadius: 4, fontSize: '7pt', fontWeight: 500,
                        border: `1px solid ${hexToRgba(tc, 0.2)}`,
                        lineHeight: 1.6,
                      }}>
                        {s}
                      </span>
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
                        background: 'rgba(255,255,255,0.06)', color: sidebarLight,
                        borderRadius: 4, fontSize: '7pt', fontWeight: 500,
                        border: '1px solid rgba(255,255,255,0.08)',
                        lineHeight: 1.6,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* PENDIDIKAN */}
          {education.some(e => e.institution) && (
            <section>
              <SidebarHeading text="PENDIDIKAN" color={tc} />
              {education.filter(e => e.institution).map((edu, i) => (
                <div key={i} style={{ marginBottom: 8, paddingLeft: 10, borderLeft: `2px solid ${hexToRgba(tc, 0.4)}` }}>
                  <p style={{ fontWeight: 700, fontSize: '8.5pt', color: '#ffffff', margin: '0 0 2px' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: '7.5pt', color: sidebarText, margin: '0 0 1px' }}>
                    {edu.degree}{edu.field ? ` ${edu.field}` : ''}
                    {edu.gpa ? ` — IPK ${edu.gpa}` : ''}
                  </p>
                  {edu.startDate && (
                    <p style={{ fontSize: '7pt', color: sidebarLight, margin: 0 }}>
                      {edu.startDate} – {edu.endDate || 'Sekarang'}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* SERTIFIKASI in sidebar */}
          {certifications.some(c => c) && (
            <section>
              <SidebarHeading text="SERTIFIKASI" color={tc} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {certifications.filter(c => c).map((cert, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: 4,
                      background: hexToRgba(tc, 0.2), border: `1px solid ${hexToRgba(tc, 0.3)}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <span style={{ fontSize: 9, color: tc }}>✦</span>
                    </span>
                    <span style={{ fontSize: '7.5pt', color: sidebarText, lineHeight: 1.5 }}>
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom accent bar */}
        <div style={{
          height: 6, flexShrink: 0,
          background: `linear-gradient(90deg, ${lightenColor(tc, 0.3)}, ${tc})`,
        }} />
      </aside>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main style={{
        flex: 1, padding: '36px 36px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Subtle watermark decoration */}
        <div style={{
          position: 'absolute', top: 20, right: 20,
          width: 120, height: 120, borderRadius: '50%',
          border: `2px solid ${hexToRgba(tc, 0.06)}`,
        }} />
        <div style={{
          position: 'absolute', top: 35, right: 35,
          width: 90, height: 90, borderRadius: '50%',
          border: `1.5px solid ${hexToRgba(tc, 0.04)}`,
        }} />

        {/* RINGKASAN */}
        {summary && (
          <section style={{ marginBottom: 26, position: 'relative', zIndex: 1 }}>
            <SectionTitle text="RINGKASAN PROFIL" color={tc} />
            <p style={{
              fontSize: '10pt', lineHeight: 1.75, color: '#374151',
              margin: '10px 0 0', textAlign: 'justify',
              paddingLeft: 14, borderLeft: `3px solid ${hexToRgba(tc, 0.25)}`,
            }}>
              {summary}
            </p>
          </section>
        )}

        {/* PENGALAMAN — flex:1 fills remaining space */}
        {experience.some(e => e.company || e.role) && (
          <section style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            <SectionTitle text="PENGALAMAN KERJA" color={tc} />
            <div style={{
              marginTop: 12, flex: 1,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-start', gap: 20,
            }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  {/* Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: 'white', border: `3px solid ${tc}`,
                      flexShrink: 0, boxShadow: `0 0 0 3px ${hexToRgba(tc, 0.12)}`,
                    }} />
                    <div style={{ width: 2, flex: 1, background: hexToRgba(tc, 0.15), marginTop: 4 }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                      <h3 style={{ color: '#1e293b', fontWeight: 700, fontSize: 13, margin: 0 }}>
                        {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                      </h3>
                      {exp.startDate && (
                        <span style={{
                          fontSize: '8pt', color: '#64748b',
                          padding: '1px 8px', borderRadius: 4,
                          background: hexToRgba(tc, 0.08),
                        }}>
                          {exp.startDate} – {exp.current ? 'Sekarang' : exp.endDate || ''}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '9.5pt', fontWeight: 600, color: tc, margin: '3px 0 7px' }}>
                      {exp.role}
                    </p>
                    <ul style={{
                      listStyleType: 'none', margin: 0, padding: 0,
                      display: 'flex', flexDirection: 'column', gap: 4,
                    }}>
                      {exp.bullets?.filter(b => b).map((b, j) => (
                        <li key={j} style={{
                          fontSize: '9pt', lineHeight: 1.6, color: '#374151',
                          display: 'flex', alignItems: 'flex-start', gap: 6,
                        }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: tc, flexShrink: 0, marginTop: 7,
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
      </main>
    </div>
  )
}

/* ─── Sidebar heading ─── */
function SidebarHeading({ text, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{
        color: '#ffffff', fontWeight: 800, fontSize: '9pt',
        textTransform: 'uppercase', letterSpacing: '0.14em',
        margin: 0,
      }}>
        {text}
      </h2>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4, marginTop: 4,
      }}>
        <div style={{ width: 22, height: 2.5, background: color, borderRadius: 2 }} />
        <div style={{ width: 4, height: 2.5, background: color, borderRadius: 2, opacity: 0.5 }} />
      </div>
    </div>
  )
}

/* ─── Section title (main content) ─── */
function SectionTitle({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2 }}>
      <h2 style={{
        fontSize: 14, fontWeight: 800, color,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        margin: 0, whiteSpace: 'nowrap',
      }}>
        {text}
      </h2>
      <div style={{ flexGrow: 1, height: 1.5, background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.3 }} />
    </div>
  )
}

/* ─── SVG Icons ─── */
function emailSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function phoneSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function locationSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function globeSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
function linkedinSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/**
 * Classic Template — v4
 * Dark sidebar, circular photo, better vertical space distribution
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

export default function ClassicTemplate({ data, themeColor = '#0077B6', fontFamily = 'inter' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const ff = fontCfg.body

  const nameParts = (personalInfo.name || 'Nama').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  const sidebarBg = '#1e293b'
  const sidebarText = '#cbd5e1'

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: ff, background: 'white', overflow: 'hidden',
    }}>
      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <aside style={{
        width: '35%', background: sidebarBg, display: 'flex',
        flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
      }}>
        {/* Accent top */}
        <div style={{ height: 5, background: tc, flexShrink: 0 }} />

        {/* Photo */}
        <div style={{ padding: '30px 0 16px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          {personalInfo.photoPreview ? (
            <div style={{
              width: 170, height: 170, borderRadius: '50%', overflow: 'hidden',
              border: `4px solid ${tc}`, flexShrink: 0,
              background: '#111', boxShadow: `0 0 0 3px ${hexToRgba(tc, 0.3)}`,
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(personalInfo.photoCrop)}
              />
            </div>
          ) : (
            <div style={{
              width: 170, height: 170, borderRadius: '50%',
              border: `4px solid ${tc}`, background: '#334155',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 48, color: '#64748b' }}>👤</span>
            </div>
          )}
        </div>

        {/* Name + Title */}
        <div style={{ padding: '0 24px 22px', textAlign: 'center', flexShrink: 0 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 800, color: '#ffffff',
            lineHeight: 1.15, margin: 0, fontFamily: ff,
          }}>
            {firstName}{lastName && <> {lastName}</>}
          </h1>
          <p style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.2em',
            color: tc, margin: '6px 0 0', textTransform: 'uppercase',
          }}>
            {personalInfo.title || 'Jabatan / Posisi'}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 24px', flexShrink: 0 }} />

        {/* Sidebar content */}
        <div style={{
          padding: '22px 24px 28px', flex: 1,
          display: 'flex', flexDirection: 'column',
          gap: 24,
          overflow: 'hidden',
        }}>

          {/* KONTAK */}
          <section>
            <SidebarHeading text="KONTAK" color={tc} />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { val: personalInfo.email, svg: emailSvg },
                { val: personalInfo.phone, svg: phoneSvg },
                { val: personalInfo.website, svg: globeSvg },
                { val: personalInfo.linkedin, svg: linkedinSvg },
              ].filter(i => i.val).map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 24, height: 24, background: tc, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.svg />
                  </span>
                  <span style={{ fontSize: '8.5pt', lineHeight: 1.4, color: sidebarText, wordBreak: 'break-all' }}>
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
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ fontWeight: 700, color: tc, fontSize: '8.5pt', marginTop: 0, marginBottom: 7 }}>
                    Tools & Hard Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {skills.hard.filter(s => s).map((s, i) => (
                      <span key={i} style={{
                        display: 'inline-block', padding: '3px 10px',
                        background: hexToRgba(tc, 0.15), color: '#e2e8f0',
                        borderRadius: 20, fontSize: '7.5pt', fontWeight: 500,
                        border: `1px solid ${hexToRgba(tc, 0.3)}`,
                        lineHeight: 1.5,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.some(s => s) && (
                <div>
                  <h3 style={{ fontWeight: 700, color: tc, fontSize: '8.5pt', marginTop: 4, marginBottom: 7 }}>
                    Soft Skills
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {skills.soft.filter(s => s).map((s, i) => (
                      <span key={i} style={{
                        display: 'inline-block', padding: '3px 10px',
                        background: hexToRgba(tc, 0.15), color: '#e2e8f0',
                        borderRadius: 20, fontSize: '7.5pt', fontWeight: 500,
                        border: `1px solid ${hexToRgba(tc, 0.3)}`,
                        lineHeight: 1.5,
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
                <div key={i} style={{ marginBottom: 10 }}>
                  <p style={{ fontWeight: 700, fontSize: '9pt', color: '#ffffff', margin: '0 0 2px' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: '8.5pt', color: sidebarText, margin: '0 0 1px' }}>
                    {edu.degree}{edu.field ? ` ${edu.field}` : ''}
                    {edu.gpa ? ` — IPK ${edu.gpa}` : ''}
                  </p>
                  {edu.startDate && (
                    <p style={{ fontSize: '8pt', color: '#64748b', margin: 0 }}>
                      {edu.startDate} – {edu.endDate || 'Sekarang'}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Bottom accent */}
        <div style={{ height: 5, background: tc, flexShrink: 0 }} />
      </aside>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main style={{
        flex: 1, padding: '38px 38px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* RINGKASAN */}
        {summary && (
          <section style={{ marginBottom: 28 }}>
            <SectionTitle text="RINGKASAN" color={tc} />
            <p style={{ fontSize: '10.5pt', lineHeight: 1.7, color: '#374151', margin: '12px 0 0', textAlign: 'justify' }}>
              {summary}
            </p>
          </section>
        )}

        {/* SERTIFIKASI */}
        {certifications.some(c => c) && (
          <section style={{ marginBottom: 28 }}>
            <SectionTitle text="SERTIFIKASI" color={tc} />
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {certifications.filter(c => c).map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: tc, flexShrink: 0 }} />
                  <p style={{ fontSize: '10pt', color: '#374151', margin: 0 }}>
                    {cert}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PENGALAMAN — flex:1 fills remaining space */}
        {experience.some(e => e.company || e.role) && (
          <section style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SectionTitle text="PENGALAMAN" color={tc} />
            <div style={{
              marginTop: 14, flex: 1,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-start', gap: 24,
            }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                  {/* Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: tc, flexShrink: 0 }} />
                    <div style={{ width: 2, flex: 1, background: hexToRgba(tc, 0.2), marginTop: 3 }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: tc, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>
                      {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                    </h3>
                    <p style={{ fontSize: '10pt', fontStyle: 'italic', color: '#64748b', margin: '0 0 8px' }}>
                      {exp.role}
                      {exp.startDate && ` (${exp.startDate} – ${exp.current ? 'Sekarang' : exp.endDate || ''})`}
                    </p>
                    <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {exp.bullets?.filter(b => b).map((b, j) => (
                        <li key={j} style={{ fontSize: '9.5pt', lineHeight: 1.6, color: '#374151' }}>
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
    <div style={{ marginBottom: 10 }}>
      <h2 style={{
        color: '#ffffff', fontWeight: 800, fontSize: '10pt',
        textTransform: 'uppercase', letterSpacing: '0.12em',
        margin: 0,
      }}>
        {text}
      </h2>
      <div style={{ width: 30, height: 2.5, background: color, borderRadius: 2, marginTop: 5 }} />
    </div>
  )
}

/* ─── Section title (main content) ─── */
function SectionTitle({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <h2 style={{
        fontSize: 16, fontWeight: 800, color,
        textTransform: 'uppercase', letterSpacing: '0.06em',
        margin: 0, whiteSpace: 'nowrap',
      }}>
        {text}
      </h2>
      <div style={{ flexGrow: 1, height: 1.5, background: color, opacity: 0.35 }} />
    </div>
  )
}

/* ─── SVG Icons ─── */
function emailSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function phoneSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function globeSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
function linkedinSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/**
 * Modern Template — Exact port of Referensi CV 2 (code.html)
 * Sidebar: 35% width, bg #E0F2FE (light blue)
 * Section headers: bg #93C5FD, text #1E293B, centered, uppercase, 0.9rem, font-weight 700
 * Photo: 180px circle, border 15px solid #93C5FD
 * Name: text-6xl (48px+), font-extrabold, tight leading, tight tracking
 * Title: text-2xl, bold, tracking-widest
 * Body: 'Open Sans', headings: 'Montserrat'
 * Contact: fa icons + text, 0.8rem
 * Experience: font-bold 0.95rem, bullets disc, 0.85rem
 */

import { getPhotoStyle } from '../utils/photoStyle'
import { getFontConfig, migrateFontId } from '../utils/fonts'

export default function ModernTemplate({ data, themeColor = '#3B82F6', fontFamily = 'inter' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const sidebarBg = hexToRgba(tc, 0.12)
  const headerBg = hexToRgba(tc, 0.4)

  const fontCfg = getFontConfig(migrateFontId(fontFamily))
  const headingFont = fontCfg.heading
  const bodyFont = fontCfg.body

  const nameParts = (personalInfo.name || 'Nama Anda').split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  // Section header matching .section-header from code.html
  const SectionHeader = ({ title }) => (
    <div style={{
      background: headerBg,
      color: '#1E293B',
      fontWeight: 700,
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: '6px 0',
      marginBottom: 15,
      letterSpacing: '0.1em',
      fontSize: '0.9rem',
      fontFamily: headingFont,
    }}>
      {title}
    </div>
  )

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: bodyFont, background: 'white', overflow: 'hidden',
      color: '#101b22',
    }}>
      {/* ═══════ LEFT SIDEBAR (35%, #E0F2FE) ═══════ */}
      <aside style={{ width: '35%', background: sidebarBg, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>

        {/* Profile Photo — 200px circle, subtle white border */}
        <div style={{ padding: '28px 16px 12px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          {personalInfo.photoPreview ? (
            <div style={{
              width: 200, height: 200, borderRadius: '50%', overflow: 'hidden',
              border: '4px solid white', flexShrink: 0,
              background: '#111', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(personalInfo.photoCrop)}
              />
            </div>
          ) : (
            <div style={{
              width: 200, height: 200, borderRadius: '50%',
              border: '4px solid white',
              background: '#f3f4f6',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 54, color: '#9CA3AF' }}>👤</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginTop: 2 }}>Insert Photo</span>
            </div>
          )}
        </div>

        {/* CONTACT — sidebar-section padding 0 25px 25px 25px */}
        <div style={{ padding: '0 25px 25px' }}>
          <SectionHeader title="Contact" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { val: personalInfo.address, Icon: LocationIcon },
              { val: personalInfo.website, Icon: WebIcon },
              { val: personalInfo.linkedin, Icon: LinkedInIcon },
              { val: personalInfo.email, Icon: EmailIcon },
              { val: personalInfo.phone, Icon: PhoneIcon },
            ].filter(i => i.val).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.8rem' }}>
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', background: tc,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.Icon />
                </span>
                <span style={{ wordBreak: 'break-all', lineHeight: 1.4 }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        {education.some(e => e.institution) && (
          <div style={{ padding: '0 25px 25px' }}>
            <SectionHeader title="Education" />
            {education.filter(e => e.institution).map((edu, i) => (
              <div key={i} style={{ fontSize: '0.85rem', marginBottom: 10 }}>
                <p style={{ fontWeight: 700, margin: '0 0 2px', fontFamily: headingFont }}>{edu.institution}</p>
                <p style={{ fontWeight: 600, margin: '0 0 2px' }}>
                  {edu.degree}{edu.field ? ` of ${edu.field}` : ''}
                </p>
                {edu.gpa && <p style={{ fontStyle: 'italic', color: '#374151', margin: '0 0 2px' }}>CGPA {edu.gpa}</p>}
                {edu.startDate && <p style={{ color: '#4B5563', margin: 0 }}>{edu.startDate} - {edu.endDate || 'Sekarang'}</p>}
              </div>
            ))}
          </div>
        )}

        {/* TOOLS & HARD SKILL */}
        {skills.hard.some(s => s) && (
          <div style={{ padding: '0 25px 25px' }}>
            <SectionHeader title="Tools & Hard Skill" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
              {skills.hard.filter(s => s).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        {/* SOFT SKILL */}
        {skills.soft.some(s => s) && (
          <div style={{ padding: '0 25px 25px' }}>
            <SectionHeader title="Soft Skill" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '0.85rem', lineHeight: 1.6 }}>
              {skills.soft.filter(s => s).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}
      </aside>

      {/* ═══════ MAIN CONTENT (65%, padding 40px) ═══════ */}
      <main style={{ width: '65%', padding: 40, background: 'white', overflowY: 'auto' }}>

        {/* Name + Title Header — mb-10 */}
        <header style={{ marginBottom: 36 }}>
          <h1 style={{
            fontSize: 52, fontWeight: 800, lineHeight: 1.05,
            letterSpacing: -1.5, margin: 0, color: '#101b22',
            fontFamily: headingFont,
          }}>
            {firstName}
            {lastName && <><br />{lastName}</>}
          </h1>
          <h2 style={{
            fontSize: 18, fontWeight: 700, marginTop: 14, letterSpacing: '0.2em',
            color: '#101b22', fontFamily: headingFont, textTransform: 'uppercase',
          }}>
            {personalInfo.title || 'Posisi / Jabatan'}
          </h2>
        </header>

        {/* SUMMARY — mb-8 */}
        {summary && (
          <section style={{ marginBottom: 28 }}>
            <SectionHeader title="Summary" />
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, textAlign: 'justify', margin: 0 }}>
              {summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience.some(e => e.company || e.role) && (
          <section style={{ marginBottom: 28 }}>
            <SectionHeader title="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 3px', fontFamily: headingFont }}>
                    {exp.role || exp.company}
                    {exp.company && exp.role ? ` (${exp.company})` : ''}
                  </h3>
                  <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#374151', margin: '0 0 8px' }}>
                    {exp.type || 'Full-time'}
                    {exp.startDate && ` (${exp.startDate} – ${exp.current ? 'Now' : exp.endDate || ''})`}
                  </p>
                  <ul style={{
                    listStyleType: 'disc', paddingLeft: 20, margin: 0,
                    fontSize: '0.85rem', lineHeight: 1.5,
                    display: 'flex', flexDirection: 'column', gap: 4,
                  }}>
                    {exp.bullets?.filter(b => b).map((b, j) => (
                      <li key={j}>{b}</li>
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
            <SectionHeader title="Certifications" />
            <ul style={{ listStyleType: 'disc', paddingLeft: 20, margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
              {certifications.filter(c => c).map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}

function hexToRgba(hex, alpha) {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch {
    return `rgba(59,130,246,${alpha})`
  }
}

/* ─── Modern SVG Contact Icons ─── */
function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

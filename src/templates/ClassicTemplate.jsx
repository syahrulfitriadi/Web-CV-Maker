/**
 * Classic Template — Exact port of Referensi CV 1 (code.html)
 * Sidebar: #E8EAEB, 38% width, p-10
 * Section title: flex + ::after line (replicated with div)
 * Name: text-6xl (#0077B6), title: italic font-light text-xl
 * Photo: aspect-square full width with gradient fade
 * Contact: circle icons, sidebar-text 8.5pt
 * Skills: sidebar-heading 11pt, sidebar-sub-heading 9pt
 * Main: flex-1 p-10 pt-12, section spacing space-y-10
 * Body text: 10pt #374151 line-height 1.5
 */

import { getPhotoStyle } from '../utils/photoStyle'

export default function ClassicTemplate({ data, themeColor = '#0077B6', fontFamily = 'sans' }) {
  const { personalInfo, summary, experience, education, skills, certifications } = data
  const tc = themeColor
  const ff = fontFamily === 'serif'
    ? "'Playfair Display', Georgia, serif"
    : "'Manrope', 'Inter', system-ui, sans-serif"

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      fontFamily: ff, background: 'white', overflow: 'hidden',
    }}>
      {/* ═══════ LEFT SIDEBAR (w-[38%] bg-[#E8EAEB]) ═══════ */}
      <aside style={{ width: '38%', background: '#E8EAEB', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

        {/* Profile Header — p-10 pb-4 */}
        <div style={{ padding: '32px 32px 12px' }}>
          <h1 style={{
            fontSize: 52, fontWeight: 400, color: tc,
            lineHeight: 1.1, margin: 0, fontFamily: ff,
          }}>
            {personalInfo.name ? personalInfo.name.split(' ')[0] : 'Nama'}
          </h1>
          <p style={{
            fontSize: 16, fontStyle: 'italic', fontWeight: 300,
            color: '#374151', margin: '-2px 0 0',
          }}>
            {personalInfo.title || 'Jabatan / Posisi'}
          </p>
        </div>

        {/* Photo — aspect-square, full width, gradient fade */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          {personalInfo.photoPreview ? (
            <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', background: '#111' }}>
              <img src={personalInfo.photoPreview} alt="Profile"
                style={{ ...getPhotoStyle(personalInfo.photoCrop), display: 'block' }}
              />
            </div>
          ) : (
            <div style={{
              width: '100%', aspectRatio: '1/1', background: '#D1D5DB',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 12,
                border: '2px dashed #9CA3AF', borderRadius: 8,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(229,231,235,0.5)',
              }}>
                <span style={{ fontSize: 36, color: '#6B7280', marginBottom: 6 }}>📷</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 3 }}>
                  Photo Placeholder
                </span>
              </div>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, #E8EAEB, transparent)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Sidebar Content — px-8 py-6 space-y-8 */}
        <div style={{ padding: '20px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Contact Info */}
          <section>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { val: personalInfo.email, svg: emailSvg },
                { val: personalInfo.phone, svg: phoneSvg },
                { val: personalInfo.website, svg: globeSvg },
                { val: personalInfo.linkedin, svg: linkedinSvg },
              ].filter(i => i.val).map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 22, height: 22, background: tc, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.svg />
                  </span>
                  <span style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#4B5563', wordBreak: 'break-all' }}>
                    {item.val}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* KEMAMPUAN — sidebar-heading 11pt */}
          {(skills.hard.some(s => s) || skills.soft.some(s => s)) && (
            <section>
              <h2 style={{
                color: tc, fontWeight: 700, fontSize: '11pt',
                marginBottom: 8, textTransform: 'uppercase',
              }}>
                KEMAMPUAN
              </h2>

              {skills.hard.some(s => s) && (
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ fontWeight: 700, color: tc, fontSize: '9pt', marginTop: 0, marginBottom: 4 }}>
                    Tools
                  </h3>
                  <p style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#4B5563', margin: 0 }}>
                    {skills.hard.filter(s => s).join(', ')}.
                  </p>
                </div>
              )}

              {skills.hard.some(s => s) && (
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ fontWeight: 700, color: tc, fontSize: '9pt', marginTop: 10, marginBottom: 4 }}>
                    Hard Skills
                  </h3>
                  <p style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#4B5563', margin: 0 }}>
                    {skills.hard.filter(s => s).join(', ')}.
                  </p>
                </div>
              )}

              {skills.soft.some(s => s) && (
                <div>
                  <h3 style={{ fontWeight: 700, color: tc, fontSize: '9pt', marginTop: 10, marginBottom: 4 }}>
                    Soft Skills
                  </h3>
                  <p style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#4B5563', margin: 0 }}>
                    {skills.soft.filter(s => s).join(', ')}.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </aside>

      {/* ═══════ MAIN CONTENT (flex-1 p-10 pt-12 space-y-10) ═══════ */}
      <main style={{
        flex: 1, padding: '40px 36px',
        display: 'flex', flexDirection: 'column', gap: 32,
        overflow: 'hidden',
      }}>
        {/* RINGKASAN */}
        {summary && (
          <section>
            <SectionTitle text="RINGKASAN" color={tc} />
            <p style={{ fontSize: '10pt', lineHeight: 1.5, color: '#374151', marginTop: 12 }}>
              {summary}
            </p>
          </section>
        )}

        {/* PENDIDIKAN */}
        {education.some(e => e.institution) && (
          <section>
            <SectionTitle text="PENDIDIKAN" color={tc} />
            <div style={{ marginTop: 12 }}>
              {education.filter(e => e.institution).map((edu, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <h3 style={{ color: tc, fontWeight: 700, fontStyle: 'italic', fontSize: 13, margin: 0 }}>
                    {edu.institution.toUpperCase()}
                    {edu.startDate && ` (${edu.startDate} - ${edu.endDate || 'Sekarang'})`}
                  </h3>
                  <p style={{ fontSize: '10pt', color: '#374151', margin: '3px 0 0' }}>
                    {edu.degree}{edu.field ? ` ${edu.field}` : ''}
                    {edu.gpa ? ` — IPK ${edu.gpa}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SERTIFIKASI */}
        {certifications.some(c => c) && (
          <section>
            <SectionTitle text="SERTIFIKASI" color={tc} />
            <div style={{ marginTop: 12 }}>
              {certifications.filter(c => c).map((cert, i) => (
                <p key={i} style={{ fontSize: '10pt', color: '#374151', fontStyle: 'italic', margin: '0 0 4px' }}>
                  {cert}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* PENGALAMAN */}
        {experience.some(e => e.company || e.role) && (
          <section>
            <SectionTitle text="PENGALAMAN" color={tc} />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {experience.filter(e => e.company || e.role).map((exp, i) => (
                <div key={i}>
                  <h3 style={{ color: tc, fontWeight: 700, fontSize: 14, margin: '0 0 3px' }}>
                    {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                  </h3>
                  <p style={{ fontSize: '10pt', fontStyle: 'italic', color: '#374151', margin: '0 0 10px' }}>
                    {exp.role}
                    {exp.startDate && ` (${exp.startDate} – ${exp.current ? 'Sekarang' : exp.endDate || ''})`}
                  </p>
                  <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {exp.bullets?.filter(b => b).map((b, j) => (
                      <li key={j} style={{ fontSize: '9pt', lineHeight: 1.5, color: '#374151' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

/**
 * Section title with flex ::after line — matches .section-title::after from HTML
 */
function SectionTitle({ text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <h2 style={{
        fontSize: 18, fontWeight: 800, color,
        textTransform: 'uppercase', letterSpacing: '0.05em',
        margin: 0, whiteSpace: 'nowrap',
      }}>
        {text}
      </h2>
      <div style={{ flexGrow: 1, height: 1.5, background: color }} />
    </div>
  )
}

/* SVG Icons — exact copies from code.html */
function emailSvg() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
}
function phoneSvg() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
}
function globeSvg() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18c0-.55-.45-1-1-1H8v-2c0-.55-.45-1-1-1H5.07C4.4 13.09 4 12.07 4 11v-.07L9 16v1c0 1.1.9 2 2 2v1.93zM17.9 17.39C17.64 16.59 16.89 16 16 16h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.93 5.77 20 8.65 20 12c0 2.08-.8 3.97-2.1 5.39z" /></svg>
}
function linkedinSvg() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
}

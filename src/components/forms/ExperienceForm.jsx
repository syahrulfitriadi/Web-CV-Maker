import { useCVStore } from '../../store/useCVStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Briefcase } from 'lucide-react'

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, background: '#f8fafc',
  border: '1.5px solid #e2e8f0', color: '#1e293b', fontSize: 13, outline: 'none',
}

export default function ExperienceForm() {
  const { experience, addExperience, removeExperience, updateExperience, addBullet, updateBullet, removeBullet } = useCVStore()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Pengalaman Kerja</h2>
          <p style={{ fontSize: 14, color: '#64748b' }}>Tambahkan riwayat pekerjaan Anda</p>
        </div>
        <button onClick={addExperience}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, background: '#eff6ff', color: '#0369a1', fontWeight: 600, fontSize: 13, border: '1px solid #bfdbfe', cursor: 'pointer' }}
        >
          <Plus style={{ width: 15, height: 15 }} /> Tambah
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {experience.map((exp, idx) => (
          <motion.div key={exp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: 20, background: '#fafbfc', borderRadius: 16, border: '1.5px solid #e2e8f0' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                <Briefcase style={{ width: 15, height: 15 }} /> Pengalaman #{idx + 1}
              </span>
              {experience.length > 1 && (
                <button onClick={() => removeExperience(exp.id)}
                  style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: 15, height: 15 }} />
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Perusahaan</label>
                <input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="PT Contoh Indonesia" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Lokasi</label>
                <input value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} placeholder="Jakarta, Indonesia" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Posisi / Jabatan</label>
                <input value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Graphic Designer" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Tipe</label>
                <select value={exp.type} onChange={(e) => updateExperience(exp.id, 'type', e.target.value)} style={inputStyle}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Mulai</label>
                <input value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2022" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Selesai</label>
                <input value={exp.current ? 'Sekarang' : exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Des 2023" style={{ ...inputStyle, opacity: exp.current ? 0.5 : 1 }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, cursor: 'pointer', fontSize: 12, color: '#64748b' }}>
                  <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} /> Masih bekerja di sini
                </label>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Deskripsi Pekerjaan</label>
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                  <span style={{ marginTop: 12, width: 6, height: 6, borderRadius: '50%', background: '#0ea5e9', flexShrink: 0 }} />
                  <input value={bullet} onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)} placeholder="Deskripsikan tanggung jawab..." style={{ ...inputStyle, flex: 1 }} />
                  {exp.bullets.length > 1 && (
                    <button onClick={() => removeBullet(exp.id, bIdx)} style={{ padding: 4, marginTop: 6, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => addBullet(exp.id)}
                style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Plus style={{ width: 13, height: 13 }} /> Tambah poin
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

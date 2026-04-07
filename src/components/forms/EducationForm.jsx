import { useCVStore } from '../../store/useCVStore'
import { motion } from 'framer-motion'
import { Plus, Trash2, GraduationCap } from 'lucide-react'

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, background: '#f8fafc',
  border: '1.5px solid #e2e8f0', color: '#1e293b', fontSize: 13, outline: 'none',
}

export default function EducationForm() {
  const { education, addEducation, removeEducation, updateEducation } = useCVStore()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Pendidikan</h2>
          <p style={{ fontSize: 14, color: '#64748b' }}>Riwayat pendidikan formal Anda</p>
        </div>
        <button onClick={addEducation}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, background: '#eff6ff', color: '#0369a1', fontWeight: 600, fontSize: 13, border: '1px solid #bfdbfe', cursor: 'pointer' }}
        >
          <Plus style={{ width: 15, height: 15 }} /> Tambah
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {education.map((edu, idx) => (
          <motion.div key={edu.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: 20, background: '#fafbfc', borderRadius: 16, border: '1.5px solid #e2e8f0' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                <GraduationCap style={{ width: 15, height: 15 }} /> Pendidikan #{idx + 1}
              </span>
              {education.length > 1 && (
                <button onClick={() => removeEducation(edu.id)}
                  style={{ padding: 6, borderRadius: 8, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <Trash2 style={{ width: 15, height: 15 }} />
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Institusi</label>
                <input value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Universitas Indonesia" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Gelar / Jenjang</label>
                <input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="S1 / Bachelor" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Jurusan / Bidang</label>
                <input value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} placeholder="Desain Komunikasi Visual" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>IPK (opsional)</label>
                <input value={edu.gpa} onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)} placeholder="3.85" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Tahun Mulai</label>
                <input value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="2017" style={inputStyle} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Tahun Selesai</label>
                <input value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="2021" style={{ ...inputStyle, maxWidth: '50%' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

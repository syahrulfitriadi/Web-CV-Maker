import { useCVStore } from '../../store/useCVStore'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Wrench, Heart, Award, X } from 'lucide-react'

const chipInputStyle = {
  padding: '8px 12px', borderRadius: 10, background: '#f8fafc', border: '1.5px solid #e2e8f0',
  color: '#1e293b', fontSize: 13, outline: 'none', width: 170,
}

const certInputStyle = {
  flex: 1, padding: '9px 12px', borderRadius: 10, background: '#f8fafc',
  border: '1.5px solid #e2e8f0', color: '#1e293b', fontSize: 13, outline: 'none',
}

export default function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill, certifications, addCertification, updateCertification, removeCertification } = useCVStore()

  return (
    <div>
      {/* Hard Skills */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
            <Wrench style={{ width: 16, height: 16, color: '#0ea5e9' }} /> Hard Skills
          </span>
          <button onClick={() => addSkill('hard')}
            style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Plus style={{ width: 13, height: 13 }} /> Tambah
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.hard.map((skill, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <input value={skill} onChange={(e) => updateSkill('hard', i, e.target.value)} placeholder="Contoh: Adobe Photoshop" style={chipInputStyle} />
              {skills.hard.length > 1 && (
                <button onClick={() => removeSkill('hard', i)} style={{ padding: 6, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
            <Heart style={{ width: 16, height: 16, color: '#ec4899' }} /> Soft Skills
          </span>
          <button onClick={() => addSkill('soft')}
            style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Plus style={{ width: 13, height: 13 }} /> Tambah
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.soft.map((skill, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <input value={skill} onChange={(e) => updateSkill('soft', i, e.target.value)} placeholder="Contoh: Komunikasi" style={chipInputStyle} />
              {skills.soft.length > 1 && (
                <button onClick={() => removeSkill('soft', i)} style={{ padding: 6, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
            <Award style={{ width: 16, height: 16, color: '#f59e0b' }} /> Sertifikasi (opsional)
          </span>
          <button onClick={addCertification}
            style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Plus style={{ width: 13, height: 13 }} /> Tambah
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {certifications.map((cert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award style={{ width: 16, height: 16, color: '#fbbf24', flexShrink: 0 }} />
              <input value={cert} onChange={(e) => updateCertification(i, e.target.value)} placeholder="Adobe Certified Professional – Photoshop, 2021" style={certInputStyle} />
              {certifications.length > 1 && (
                <button onClick={() => removeCertification(i)} style={{ padding: 4, border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
                  <Trash2 style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

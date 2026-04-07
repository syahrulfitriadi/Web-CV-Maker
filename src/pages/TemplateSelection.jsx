import { motion } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import { Check } from 'lucide-react'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Desain profesional dengan sidebar putih dan aksen warna — cocok untuk semua industri.',
    image: '/template-classic.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Layout bersih dengan sidebar berwarna dan foto bulat — sempurna untuk industri kreatif.',
    image: '/template-modern.png',
  },
]

export default function TemplateSelection() {
  const { selectedTemplate, setSelectedTemplate, setCurrentStep, themeColor } = useCVStore()

  return (
    <div style={{ paddingTop: 88, paddingBottom: 60, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 44 }}
        >
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
            Pilih Template <span className="gradient-text">CV</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 16 }}>
            Pilih desain yang paling sesuai dengan kebutuhan Anda
          </p>
        </motion.div>

        {/* Template Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 780, margin: '0 auto' }}>
          {templates.map((t, i) => {
            const isSelected = selectedTemplate === t.id
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedTemplate(t.id)}
                style={{
                  position: 'relative', cursor: 'pointer', borderRadius: 20,
                  background: 'white', overflow: 'hidden',
                  border: isSelected ? `3px solid ${themeColor}` : '3px solid #e2e8f0',
                  boxShadow: isSelected
                    ? `0 16px 48px ${themeColor}28`
                    : '0 4px 16px rgba(0,0,0,0.06)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                {/* Selected Checkmark */}
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{
                      position: 'absolute', top: 12, right: 12, width: 30, height: 30,
                      borderRadius: '50%', background: themeColor, zIndex: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 4px 12px ${themeColor}55`,
                    }}
                  >
                    <Check style={{ width: 16, height: 16, color: '#fff' }} />
                  </motion.div>
                )}

                {/* CV Preview Image — actual reference image */}
                <div style={{
                  width: '100%', aspectRatio: '210/297', overflow: 'hidden',
                  background: '#f8fafc',
                }}>
                  <img
                    src={t.image}
                    alt={`Template ${t.name}`}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      objectPosition: 'top', display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Name + Desc */}
                <div style={{ padding: '14px 18px 18px', textAlign: 'center' }}>
                  <h3 style={{
                    fontSize: 17, fontWeight: 700, marginBottom: 5,
                    color: isSelected ? themeColor : '#1e293b',
                  }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setCurrentStep(2)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px',
              borderRadius: 16, background: themeColor, color: 'white', fontWeight: 700,
              fontSize: 15, border: 'none', cursor: 'pointer',
              boxShadow: `0 8px 28px ${themeColor}44`,
            }}
          >
            Lanjutkan dengan Template {selectedTemplate === 'classic' ? 'Classic' : 'Modern'} →
          </motion.button>
          <button onClick={() => setCurrentStep(0)}
            style={{ display: 'block', margin: '14px auto 0', fontSize: 14, color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  )
}

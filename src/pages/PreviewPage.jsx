import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import ClassicTemplate from '../templates/ClassicTemplate'
import ModernTemplate from '../templates/ModernTemplate'
import { Download, Palette, Type, ArrowLeft, Check } from 'lucide-react'

const themeColors = [
  { name: 'Sky Blue', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Slate', value: '#475569' },
]

export default function PreviewPage() {
  const {
    personalInfo, summary, experience, education, skills, certifications,
    selectedTemplate, themeColor, fontFamily, setThemeColor, setFontFamily,
    setSelectedTemplate, setCurrentStep,
  } = useCVStore()

  const previewRef = useRef(null)
  const cvData = { personalInfo, summary, experience, education, skills, certifications }

  const handleDownload = useCallback(() => {
    const element = previewRef.current
    if (!element) return
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html><head><title>CV - ${personalInfo.name || 'Document'}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; } @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }</style>
      </head><body>${element.innerHTML}</body></html>
    `)
    printWindow.document.close()
    setTimeout(() => { printWindow.print() }, 500)
  }, [personalInfo.name])

  const TemplateComponent = selectedTemplate === 'classic' ? ClassicTemplate : ModernTemplate

  return (
    <div style={{ paddingTop: 80, paddingBottom: 40, minHeight: '100vh', background: '#eef2f7' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Preview CV</h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>Lihat hasilnya dan sesuaikan warna tema</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setCurrentStep(2)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 12, background: 'white', color: '#475569', fontWeight: 500, fontSize: 14, border: '1px solid #e2e8f0', cursor: 'pointer' }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} /> Edit Data
            </button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 12, background: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(14,165,233,0.3)' }}
            >
              <Download style={{ width: 16, height: 16 }} /> Download PDF
            </motion.button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Colors */}
            <div style={{ background: 'white', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Palette style={{ width: 16, height: 16, color: '#0ea5e9' }} />
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Warna Tema</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {themeColors.map((c) => (
                  <button key={c.value} onClick={() => setThemeColor(c.value)} title={c.name}
                    style={{
                      width: '100%', aspectRatio: '1', borderRadius: 12, border: themeColor === c.value ? '3px solid #1e293b' : '2px solid transparent',
                      background: c.value, cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
                    }}
                  >
                    {themeColor === c.value && <Check style={{ width: 14, height: 14, color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ width: 32, height: 32, borderRadius: 8, cursor: 'pointer', border: 'none' }} />
                <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{themeColor}</span>
              </div>
            </div>

            {/* Font */}
            <div style={{ background: 'white', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Type style={{ width: 16, height: 16, color: '#0ea5e9' }} />
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Font</span>
              </div>
              {[{ label: 'Sans-serif', value: 'sans', ff: "'Inter', sans-serif" }, { label: 'Serif', value: 'serif', ff: "'Playfair Display', serif" }].map((opt) => (
                <button key={opt.value} onClick={() => setFontFamily(opt.value)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', borderRadius: 12, marginBottom: 6, fontSize: 14, cursor: 'pointer',
                    fontFamily: opt.ff, transition: 'all 0.2s',
                    background: fontFamily === opt.value ? '#eff6ff' : '#f8fafc',
                    color: fontFamily === opt.value ? '#0369a1' : '#475569',
                    border: fontFamily === opt.value ? '1.5px solid #bfdbfe' : '1.5px solid #e2e8f0',
                    fontWeight: fontFamily === opt.value ? 600 : 400,
                  }}
                >
                  {opt.label}
                  {fontFamily === opt.value && <Check style={{ width: 16, height: 16 }} />}
                </button>
              ))}
            </div>

            {/* Template */}
            <div style={{ background: 'white', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', marginBottom: 10, display: 'block' }}>Template</span>
              {['classic', 'modern'].map((t) => (
                <button key={t} onClick={() => setSelectedTemplate(t)}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 12, marginBottom: 6,
                    fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    background: selectedTemplate === t ? '#eff6ff' : '#f8fafc',
                    color: selectedTemplate === t ? '#0369a1' : '#475569',
                    border: selectedTemplate === t ? '1.5px solid #bfdbfe' : '1.5px solid #e2e8f0',
                    fontWeight: selectedTemplate === t ? 600 : 400,
                  }}
                >
                  {t === 'classic' ? 'Classic' : 'Modern'}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 620 }}>
              {/* Shadow wrapper */}
              <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)', background: 'white' }}>
                {/* A4 sized container: 794px wide x 1123px tall (96dpi) - scaled down to fit */}
                <div
                  ref={previewRef}
                  style={{
                    width: 794, height: 1123,
                    transform: 'scale(0.78)',
                    transformOrigin: 'top left',
                    marginBottom: -1123 * (1 - 0.78),
                    pointerEvents: 'none',
                  }}
                >
                  <TemplateComponent data={cvData} themeColor={themeColor} fontFamily={fontFamily} />
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
                Preview skala 78% dari ukuran A4 asli
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import { useAuthStore } from '../store/useAuthStore'
import { ArrowRight, Sparkles, Zap, Download, Palette, FileText, Shield, Layout, Star, CloudUpload, FolderOpen } from 'lucide-react'

const features = [
  { icon: Layout, title: 'Template Profesional', desc: 'Pilih dari template CV yang didesain profesional dan siap pakai.', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
  { icon: Zap, title: 'Proses Cepat', desc: 'Buat CV lengkap hanya dalam beberapa menit dengan wizard interaktif.', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { icon: Palette, title: 'Kustomisasi Warna', desc: 'Sesuaikan warna tema dan font sesuai kepribadian Anda.', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  { icon: CloudUpload, title: 'Simpan ke Cloud', desc: 'Login untuk menyimpan CV ke cloud dan edit kapan saja dari perangkat manapun.', gradient: 'linear-gradient(135deg, #10b981, #14b8a6)' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LandingPage() {
  const setCurrentStep = useCVStore((s) => s.setCurrentStep)
  const user = useAuthStore((s) => s.user)

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* BG decorations */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, background: 'rgba(14,165,233,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -120, width: 400, height: 400, background: 'rgba(14,165,233,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Left Text */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 40, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#0369a1', fontSize: 14, fontWeight: 500, marginBottom: 24 }}
              >
                <Sparkles style={{ width: 16, height: 16 }} />
                CV Builder Wizard — Gratis & Mudah
              </motion.div>

              <motion.h1 variants={itemVariants}
                style={{ fontSize: 48, fontWeight: 800, color: '#0f172a', lineHeight: 1.15, marginBottom: 20 }}
              >
                Buat CV{' '}
                <span className="gradient-text">Profesional</span>{' '}
                dalam Hitungan Menit
              </motion.h1>

              <motion.p variants={itemVariants}
                style={{ fontSize: 17, color: '#64748b', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}
              >
                Pilih template, isi data Anda, dan dapatkan CV siap pakai dengan desain modern yang akan membuat HRD terkesan.
              </motion.p>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCurrentStep(1)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px',
                    borderRadius: 16, background: '#0ea5e9', color: 'white', fontWeight: 600,
                    fontSize: 17, border: 'none', cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(14,165,233,0.35)',
                  }}
                >
                  Buat CV Sekarang
                  <ArrowRight style={{ width: 20, height: 20 }} />
                </motion.button>
              </motion.div>

              {/* Secondary CTA for logged-in users */}
              {user && (
                <motion.div variants={itemVariants} style={{ marginTop: 12 }}>
                  <button
                    onClick={() => setCurrentStep(4)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, color: '#0ea5e9', fontWeight: 600,
                    }}
                  >
                    <FolderOpen style={{ width: 16, height: 16 }} />
                    Lihat CV tersimpan →
                  </button>
                </motion.div>
              )}

              <motion.div variants={itemVariants}
                style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 28, fontSize: 13, color: '#94a3b8' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Shield style={{ width: 15, height: 15, color: '#10b981' }} /> 100% Gratis
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText style={{ width: 15, height: 15, color: '#0ea5e9' }} /> Format PDF
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star style={{ width: 15, height: 15, color: '#f59e0b' }} /> Template Premium
                </span>
              </motion.div>
            </motion.div>

            {/* Right — CV Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -20, background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(6,182,212,0.1))', borderRadius: 28, filter: 'blur(20px)' }} />
                <div style={{
                  position: 'relative', background: 'white', borderRadius: 20, padding: 24,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {/* Sidebar */}
                    <div style={{ width: '38%', background: 'linear-gradient(180deg, #0ea5e9, #0284c7)', borderRadius: 14, padding: 16 }}>
                      <div style={{ width: 52, height: 52, margin: '0 auto 12px', borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.3)' }} />
                      </div>
                      {[0.4, 0.25, 0.25].map((_, i) => (
                        <div key={`s${i}`} style={{ marginTop: i === 0 ? 16 : 12 }}>
                          <div style={{ height: 6, background: 'rgba(255,255,255,0.45)', borderRadius: 3, width: '60%', marginBottom: 6 }} />
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, width: '100%', marginBottom: 3 }} />
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, width: '80%', marginBottom: 3 }} />
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, width: '70%' }} />
                        </div>
                      ))}
                    </div>
                    {/* Main */}
                    <div style={{ width: '62%', display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div>
                        <div style={{ height: 14, background: '#1e293b', borderRadius: 3, width: '65%', marginBottom: 6 }} />
                        <div style={{ height: 8, background: '#0ea5e9', borderRadius: 2, width: '40%' }} />
                      </div>
                      {[0.3, 0.4, 0.35].map((w, i) => (
                        <div key={`m${i}`}>
                          <div style={{ height: 7, background: '#0ea5e9', borderRadius: 2, width: `${w * 100}%`, marginBottom: 6 }} />
                          <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, width: '100%', marginBottom: 3 }} />
                          <div style={{ height: 4, background: '#f1f5f9', borderRadius: 2, width: '85%', marginBottom: 3 }} />
                          <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, width: '75%' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ position: 'absolute', top: -12, right: -12, background: 'white', borderRadius: 12, padding: '8px 14px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#10b981' }}
                >
                  <Download style={{ width: 15, height: 15 }} /> PDF Ready
                </motion.div>
                <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 3.5, repeat: Infinity }}
                  style={{ position: 'absolute', bottom: -12, left: -12, background: 'white', borderRadius: 12, padding: '8px 14px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#0ea5e9' }}
                >
                  <Palette style={{ width: 15, height: 15 }} /> Custom Theme
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Kenapa Memilih <span className="gradient-text">CV Builder</span>?
            </h2>
            <p style={{ color: '#64748b', fontSize: 17 }}>Semua yang Anda butuhkan untuk membuat CV profesional ada di sini</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                style={{
                  padding: 28, borderRadius: 20, background: '#f8fafc',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: f.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <f.icon style={{ width: 24, height: 24, color: 'white' }} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8, fontSize: 16 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Cara Membuat CV</h2>
            <p style={{ color: '#64748b', fontSize: 17 }}>3 langkah mudah</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, textAlign: 'center' }}>
            {[
              { n: '01', t: 'Pilih Template', d: 'Pilih desain CV yang sesuai dengan karakter dan industri Anda.' },
              { n: '02', t: 'Isi Data', d: 'Masukkan informasi pribadi, pengalaman, pendidikan, dan keahlian.' },
              { n: '03', t: 'Download PDF', d: 'Preview hasilnya, sesuaikan warna, lalu unduh CV Anda.' },
            ].map((item, i) => (
              <motion.div key={item.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: '#dbeafe', lineHeight: 1 }}>{item.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginTop: -12, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ color: '#64748b', fontSize: 15 }}>{item.d}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentStep(1)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px',
                borderRadius: 16, color: 'white', fontWeight: 600, fontSize: 17, border: 'none',
                cursor: 'pointer', boxShadow: '0 8px 30px rgba(14,165,233,0.35)',
                background: 'linear-gradient(-45deg, #0ea5e9, #0284c7, #06b6d4)',
              }}
            >
              Mulai Sekarang — Gratis!
              <ArrowRight style={{ width: 20, height: 20 }} />
            </motion.button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: 14, color: '#94a3b8' }}>
        © 2026 CV Builder. Made with ❤️ by Backtoroot Project
      </footer>
    </div>
  )
}

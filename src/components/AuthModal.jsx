import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
}

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, signIn, signUp, error, clearError } = useAuthStore()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    clearError()
    setSuccessMessage('')
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage('')

    if (mode === 'register') {
      const result = await signUp(formData.email, formData.password, formData.fullName)
      if (result.success) {
        setSuccessMessage('Akun berhasil dibuat! Cek email untuk verifikasi, atau langsung login.')
        setMode('login')
      }
    } else {
      const result = await signIn(formData.email, formData.password)
      if (result.success) {
        // Auth state change listener will handle the callback
      }
    }

    setIsSubmitting(false)
  }

  if (!showAuthModal) return null

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ padding: 16 }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}
            onClick={closeAuthModal}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 440,
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Header gradient bar */}
            <div
              className="gradient-bg"
              style={{ height: 4 }}
            />

            {/* Close button */}
            <button
              onClick={closeAuthModal}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 36, height: 36, borderRadius: '50%',
                border: 'none', background: '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.background = '#fee2e2'; e.target.style.color = '#ef4444' }}
              onMouseLeave={(e) => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#64748b' }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            {/* Content */}
            <div style={{ padding: '32px 32px 28px' }}>
              {/* Title */}
              <div style={{ marginBottom: 24, textAlign: 'center' }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                  {mode === 'login' ? 'Masuk ke Akun' : 'Buat Akun Baru'}
                </h2>
                <p style={{ fontSize: 14, color: '#64748b' }}>
                  {mode === 'login'
                    ? 'Masuk untuk menyimpan & mengelola CV-mu'
                    : 'Daftar gratis untuk menyimpan CV ke cloud'}
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div style={{
                  padding: '10px 14px', borderRadius: 10, marginBottom: 16,
                  background: '#ecfdf5', border: '1px solid #a7f3d0',
                  fontSize: 13, color: '#065f46', lineHeight: 1.5,
                }}>
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div style={{
                  padding: '10px 14px', borderRadius: 10, marginBottom: 16,
                  background: '#fef2f2', border: '1px solid #fecaca',
                  fontSize: 13, color: '#991b1b',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Name field — only show for register */}
                <AnimatePresence mode="wait">
                  {mode === 'register' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                          Nama Lengkap
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User style={{
                            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                            width: 18, height: 18, color: '#94a3b8',
                          }} />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="John Doe"
                            required={mode === 'register'}
                            style={{
                              width: '100%', padding: '11px 14px 11px 40px',
                              borderRadius: 10, border: '1.5px solid #e2e8f0',
                              fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                              background: '#f8fafc',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{
                      position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                      width: 18, height: 18, color: '#94a3b8',
                    }} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="email@contoh.com"
                      required
                      style={{
                        width: '100%', padding: '11px 14px 11px 40px',
                        borderRadius: 10, border: '1.5px solid #e2e8f0',
                        fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                        background: '#f8fafc',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{
                      position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                      width: 18, height: 18, color: '#94a3b8',
                    }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      minLength={6}
                      style={{
                        width: '100%', padding: '11px 44px 11px 40px',
                        borderRadius: 10, border: '1.5px solid #e2e8f0',
                        fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                        background: '#f8fafc',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                        border: 'none', background: 'none', cursor: 'pointer',
                        color: '#94a3b8', display: 'flex', padding: 4,
                      }}
                    >
                      {showPassword
                        ? <EyeOff style={{ width: 18, height: 18 }} />
                        : <Eye style={{ width: 18, height: 18 }} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gradient-bg"
                  style={{
                    width: '100%', padding: '12px 0',
                    borderRadius: 12, border: 'none',
                    fontSize: 15, fontWeight: 600, color: 'white',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)',
                  }}
                >
                  {isSubmitting && <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />}
                  {mode === 'login' ? 'Masuk' : 'Daftar'}
                </button>
              </form>

              {/* Divider */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                margin: '20px 0',
              }}>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>atau</span>
                <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              </div>

              {/* Switch mode */}
              <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b' }}>
                {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                <button
                  type="button"
                  onClick={switchMode}
                  style={{
                    border: 'none', background: 'none',
                    color: '#0ea5e9', fontWeight: 600,
                    cursor: 'pointer', textDecoration: 'underline',
                    fontSize: 14,
                  }}
                >
                  {mode === 'login' ? 'Daftar gratis' : 'Masuk'}
                </button>
              </p>
            </div>

            {/* Footer note */}
            <div style={{
              padding: '12px 32px', background: '#f8fafc',
              borderTop: '1px solid #f1f5f9',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 11, color: '#94a3b8' }}>
                🔒 Data kamu aman & terenkripsi
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

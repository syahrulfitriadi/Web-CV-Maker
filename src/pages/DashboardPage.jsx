import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText, Trash2, Edit3, Clock, Loader2, AlertCircle, FolderOpen } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useCVStore } from '../store/useCVStore'
import { fetchResumes, deleteResume } from '../lib/resumeService'
import { getPhotoUrl } from '../lib/storageService'

const templateLabels = {
  classic: 'Classic',
  modern: 'Modern',
  minimalist: 'Minimalist',
  creative: 'Creative',
  executive: 'Executive',
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { loadFromCloud, setCurrentStep, resetCV } = useCVStore()
  const [resumes, setResumes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (user) loadResumes()
  }, [user])

  const loadResumes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchResumes(user.id)
      setResumes(data || [])
    } catch (err) {
      setError('Gagal memuat daftar CV: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (resume) => {
    try {
      await loadFromCloud(resume)
      setCurrentStep(3) // Go to Preview
    } catch (err) {
      setError('Gagal memuat CV: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus CV ini? Tindakan ini tidak bisa dibatalkan.')) return
    try {
      setDeletingId(id)
      await deleteResume(id)
      setResumes((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setError('Gagal menghapus CV: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCreateNew = () => {
    resetCV()
    setCurrentStep(1) // Go to Template Selection
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 88 }}>
      <div className="max-w-5xl mx-auto" style={{ padding: '0 24px 60px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a' }}>
              CV <span className="gradient-text">Saya</span>
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>
              Kelola semua CV yang telah kamu simpan
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="gradient-bg"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12,
              border: 'none', color: 'white',
              fontSize: 14, fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)',
            }}
          >
            <Plus style={{ width: 18, height: 18 }} />
            Buat CV Baru
          </button>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '12px 16px', borderRadius: 12, marginBottom: 20,
              background: '#fef2f2', border: '1px solid #fecaca',
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 14, color: '#991b1b',
            }}
          >
            <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
            {error}
          </motion.div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Loader2 style={{ width: 36, height: 36, color: '#0ea5e9', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 14, color: '#64748b' }}>Memuat daftar CV...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && resumes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', padding: '80px 24px',
              background: 'white', borderRadius: 20,
              border: '2px dashed #e2e8f0',
            }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: '#f0f9ff', margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FolderOpen style={{ width: 32, height: 32, color: '#0ea5e9' }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Belum ada CV tersimpan
            </h3>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 24, maxWidth: 360, margin: '0 auto 24px' }}>
              Buat CV baru dan simpan ke cloud agar bisa diakses kapan saja dari perangkat manapun.
            </p>
            <button
              onClick={handleCreateNew}
              className="gradient-bg"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 12,
                border: 'none', color: 'white',
                fontSize: 14, fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)',
              }}
            >
              <Plus style={{ width: 18, height: 18 }} />
              Buat CV Pertamamu
            </button>
          </motion.div>
        )}

        {/* Resume Grid */}
        {!isLoading && resumes.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {resumes.map((resume, index) => {
              const personalInfo = resume.content?.personalInfo || {}
              const name = personalInfo.name || resume.title || 'CV Tanpa Judul'

              return (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    background: 'white', borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.25s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  onClick={() => handleEdit(resume)}
                >
                  {/* Color strip */}
                  <div style={{ height: 4, background: resume.theme_color || '#0ea5e9' }} />

                  <div style={{ padding: 20 }}>
                    {/* Icon + Title */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: `${resume.theme_color || '#0ea5e9'}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <FileText style={{ width: 20, height: 20, color: resume.theme_color || '#0ea5e9' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{
                          fontSize: 15, fontWeight: 600, color: '#0f172a',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {name}
                        </h3>
                        <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                          {templateLabels[resume.template_id] || resume.template_id}
                        </p>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 12, color: '#94a3b8' }}>
                      <Clock style={{ width: 13, height: 13 }} />
                      <span>Diperbarui {formatDate(resume.updated_at)}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEdit(resume) }}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          padding: '8px 0', borderRadius: 8,
                          border: '1px solid #e2e8f0', background: '#f8fafc',
                          fontSize: 13, fontWeight: 500, color: '#374151',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.borderColor = '#0ea5e9'; e.currentTarget.style.color = '#0ea5e9' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#374151' }}
                      >
                        <Edit3 style={{ width: 14, height: 14 }} />
                        Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(resume.id) }}
                        disabled={deletingId === resume.id}
                        style={{
                          width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 8,
                          border: '1px solid #e2e8f0', background: '#f8fafc',
                          cursor: 'pointer', transition: 'all 0.15s',
                          color: '#94a3b8',
                          opacity: deletingId === resume.id ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fecaca'; e.currentTarget.style.color = '#ef4444' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#94a3b8' }}
                      >
                        {deletingId === resume.id
                          ? <Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />
                          : <Trash2 style={{ width: 14, height: 14 }} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

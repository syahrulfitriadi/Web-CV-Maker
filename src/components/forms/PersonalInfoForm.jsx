import { useState, useRef, useCallback, useEffect } from 'react'
import { useCVStore } from '../../store/useCVStore'
import { getPhotoStyle } from '../../utils/photoStyle'
import { processProfilePhoto } from '../../lib/imageService'
import { User, Mail, Phone, MapPin, Globe, Link2, Camera, ZoomIn, ZoomOut, Move, X, Check, RotateCcw, Loader2, AlertCircle } from 'lucide-react'

const fields = [
  { key: 'name', label: 'Nama Lengkap', icon: User, placeholder: 'John Doe', type: 'text' },
  { key: 'title', label: 'Jabatan / Posisi', icon: User, placeholder: 'Graphic Designer', type: 'text' },
  { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@email.com', type: 'email' },
  { key: 'phone', label: 'Nomor Telepon', icon: Phone, placeholder: '+62 812 3456 7890', type: 'tel' },
  { key: 'address', label: 'Alamat / Kota', icon: MapPin, placeholder: 'Jakarta, Indonesia', type: 'text' },
  { key: 'website', label: 'Website (opsional)', icon: Globe, placeholder: 'www.johndoe.com', type: 'url' },
  { key: 'linkedin', label: 'LinkedIn (opsional)', icon: Link2, placeholder: 'linkedin.com/in/johndoe', type: 'text' },
]

const inputStyle = {
  width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
  borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#1e293b',
  fontSize: 14, outline: 'none', transition: 'all 0.2s',
}

export default function PersonalInfoForm() {
  const { personalInfo, setPersonalInfo, setPhoto, setPhotoCrop, summary, setSummary } = useCVStore()
  const [showCropEditor, setShowCropEditor] = useState(false)
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState(null)
  const [photoMeta, setPhotoMeta] = useState(null) // compression stats
  const crop = personalInfo.photoCrop || { scale: 1, posX: 50, posY: 20 }

  // Auto-clear photo error after 5 seconds
  useEffect(() => {
    if (photoError) {
      const timer = setTimeout(() => setPhotoError(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [photoError])

  // Auto-clear photo meta after 4 seconds
  useEffect(() => {
    if (photoMeta) {
      const timer = setTimeout(() => setPhotoMeta(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [photoMeta])

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset input value so the same file can be re-selected
    e.target.value = ''

    setIsProcessingPhoto(true)
    setPhotoError(null)
    setPhotoMeta(null)

    const result = await processProfilePhoto(file)

    if (result.error) {
      setPhotoError(result.error)
      setIsProcessingPhoto(false)
      return
    }

    setPhoto(result.file, result.preview)
    setPhotoMeta(result.meta)
    setIsProcessingPhoto(false)
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Informasi Pribadi</h2>
        <p style={{ fontSize: 14, color: '#64748b' }}>Data dasar yang akan ditampilkan di CV Anda</p>
      </div>

      {/* Photo Upload */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, padding: 20, background: '#f8fafc',
        borderRadius: 16, border: '1.5px solid #e2e8f0', marginBottom: 24,
      }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 16, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: personalInfo.photoPreview ? '3px solid #0ea5e9' : '2px dashed #cbd5e1',
            background: personalInfo.photoPreview ? '#111' : '#f1f5f9',
          }}>
            {personalInfo.photoPreview ? (
              <img src={personalInfo.photoPreview} alt="Profile"
                style={getPhotoStyle(crop)}
              />
            ) : (
              <Camera style={{ width: 40, height: 40, color: '#94a3b8' }} />
            )}
          </div>
          {!personalInfo.photoPreview && !isProcessingPhoto && (
            <input type="file" accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoSelect}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
          )}
          {/* Processing overlay */}
          {isProcessingPhoto && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              borderRadius: 16, zIndex: 2,
            }}>
              <Loader2 style={{ width: 28, height: 28, color: '#0ea5e9', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 11, color: '#64748b', marginTop: 6, fontWeight: 500 }}>Memproses...</span>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, color: '#334155', fontSize: 15, marginBottom: 4 }}>Foto Profil</p>
          <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>
            {isProcessingPhoto
              ? 'Mengompres gambar...'
              : personalInfo.photoPreview
                ? 'Klik "Atur Foto" untuk atur posisi dan zoom'
                : 'Klik area foto untuk upload. JPG, PNG, WebP (maks. 10MB)'}
          </p>

          {/* Photo error message */}
          {photoError && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
              borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca',
              fontSize: 12, color: '#dc2626', marginBottom: 10, fontWeight: 500,
            }}>
              <AlertCircle style={{ width: 14, height: 14, flexShrink: 0 }} />
              {photoError}
            </div>
          )}

          {/* Compression success stats */}
          {photoMeta && !photoError && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
              borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0',
              fontSize: 12, color: '#16a34a', marginBottom: 10, fontWeight: 500,
            }}>
              <Check style={{ width: 14, height: 14, flexShrink: 0 }} />
              Dikompres: {photoMeta.originalSize}KB → {photoMeta.compressedSize}KB ({photoMeta.reduction}% lebih kecil)
            </div>
          )}
          {personalInfo.photoPreview && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setShowCropEditor(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px',
                  borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe',
                  color: '#1d4ed8', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <Move style={{ width: 13, height: 13 }} /> Atur Foto
              </button>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0',
                color: '#16a34a', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>
                <Camera style={{ width: 13, height: 13 }} /> Ganti
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoSelect} style={{ display: 'none' }} />
              </label>
              <button onClick={() => { setPersonalInfo('photo', null); setPersonalInfo('photoPreview', null); setPhotoCrop({ scale: 1.2, posX: 50, posY: 20 }); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px',
                  borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca',
                  color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <X style={{ width: 13, height: 13 }} /> Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Crop Editor Modal */}
      {showCropEditor && personalInfo.photoPreview && (
        <PhotoCropEditor
          src={personalInfo.photoPreview}
          crop={crop}
          setCrop={setPhotoCrop}
          onClose={() => setShowCropEditor(false)}
        />
      )}

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {fields.map((field) => (
          <div key={field.key}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              {field.label}
            </label>
            <div style={{ position: 'relative' }}>
              <field.icon style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94a3b8' }} />
              <input
                type={field.type}
                value={personalInfo[field.key] || ''}
                onChange={(e) => setPersonalInfo(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)' }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ marginTop: 24 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Ringkasan Profil
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Tuliskan ringkasan singkat tentang diri Anda, pengalaman, dan keahlian utama..."
          rows={4}
          style={{ ...inputStyle, paddingLeft: 14, resize: 'none' }}
          onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)' }}
          onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }}
        />
        <p style={{ marginTop: 4, fontSize: 12, color: '#94a3b8' }}>{summary.length}/500 karakter</p>
      </div>
    </div>
  )
}

/**
 * Photo Crop Editor — Drag-to-position using object-position %
 * The image is shown in FULL inside the crop frame.
 * Dragging changes object-position %, scroll changes scale.
 * This is consistent at any container size.
 */
function PhotoCropEditor({ src, crop, setCrop, onClose }) {
  const [local, setLocal] = useState({
    scale: Math.max(1.2, crop.scale || 1.2),
    posX: crop.posX ?? 50,
    posY: crop.posY ?? 20,
  })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0, startPosX: 0, startPosY: 0 })
  const localRef = useRef(local)
  localRef.current = local
  const [previewShape, setPreviewShape] = useState('circle')
  const PREVIEW_SIZE = 280

  const handlePointerDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPosX: localRef.current.posX,
      startPosY: localRef.current.posY,
    }
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    // Sensitivity decreases at higher zoom for finer control
    const sens = 80 / (PREVIEW_SIZE * localRef.current.scale)
    const newPosX = Math.max(0, Math.min(100, dragStartRef.current.startPosX - dx * sens))
    const newPosY = Math.max(0, Math.min(100, dragStartRef.current.startPosY - dy * sens))
    setLocal(prev => ({ ...prev, posX: Math.round(newPosX * 10) / 10, posY: Math.round(newPosY * 10) / 10 }))
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e) => {
    e.preventDefault()
    setLocal(prev => {
      const delta = e.deltaY > 0 ? -0.05 : 0.05
      return { ...prev, scale: Math.round(Math.max(1, Math.min(3, prev.scale + delta)) * 100) / 100 }
    })
  }, [])

  useEffect(() => {
    if (isDragging) {
      const onMove = (e) => handlePointerMove(e)
      const onUp = () => handlePointerUp()
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  const handleSave = () => { setCrop(local); onClose() }
  const handleReset = () => setLocal({ scale: 1.2, posX: 50, posY: 20 })


  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        background: 'white', borderRadius: 24, padding: 28,
        width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>Atur Foto Profil</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X style={{ width: 20, height: 20, color: '#64748b' }} />
          </button>
        </div>

        {/* Shape toggle */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, justifyContent: 'center' }}>
          {[{ key: 'circle', label: 'Lingkaran' }, { key: 'square', label: 'Kotak' }].map(s => (
            <button key={s.key} onClick={() => setPreviewShape(s.key)}
              style={{
                padding: '5px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: previewShape === s.key ? '#0ea5e9' : '#f1f5f9',
                color: previewShape === s.key ? 'white' : '#64748b',
                border: previewShape === s.key ? 'none' : '1px solid #e2e8f0',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Drag area — THE image is shown as cover, drag moves object-position */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div
            onPointerDown={handlePointerDown}
            onWheel={handleWheel}
            style={{
              width: PREVIEW_SIZE, height: PREVIEW_SIZE,
              borderRadius: previewShape === 'circle' ? '50%' : 12,
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              border: '3px solid #0ea5e9',
              boxShadow: '0 8px 32px rgba(14,165,233,0.15)',
              touchAction: 'none', userSelect: 'none',
              background: '#111',
            }}
          >
            <img src={src} alt="Edit" draggable={false}
              style={{
                ...getPhotoStyle(local),
                pointerEvents: 'none',
                transition: isDragging ? 'none' : 'transform 0.1s ease, transform-origin 0.1s ease',
              }}
            />
            {/* Crosshair */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.4)', position: 'absolute' }} />
              <div style={{ height: 1, width: 20, background: 'rgba(255,255,255,0.4)', position: 'absolute' }} />
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginBottom: 14 }}>
          🖱️ Drag untuk geser posisi &nbsp;•&nbsp; Scroll untuk zoom
        </p>

        {/* Zoom slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, padding: '8px 14px', background: '#f8fafc', borderRadius: 10 }}>
          <ZoomOut style={{ width: 16, height: 16, color: '#94a3b8', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setLocal(p => ({ ...p, scale: Math.max(1, Math.round((p.scale - 0.1) * 100) / 100) }))}
          />
          <input type="range" min="1" max="3" step="0.05" value={local.scale}
            onChange={(e) => setLocal(p => ({ ...p, scale: parseFloat(e.target.value) }))}
            style={{ flex: 1, height: 5, borderRadius: 3, appearance: 'none', outline: 'none', background: '#e2e8f0', cursor: 'pointer' }}
          />
          <ZoomIn style={{ width: 16, height: 16, color: '#94a3b8', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setLocal(p => ({ ...p, scale: Math.min(3, Math.round((p.scale + 0.1) * 100) / 100) }))}
          />
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace', minWidth: 40, textAlign: 'right' }}>
            {Math.round(local.scale * 100)}%
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={handleReset}
            style={{
              display: 'flex', alignItems: 'center', gap: 5, padding: '9px 18px', borderRadius: 10,
              background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            <RotateCcw style={{ width: 13, height: 13 }} /> Reset
          </button>
          <button onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '9px 24px', borderRadius: 10,
              background: '#0ea5e9', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(14,165,233,0.3)',
            }}
          >
            <Check style={{ width: 14, height: 14 }} /> Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

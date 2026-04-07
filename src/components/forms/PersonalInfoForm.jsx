import { useCVStore } from '../../store/useCVStore'
import { User, Mail, Phone, MapPin, Globe, Link2, Camera } from 'lucide-react'

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
  const { personalInfo, setPersonalInfo, setPhoto, summary, setSummary } = useCVStore()

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Informasi Pribadi</h2>
        <p style={{ fontSize: 14, color: '#64748b' }}>Data dasar yang akan ditampilkan di CV Anda</p>
      </div>

      {/* Photo Upload */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#f8fafc',
        borderRadius: 16, border: '1.5px solid #e2e8f0', marginBottom: 24,
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 14, overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: personalInfo.photoPreview ? '2px solid #0ea5e9' : '2px dashed #cbd5e1',
            background: personalInfo.photoPreview ? 'transparent' : '#f1f5f9',
          }}>
            {personalInfo.photoPreview ? (
              <img src={personalInfo.photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera style={{ width: 28, height: 28, color: '#94a3b8' }} />
            )}
          </div>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
          />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: '#334155', fontSize: 14 }}>Foto Profil</p>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>Klik untuk upload. JPG, PNG (maks. 2MB)</p>
        </div>
      </div>

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
          style={{
            ...inputStyle, paddingLeft: 14, resize: 'none',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.12)' }}
          onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }}
        />
        <p style={{ marginTop: 4, fontSize: 12, color: '#94a3b8' }}>{summary.length}/500 karakter</p>
      </div>
    </div>
  )
}

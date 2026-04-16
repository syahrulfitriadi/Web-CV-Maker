import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, FolderOpen, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export default function UserMenu({ onOpenDashboard }) {
  const { user, signOut, openAuthModal } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Not logged in → show login button
  if (!user) {
    return (
      <button
        onClick={() => openAuthModal()}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 16px', borderRadius: 10,
          border: '1.5px solid #e2e8f0', background: 'white',
          fontSize: 13, fontWeight: 600, color: '#374151',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#0ea5e9'
          e.currentTarget.style.color = '#0ea5e9'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0'
          e.currentTarget.style.color = '#374151'
        }}
      >
        <User style={{ width: 15, height: 15 }} />
        <span className="hidden sm:inline">Masuk</span>
      </button>
    )
  }

  // Logged in → show avatar + dropdown
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const avatarLetter = displayName.charAt(0).toUpperCase()

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 12px 5px 5px', borderRadius: 50,
          border: '1.5px solid #e2e8f0', background: 'white',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0ea5e9'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
      >
        {/* Avatar */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: 'white',
        }}>
          {avatarLetter}
        </div>
        <span
          className="hidden md:inline"
          style={{ fontSize: 13, fontWeight: 600, color: '#374151', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {displayName}
        </span>
        <ChevronDown style={{
          width: 14, height: 14, color: '#94a3b8',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 220, background: 'white',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
              zIndex: 50,
            }}
          >
            {/* User info */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{displayName}</p>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{user.email}</p>
            </div>

            {/* Menu items */}
            <div style={{ padding: '6px' }}>
              <MenuItem
                icon={<FolderOpen style={{ width: 16, height: 16 }} />}
                label="CV Saya"
                onClick={() => { setIsOpen(false); onOpenDashboard?.() }}
              />
              <MenuItem
                icon={<LogOut style={{ width: 16, height: 16 }} />}
                label="Keluar"
                danger
                onClick={() => { setIsOpen(false); signOut() }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuItem({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '10px 12px', borderRadius: 8,
        border: 'none', background: 'none',
        fontSize: 13, fontWeight: 500,
        color: danger ? '#ef4444' : '#374151',
        cursor: 'pointer', transition: 'background 0.15s',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = danger ? '#fef2f2' : '#f0f9ff'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
    >
      {icon}
      {label}
    </button>
  )
}

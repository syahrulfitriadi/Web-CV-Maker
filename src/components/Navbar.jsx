import { useCVStore } from '../store/useCVStore'
import { useAuthStore } from '../store/useAuthStore'
import { FileText, RotateCcw, Zap } from 'lucide-react'
import UserMenu from './UserMenu'

const steps = ['Beranda', 'Template', 'Isi Data', 'Preview']

export default function Navbar() {
  const { currentStep, setCurrentStep, resetCV, fillDummyData } = useCVStore()
  const { user } = useAuthStore()

  const handleOpenDashboard = () => {
    if (user) {
      setCurrentStep(4) // Dashboard step
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid #e2e8f0' }}>
      <div className="max-w-7xl mx-auto" style={{ padding: '0 32px' }}>
        <div className="flex items-center justify-between" style={{ height: 64 }}>
          {/* Logo */}
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">
              CV<span className="gradient-text">Builder</span>
            </span>
          </button>

          {/* Step Indicators */}
          {currentStep > 0 && currentStep <= 3 && (
            <div className="hidden sm:flex items-center" style={{ gap: 4 }}>
              {steps.slice(1).map((step, index) => {
                const stepNum = index + 1
                const isActive = currentStep === stepNum
                const isCompleted = currentStep > stepNum
                const isClickable = isCompleted || isActive

                return (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => {
                        if (isClickable) setCurrentStep(stepNum)
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 16px', borderRadius: 50,
                        fontSize: 13, fontWeight: 600,
                        border: 'none',
                        cursor: isClickable ? 'pointer' : 'default',
                        transition: 'all 0.25s ease',
                        background: isActive ? '#0ea5e9' : isCompleted ? '#dbeafe' : '#f1f5f9',
                        color: isActive ? 'white' : isCompleted ? '#0369a1' : '#94a3b8',
                        boxShadow: isActive ? '0 4px 14px rgba(14,165,233,0.35)' : 'none',
                        opacity: isClickable ? 1 : 0.6,
                      }}
                    >
                      <span
                        style={{
                          width: 22, height: 22, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700,
                          background: isActive ? 'rgba(255,255,255,0.3)' : isCompleted ? '#0ea5e9' : '#cbd5e1',
                          color: isActive ? 'white' : isCompleted ? 'white' : '#64748b',
                        }}
                      >
                        {isCompleted ? '✓' : stepNum}
                      </span>
                      <span className="hidden md:inline">{step}</span>
                    </button>
                    {index < 2 && (
                      <div
                        style={{
                          width: 28, height: 2, margin: '0 6px', borderRadius: 1,
                          background: currentStep > stepNum ? '#0ea5e9' : '#e2e8f0',
                          transition: 'background 0.3s ease',
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Dashboard title */}
          {currentStep === 4 && (
            <div className="hidden sm:flex items-center">
              <span style={{
                padding: '7px 16px', borderRadius: 50,
                fontSize: 13, fontWeight: 600,
                background: '#0ea5e9', color: 'white',
                boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
              }}>
                📁 CV Saya
              </span>
            </div>
          )}

          {/* Right side: Dev + Reset + Auth */}
          <div className="flex items-center gap-2">
            {/* DEV ONLY: Auto Fill */}
            <button
              onClick={() => { fillDummyData(); setCurrentStep(3) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 12px', borderRadius: 8,
                background: '#7c3aed', color: 'white',
                fontSize: 12, fontWeight: 600, border: 'none',
                cursor: 'pointer', opacity: 0.9,
              }}
              title="DEV: Isi data dummy lalu langsung ke Preview"
            >
              <Zap style={{ width: 13, height: 13 }} />
              Dev Fill
            </button>

            {currentStep > 0 && currentStep <= 3 && (
              <button
                onClick={() => { if (confirm('Reset semua data CV?')) resetCV() }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* User Menu / Login Button */}
            <UserMenu onOpenDashboard={handleOpenDashboard} />
          </div>
        </div>
      </div>
    </nav>
  )
}

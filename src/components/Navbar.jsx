import { useCVStore } from '../store/useCVStore'
import { FileText, RotateCcw, Zap } from 'lucide-react'

const steps = ['Beranda', 'Template', 'Isi Data', 'Preview']

export default function Navbar() {
  const { currentStep, setCurrentStep, resetCV, fillDummyData } = useCVStore()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid #e2e8f0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
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
          {currentStep > 0 && (
            <div className="hidden sm:flex items-center gap-1">
              {steps.slice(1).map((step, index) => {
                const stepNum = index + 1
                const isActive = currentStep === stepNum
                const isCompleted = currentStep > stepNum

                return (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => {
                        if (isCompleted || isActive) setCurrentStep(stepNum)
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer"
                      style={{
                        background: isActive ? '#0ea5e9' : isCompleted ? '#dbeafe' : '#f1f5f9',
                        color: isActive ? 'white' : isCompleted ? '#0369a1' : '#94a3b8',
                        boxShadow: isActive ? '0 4px 12px rgba(14,165,233,0.3)' : 'none',
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
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
                        className="w-8 h-0.5 mx-1 rounded"
                        style={{ background: currentStep > stepNum ? '#0ea5e9' : '#e2e8f0' }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Dev + Reset buttons */}
          <div className="flex items-center gap-2">
            {/* DEV ONLY: Auto Fill — hapus saat production */}
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

            {currentStep > 0 && (
              <button
                onClick={() => { if (confirm('Reset semua data CV?')) resetCV() }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

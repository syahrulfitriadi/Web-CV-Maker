import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import { User, Briefcase, GraduationCap, Wrench, ChevronLeft, ChevronRight } from 'lucide-react'

const subSteps = [
  { id: 0, label: 'Pribadi', Icon: User },
  { id: 1, label: 'Pengalaman', Icon: Briefcase },
  { id: 2, label: 'Pendidikan', Icon: GraduationCap },
  { id: 3, label: 'Keahlian', Icon: Wrench },
]

export default function FormWizard() {
  const { setCurrentStep } = useCVStore()
  const [subStep, setSubStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const goNext = () => {
    if (subStep < 3) { setDirection(1); setSubStep(subStep + 1) }
    else { setCurrentStep(3) }
  }
  const goBack = () => {
    if (subStep > 0) { setDirection(-1); setSubStep(subStep - 1) }
    else { setCurrentStep(1) }
  }

  const progress = ((subStep + 1) / 4) * 100

  const renderForm = () => {
    switch (subStep) {
      case 0: return <PersonalInfoForm />
      case 1: return <ExperienceForm />
      case 2: return <EducationForm />
      case 3: return <SkillsForm />
      default: return null
    }
  }

  return (
    <div style={{ paddingTop: 80, paddingBottom: 40, minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>

        {/* Progress Bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#475569' }}>
              Langkah {subStep + 1} dari 4
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0ea5e9' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #0ea5e9, #06b6d4)' }}
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex', gap: 4, background: 'white', borderRadius: 16,
          padding: 6, marginBottom: 24, border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          {subSteps.map((step) => {
            const isActive = subStep === step.id
            return (
              <button key={step.id}
                onClick={() => { setDirection(step.id > subStep ? 1 : -1); setSubStep(step.id) }}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 6, padding: '10px 8px', borderRadius: 12, fontSize: 14, fontWeight: 500,
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                  background: isActive ? '#0ea5e9' : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  boxShadow: isActive ? '0 4px 12px rgba(14,165,233,0.3)' : 'none',
                }}
              >
                <step.Icon style={{ width: 16, height: 16 }} />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            )
          })}
        </div>

        {/* Form Content */}
        <div style={{
          background: 'white', borderRadius: 20, padding: 28,
          border: '1px solid #e2e8f0', minHeight: 420,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={subStep}
              custom={direction}
              initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 60 : -60, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderForm()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={goBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
              borderRadius: 12, background: 'white', color: '#475569', fontWeight: 500,
              fontSize: 14, border: '1px solid #e2e8f0', cursor: 'pointer',
            }}
          >
            <ChevronLeft style={{ width: 16, height: 16 }} />
            {subStep === 0 ? 'Pilih Template' : 'Kembali'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={goNext}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '10px 24px',
              borderRadius: 12, background: '#0ea5e9', color: 'white', fontWeight: 600,
              fontSize: 14, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(14,165,233,0.3)',
            }}
          >
            {subStep === 3 ? 'Preview CV' : 'Lanjutkan'}
            <ChevronRight style={{ width: 16, height: 16 }} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

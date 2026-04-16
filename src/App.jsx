import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCVStore } from './store/useCVStore'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import LandingPage from './pages/LandingPage'
import TemplateSelection from './pages/TemplateSelection'
import FormWizard from './pages/FormWizard'
import PreviewPage from './pages/PreviewPage'
import DashboardPage from './pages/DashboardPage'

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
}

function App() {
  const currentStep = useCVStore((s) => s.currentStep)
  const initialize = useAuthStore((s) => s.initialize)

  // Initialize auth listener on mount (non-blocking)
  useEffect(() => {
    const unsubscribe = initialize()
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LandingPage key="landing" />
      case 1:
        return <TemplateSelection key="template" />
      case 2:
        return <FormWizard key="form" />
      case 3:
        return <PreviewPage key="preview" />
      case 4:
        return <DashboardPage key="dashboard" />
      default:
        return <LandingPage key="landing" />
    }
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Global Auth Modal — can be triggered from anywhere */}
      <AuthModal />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCVStore } from './store/useCVStore'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import TemplateSelection from './pages/TemplateSelection'
import FormWizard from './pages/FormWizard'
import PreviewPage from './pages/PreviewPage'

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
}

function App() {
  const currentStep = useCVStore((s) => s.currentStep)

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
    </div>
  )
}

export default App

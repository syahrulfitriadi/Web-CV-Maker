import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function StepNavigation({ onBack, onNext, backLabel = 'Kembali', nextLabel = 'Lanjutkan', showBack = true }) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-surface-200">
      {showBack ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-surface-600 hover:text-surface-800 hover:bg-surface-100 transition-all font-medium cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </motion.button>
      ) : (
        <div />
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all font-medium cursor-pointer"
      >
        {nextLabel}
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

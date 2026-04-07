import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const progress = ((current) / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-surface-600">
          Langkah {current} dari {total}
        </span>
        <span className="text-sm font-bold gradient-text">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-surface-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-bg"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import { Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Desain profesional dengan sidebar gelap dan aksen warna — cocok untuk semua industri.',
    image: '/Classic.webp',
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Layout bersih dengan sidebar berwarna dan foto bulat — sempurna untuk industri kreatif.',
    image: '/Modern.webp',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    desc: 'Layout satu kolom ultra-bersih tanpa sidebar — elegan untuk akademisi dan tech professional.',
    image: '/Minimalist.webp',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Header bold berwarna penuh dengan 2 kolom — sempurna untuk desainer dan marketer.',
    image: '/creative.webp',
  },
  {
    id: 'executive',
    name: 'Executive',
    desc: 'Sidebar kanan premium dengan gaya korporat formal — ideal untuk manajer dan eksekutif.',
    image: '/Executive.webp',
  },
]

export default function TemplateSelection() {
  const { selectedTemplate, setSelectedTemplate, setCurrentStep, themeColor } = useCVStore()
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, templates.findIndex(t => t.id === selectedTemplate))
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef(null)

  // Touch/drag support
  const dragStartX = useRef(0)
  const isDragging = useRef(false)

  const activeTemplate = templates[activeIndex]

  const goTo = (index) => {
    if (isTransitioning || index < 0 || index >= templates.length) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setSelectedTemplate(templates[index].id)
    setTimeout(() => setIsTransitioning(false), 400)
  }

  const goNext = () => goTo(activeIndex + 1)
  const goPrev = () => goTo(activeIndex - 1)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, isTransitioning])

  // Touch handlers
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX
    isDragging.current = true
  }
  const handleTouchEnd = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    isDragging.current = false
  }

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX
    isDragging.current = true
  }
  const handleMouseUp = (e) => {
    if (!isDragging.current) return
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    isDragging.current = false
  }

  // Get the 3 visible cards: prev, active, next
  const getCardStyle = (index) => {
    const diff = index - activeIndex
    const isActive = diff === 0
    const isPrev = diff === -1
    const isNext = diff === 1

    if (!isActive && !isPrev && !isNext) {
      return {
        opacity: 0,
        transform: diff < -1 ? 'translateX(-180%) scale(0.7)' : 'translateX(180%) scale(0.7)',
        pointerEvents: 'none',
        zIndex: 0,
      }
    }

    if (isActive) {
      return {
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        zIndex: 3,
        pointerEvents: 'auto',
      }
    }

    if (isPrev) {
      return {
        opacity: 0.55,
        transform: 'translateX(-72%) scale(0.78)',
        zIndex: 2,
        pointerEvents: 'auto',
        filter: 'brightness(0.7)',
      }
    }

    if (isNext) {
      return {
        opacity: 0.55,
        transform: 'translateX(72%) scale(0.78)',
        zIndex: 2,
        pointerEvents: 'auto',
        filter: 'brightness(0.7)',
      }
    }
  }

  return (
    <div style={{ paddingTop: 88, paddingBottom: 40, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Pilih Template <span className="gradient-text">CV</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>
            Geser atau klik untuk melihat template — pilih yang paling sesuai
          </p>
        </motion.div>

        {/* Carousel Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}
        >
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Template sebelumnya"
            style={{
              position: 'absolute', left: -20, top: '45%', transform: 'translateY(-50%)',
              zIndex: 20, width: 44, height: 44, borderRadius: '50%',
              background: activeIndex === 0 ? '#f1f5f9' : 'white',
              border: 'none', cursor: activeIndex === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: activeIndex === 0 ? 'none' : '0 4px 20px rgba(0,0,0,0.12)',
              opacity: activeIndex === 0 ? 0.4 : 1,
              transition: 'all 0.3s',
            }}
          >
            <ChevronLeft style={{ width: 22, height: 22, color: activeIndex === 0 ? '#94a3b8' : '#334155' }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            disabled={activeIndex === templates.length - 1}
            aria-label="Template berikutnya"
            style={{
              position: 'absolute', right: -20, top: '45%', transform: 'translateY(-50%)',
              zIndex: 20, width: 44, height: 44, borderRadius: '50%',
              background: activeIndex === templates.length - 1 ? '#f1f5f9' : 'white',
              border: 'none', cursor: activeIndex === templates.length - 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: activeIndex === templates.length - 1 ? 'none' : '0 4px 20px rgba(0,0,0,0.12)',
              opacity: activeIndex === templates.length - 1 ? 0.4 : 1,
              transition: 'all 0.3s',
            }}
          >
            <ChevronRight style={{ width: 22, height: 22, color: activeIndex === templates.length - 1 ? '#94a3b8' : '#334155' }} />
          </motion.button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
              position: 'relative',
              height: 480,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'grab',
              userSelect: 'none',
            }}
          >
            {templates.map((t, index) => {
              const cardStyle = getCardStyle(index)
              const isActive = index === activeIndex
              const isSelected = selectedTemplate === t.id

              return (
                <motion.div
                  key={t.id}
                  onClick={() => {
                    if (!isActive) goTo(index)
                  }}
                  animate={cardStyle}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 35,
                    mass: 0.8,
                  }}
                  style={{
                    position: 'absolute',
                    width: '58%',
                    maxWidth: 360,
                    borderRadius: 16,
                    overflow: 'hidden',
                    cursor: isActive ? 'default' : 'pointer',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: '#f8fafc',
                      border: isActive && isSelected
                        ? `3px solid ${themeColor}`
                        : '3px solid transparent',
                      boxShadow: isActive
                        ? `0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)`
                        : '0 8px 24px -8px rgba(0,0,0,0.15)',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                  >
                    {/* Selected Checkmark */}
                    {isActive && isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        style={{
                          position: 'absolute', top: 10, right: 10, width: 30, height: 30,
                          borderRadius: '50%', background: themeColor, zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 4px 14px ${themeColor}55`,
                        }}
                      >
                        <Check style={{ width: 15, height: 15, color: '#fff' }} />
                      </motion.div>
                    )}

                    {/* Template Image */}
                    <img
                      src={t.image}
                      alt={`Template ${t.name}`}
                      draggable={false}
                      style={{
                        width: '100%',
                        display: 'block',
                        userSelect: 'none',
                      }}
                    />

                    {/* Gradient Overlay (only on active) */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 45%, rgba(15,23,42,0.15) 75%, transparent 100%)',
                        padding: '56px 16px 16px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                      }}>
                        {/* Template Name */}
                        <h3 style={{
                          fontSize: 18, fontWeight: 700, color: '#fff',
                          marginBottom: 4, textAlign: 'center',
                          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}>
                          {t.name}
                        </h3>
                        {/* Template Description */}
                        <p style={{
                          fontSize: 11.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5,
                          textAlign: 'center', maxWidth: 280, marginBottom: 12,
                        }}>
                          {t.desc}
                        </p>
                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTemplate(t.id)
                            setCurrentStep(2)
                          }}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '8px 20px',
                            borderRadius: 10,
                            background: themeColor,
                            color: 'white', fontWeight: 600, fontSize: 12,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: `0 6px 20px ${themeColor}44`,
                            transition: 'all 0.3s',
                          }}
                        >
                          Pilih {t.name}
                          <ArrowRight style={{ width: 13, height: 13 }} />
                        </motion.button>
                      </div>
                    )}

                    {/* Non-active label at bottom */}
                    {!isActive && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)',
                        padding: '28px 12px 10px',
                        textAlign: 'center',
                      }}>
                        <p style={{
                          fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                          margin: 0,
                        }}>
                          {t.name}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          {/* Dot Indicators */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 8,
            marginBottom: 14,
          }}>
            {templates.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                style={{
                  width: activeIndex === i ? 28 : 10,
                  height: 10,
                  borderRadius: 10,
                  background: activeIndex === i ? themeColor : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTemplate.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: 13, color: '#94a3b8', marginBottom: 12,
              }}
            >
              {activeIndex + 1} / {templates.length} — <span style={{ color: themeColor, fontWeight: 600 }}>{activeTemplate.name}</span>
            </motion.p>
          </AnimatePresence>

          <button onClick={() => setCurrentStep(0)}
            style={{
              fontSize: 13, color: '#94a3b8', background: 'none',
              border: 'none', cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#64748b'}
            onMouseLeave={e => e.target.style.color = '#94a3b8'}
          >
            ← Kembali ke beranda
          </button>
        </div>
      </div>
    </div>
  )
}

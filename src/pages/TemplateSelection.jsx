import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import { Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Desain profesional dengan sidebar gelap dan aksen warna — cocok untuk semua industri.',
    image: '/Sample 1.webp',
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Layout bersih dengan sidebar berwarna dan foto bulat — sempurna untuk industri kreatif.',
    image: '/sample 2.webp',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    desc: 'Layout satu kolom ultra-bersih tanpa sidebar — elegan untuk akademisi dan tech professional.',
    image: '/sample-minimalist.webp',
  },
  {
    id: 'creative',
    name: 'Creative',
    desc: 'Header bold berwarna penuh dengan 2 kolom — sempurna untuk desainer dan marketer.',
    image: '/sample-creative.webp',
  },
  {
    id: 'executive',
    name: 'Executive',
    desc: 'Sidebar kanan premium dengan gaya korporat formal — ideal untuk manajer dan eksekutif.',
    image: '/sample-executive.webp',
  },
]

export default function TemplateSelection() {
  const { selectedTemplate, setSelectedTemplate, setCurrentStep, themeColor } = useCVStore()
  const [activeIndex, setActiveIndex] = useState(
    templates.findIndex(t => t.id === selectedTemplate) || 0
  )
  const swiperRef = useRef(null)

  const activeTemplate = templates[activeIndex]

  return (
    <div style={{ paddingTop: 88, paddingBottom: 40, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Pilih Template <span className="gradient-text">CV</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>
            Geser untuk melihat template — pilih yang paling sesuai
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ position: 'relative', maxWidth: 400, margin: '0 auto' }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Template sebelumnya"
            style={{
              position: 'absolute', left: -56, top: '42%', transform: 'translateY(-50%)',
              zIndex: 20, width: 42, height: 42, borderRadius: '50%',
              background: 'white', border: '2px solid #e2e8f0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = themeColor
              e.currentTarget.style.boxShadow = `0 4px 20px ${themeColor}30`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e8f0'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
            }}
          >
            <ChevronLeft style={{ width: 20, height: 20, color: '#475569' }} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Template berikutnya"
            style={{
              position: 'absolute', right: -56, top: '42%', transform: 'translateY(-50%)',
              zIndex: 20, width: 42, height: 42, borderRadius: '50%',
              background: 'white', border: '2px solid #e2e8f0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = themeColor
              e.currentTarget.style.boxShadow = `0 4px 20px ${themeColor}30`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e8f0'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
            }}
          >
            <ChevronRight style={{ width: 20, height: 20, color: '#475569' }} />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[EffectCards]}
            effect="cards"
            grabCursor={true}
            initialSlide={activeIndex}
            cardsEffect={{
              perSlideRotate: 3,
              perSlideOffset: 9,
              slideShadows: false,
            }}
            onSwiper={(swiper) => { swiperRef.current = swiper }}
            onSlideChange={(swiper) => {
              const idx = swiper.activeIndex
              setActiveIndex(idx)
              setSelectedTemplate(templates[idx].id)
            }}
            style={{ padding: '8px 0 16px', overflow: 'visible' }}
          >
            {templates.map((t) => {
              const isSelected = selectedTemplate === t.id
              return (
                <SwiperSlide key={t.id} style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: '#1e293b',
                      border: isSelected ? `3px solid ${themeColor}` : '3px solid rgba(255,255,255,0.1)',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {/* Selected Checkmark */}
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        style={{
                          position: 'absolute', top: 12, right: 12, width: 32, height: 32,
                          borderRadius: '50%', background: themeColor, zIndex: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 4px 14px ${themeColor}55`,
                        }}
                      >
                        <Check style={{ width: 16, height: 16, color: '#fff' }} />
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

                    {/* Gradient Overlay + Info + CTA — fused into the card */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.4) 75%, transparent 100%)',
                      padding: '64px 20px 20px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                      {/* Template Name */}
                      <h3 style={{
                        fontSize: 20, fontWeight: 700, color: '#fff',
                        marginBottom: 6, textAlign: 'center',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}>
                        {t.name}
                      </h3>
                      {/* Template Description */}
                      <p style={{
                        fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5,
                        textAlign: 'center', maxWidth: 320, marginBottom: 14,
                      }}>
                        {t.desc}
                      </p>
                      {/* CTA Button inside card */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedTemplate(t.id)
                          setCurrentStep(2)
                        }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '10px 24px',
                          borderRadius: 12,
                          background: isSelected ? themeColor : 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)',
                          color: 'white', fontWeight: 600, fontSize: 13,
                          border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.25)',
                          cursor: 'pointer',
                          boxShadow: isSelected ? `0 6px 20px ${themeColor}55` : 'none',
                          transition: 'all 0.3s',
                        }}
                      >
                        Pilih {t.name}
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </motion.button>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </motion.div>

        {/* Dots + Back — compact below slider */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {/* Slide Indicator Dots */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 8,
            marginBottom: 16,
          }}>
            {templates.map((t, i) => (
              <button
                key={t.id}
                onClick={() => swiperRef.current?.slideTo(i)}
                style={{
                  width: activeIndex === i ? 26 : 9,
                  height: 9,
                  borderRadius: 9,
                  background: activeIndex === i ? themeColor : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTemplate.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontSize: 13, color: '#94a3b8', marginBottom: 10,
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

      {/* Custom Swiper Styles */}
      <style>{`
        .swiper-slide {
          border-radius: 16px !important;
        }
      `}</style>
    </div>
  )
}

import { useRef, useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCVStore } from '../store/useCVStore'
import { useAuthStore } from '../store/useAuthStore'
import { useIsMobile } from '../utils/useIsMobile'
import ClassicTemplate from '../templates/ClassicTemplate'
import ModernTemplate from '../templates/ModernTemplate'
import MinimalistTemplate from '../templates/MinimalistTemplate'
import CreativeTemplate from '../templates/CreativeTemplate'
import ExecutiveTemplate from '../templates/ExecutiveTemplate'
import { FONT_OPTIONS, migrateFontId } from '../utils/fonts'
import { Download, Palette, Type, ArrowLeft, Check, Loader2, FileText, Languages, ChevronDown, Layout, CloudUpload, CheckCircle2, AlertCircle } from 'lucide-react'

const themeColors = [
  { name: 'Sky Blue', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Slate', value: '#475569' },
]

const templateOptions = [
  { id: 'classic', label: 'Classic', icon: '📋' },
  { id: 'modern', label: 'Modern', icon: '🎯' },
  { id: 'minimalist', label: 'Minimalist', icon: '✨' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'executive', label: 'Executive', icon: '💼' },
]

/**
 * Detect if current device is mobile (for PDF export method selection).
 * Uses a combination of user agent and touch capabilities.
 */
function isMobileDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  // Check for common mobile user agent strings
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return true
  // Check for touch capabilities + small screen as fallback
  if ('ontouchstart' in window && window.innerWidth < 1024) return true
  return false
}

export default function PreviewPage() {
  const {
    personalInfo, summary, experience, education, skills, certifications,
    selectedTemplate, themeColor, fontFamily, setThemeColor, setFontFamily,
    setSelectedTemplate, setCurrentStep, cvLanguage, setCvLanguage,
  } = useCVStore()

  const { user, openAuthModal } = useAuthStore()
  const { saveToCloud, isSaving, lastSavedAt } = useCVStore()
  const isMobile = useIsMobile()

  const previewRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [contentHeight, setContentHeight] = useState(1123)
  const [pdfSizeMode, setPdfSizeMode] = useState('dynamic') // 'dynamic' | 'a4'
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false)
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false)
  const [fontDropDirection, setFontDropDirection] = useState('down')
  const [templateDropDirection, setTemplateDropDirection] = useState('down')
  const [saveStatus, setSaveStatus] = useState(null) // null | 'success' | 'error'
  const [showCustomizePanel, setShowCustomizePanel] = useState(!isMobile) // collapsed by default on mobile
  const fontDropdownRef = useRef(null)
  const templateDropdownRef = useRef(null)
  const cvData = { personalInfo, summary, experience, education, skills, certifications }

  // Auto-clear save status after 3 seconds
  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [saveStatus])

  const handleSaveToCloud = async () => {
    const doSave = async (currentUser) => {
      const result = await saveToCloud(currentUser.id)
      setSaveStatus(result.success ? 'success' : 'error')
    }

    if (!user) {
      // Not logged in → open auth modal with callback
      openAuthModal(async (newUser) => {
        await doSave(newUser)
      })
    } else {
      await doSave(user)
    }
  }

  // Calculate whether dropdown should open up or down based on viewport space
  const calcDropDirection = (ref, dropdownHeight = 320) => {
    if (!ref.current) return 'down'
    const rect = ref.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    return spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'up' : 'down'
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(e.target)) {
        setFontDropdownOpen(false)
      }
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(e.target)) {
        setTemplateDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Track actual content height for dynamic preview sizing
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      if (h > 0) setContentHeight(Math.min(h, 1123))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Calculate preview scale based on viewport
  const getPreviewScale = () => {
    if (!isMobile) return 0.78
    // On mobile, scale to fit viewport width with some padding
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 375
    const availableWidth = viewportWidth - 40 // 20px padding each side
    return Math.min(availableWidth / 794, 0.78)
  }

  const previewScale = getPreviewScale()

  /**
   * PDF Download — Desktop: window.open + print, Mobile: html2canvas + jsPDF
   */
  const handleDownload = useCallback(async () => {
    const element = previewRef.current
    if (!element || isExporting) return

    setIsExporting(true)

    try {
      // Wait for fonts to be loaded in the main document
      if (document.fonts?.ready) await document.fonts.ready

      if (isMobileDevice()) {
        // ========== MOBILE: html2canvas + jsPDF via HIDDEN CLONE ==========
        // We create a clean clone of the CV content in a hidden container
        // at full 794px width — no CSS transforms, no scaling artifacts.
        // This produces a direct PDF download without any print dialog
        // (so no browser-imposed margins).

        const [html2canvasModule, jsPDFModule] = await Promise.all([
          import('html2canvas'),
          import('jspdf'),
        ])
        const html2canvas = html2canvasModule.default
        const { jsPDF } = jsPDFModule

        // Collect Google Fonts stylesheets
        const fontStylesheets = Array.from(
          document.querySelectorAll('link[href*="fonts.googleapis.com"][rel="stylesheet"]')
        )

        // Create a hidden container for clean rendering
        const container = document.createElement('div')
        container.id = 'pdf-render-container'
        container.style.cssText = `
          position: fixed;
          left: -9999px;
          top: 0;
          width: 794px;
          min-height: 1123px;
          background: white;
          z-index: -9999;
          opacity: 0;
          pointer-events: none;
          overflow: visible;
        `

        // Clone font links into a style block inside the container
        // (html2canvas reads computed styles from the live DOM)
        // The fonts are already loaded in the main document, so they'll be available

        // Copy the CV HTML content into the container
        container.innerHTML = element.innerHTML

        document.body.appendChild(container)

        // Wait for images inside the clone to load
        const imgs = container.querySelectorAll('img')
        if (imgs.length > 0) {
          await Promise.all(
            Array.from(imgs).map(img => {
              if (img.complete && img.naturalWidth > 0) return Promise.resolve()
              return new Promise(r => {
                img.onload = r
                img.onerror = r
                setTimeout(r, 3000) // Don't wait forever per image
              })
            })
          )
        }

        // Let the browser finish layout
        await new Promise(r => setTimeout(r, 300))

        // Get actual content height for dynamic sizing
        const cloneHeight = Math.min(container.scrollHeight, 1123)

        // Capture with html2canvas
        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 794,
          height: cloneHeight,
          windowWidth: 794,
          logging: false,
        })

        // Remove the hidden container
        container.remove()

        // Calculate PDF dimensions
        const isA4 = pdfSizeMode === 'a4'
        const pdfWidthMm = 210
        const canvasRatio = canvas.height / canvas.width
        const pdfHeightMm = isA4 ? 297 : Math.min(Math.round(pdfWidthMm * canvasRatio), 297)

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [pdfWidthMm, pdfHeightMm],
        })

        const imgData = canvas.toDataURL('image/jpeg', 0.92)
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm)

        // Generate filename
        const fileName = `CV_${(personalInfo.name || 'Document').replace(/\s+/g, '_')}.pdf`

        // Direct download using Blob + anchor (no print dialog, no margins)
        const pdfBlob = pdf.output('blob')
        const url = URL.createObjectURL(pdfBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()

        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }, 200)

      } else {
        // ========== DESKTOP: window.open + print (original method) ==========

        // Collect all font-related link tags (preconnect + stylesheet)
        const fontLinks = Array.from(
          document.querySelectorAll('link[rel="preconnect"], link[href*="fonts.googleapis.com"]')
        ).map(l => l.outerHTML).join('\n')

        // Get the CV content HTML
        const cvContent = element.innerHTML

        // Calculate page dimensions
        const PX_TO_MM = 0.2646
        const isA4 = pdfSizeMode === 'a4'
        const pageHeightPx = isA4 ? 1123 : contentHeight
        const pageHeightMm = isA4 ? 297 : Math.min(Math.ceil(contentHeight * PX_TO_MM) + 1, 297)

        const printHTML = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>CV_${(personalInfo.name || 'Document').replace(/\s+/g, '_')}</title>
${fontLinks}
<style>
  @page {
    size: 210mm ${pageHeightMm}mm;
    margin: 0;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 794px;
    height: ${pageHeightPx}px;
    overflow: hidden;
    background: white;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
</style>
</head>
<body>${cvContent}</body>
</html>`

        const printWin = window.open('', '_blank')
        if (!printWin) {
          alert('Popup diblokir oleh browser. Izinkan popup untuk situs ini, lalu coba lagi.')
          setIsExporting(false)
          return
        }

        printWin.document.open()
        printWin.document.write(printHTML)
        printWin.document.close()

        await new Promise(resolve => {
          if (printWin.document.readyState === 'complete') resolve()
          else printWin.addEventListener('load', resolve)
          setTimeout(resolve, 2000)
        })

        if (printWin.document.fonts?.ready) {
          await printWin.document.fonts.ready
        }

        const imgs = printWin.document.querySelectorAll('img')
        if (imgs.length > 0) {
          await Promise.all(
            Array.from(imgs).map(img =>
              img.complete && img.naturalWidth > 0
                ? Promise.resolve()
                : new Promise(r => { img.onload = r; img.onerror = r })
            )
          )
        }

        await new Promise(r => setTimeout(r, 300))

        printWin.focus()
        printWin.print()
        printWin.addEventListener('afterprint', () => printWin.close())
        setTimeout(() => { if (!printWin.closed) printWin.close() }, 120000)
      }

    } catch (err) {
      console.error('PDF export error:', err)
      alert('Gagal mengekspor PDF. Silakan coba lagi.')
    } finally {
      setIsExporting(false)
    }
  }, [personalInfo.name, isExporting, pdfSizeMode, contentHeight, cvLanguage, isMobile])

  const templateMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimalist: MinimalistTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
  }
  const TemplateComponent = templateMap[selectedTemplate] || ClassicTemplate

  // Sidebar panel content (shared between mobile and desktop)
  const renderCustomizePanel = () => (
    <>
      {/* Colors */}
      <div style={{ background: 'white', borderRadius: 18, padding: isMobile ? 16 : 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Palette style={{ width: 16, height: 16, color: '#0ea5e9' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Warna Tema</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {themeColors.map((c) => (
            <button key={c.value} onClick={() => setThemeColor(c.value)} title={c.name}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: 12, border: themeColor === c.value ? '3px solid #1e293b' : '2px solid transparent',
                background: c.value, cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
              }}
            >
              {themeColor === c.value && <Check style={{ width: 14, height: 14, color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ width: 32, height: 32, borderRadius: 8, cursor: 'pointer', border: 'none' }} />
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{themeColor}</span>
        </div>
      </div>

      {/* Template — Custom Dropdown */}
      <div style={{ background: 'white', borderRadius: 18, padding: isMobile ? 16 : 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Layout style={{ width: 16, height: 16, color: '#0ea5e9' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Template</span>
        </div>
        <div ref={templateDropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { const next = !templateDropdownOpen; if (next) setTemplateDropDirection(calcDropDirection(templateDropdownRef, 260)); setTemplateDropdownOpen(next); setFontDropdownOpen(false) }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              background: templateDropdownOpen ? '#dbeafe' : '#eff6ff', color: '#0369a1', fontWeight: 600,
              border: templateDropdownOpen ? '1.5px solid #93c5fd' : '1.5px solid #bfdbfe',
              fontSize: 14, fontFamily: "'Inter', sans-serif",
            }}
          >
            <span>{(templateOptions.find(t => t.id === selectedTemplate) || templateOptions[0]).label}</span>
            <ChevronDown style={{
              width: 16, height: 16, transition: 'transform 0.2s',
              transform: templateDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </button>

          <AnimatePresence>
            {templateDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: templateDropDirection === 'down' ? -8 : 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: templateDropDirection === 'down' ? -8 : 8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'absolute', left: 0, right: 0,
                  ...(templateDropDirection === 'down' ? { top: '100%', marginTop: 6 } : { bottom: '100%', marginBottom: 6 }),
                  background: 'white', borderRadius: 14,
                  border: '1px solid #e2e8f0', boxShadow: templateDropDirection === 'down' ? '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' : '0 -8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
                  zIndex: 50, padding: '6px',
                }}
              >
                {templateOptions.map((opt) => {
                  const isActive = selectedTemplate === opt.id
                  return (
                    <button key={opt.id}
                      onClick={() => { setSelectedTemplate(opt.id); setTemplateDropdownOpen(false) }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f0f9ff' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '9px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        fontSize: 13, transition: 'all 0.15s',
                        background: isActive ? '#eff6ff' : 'transparent',
                        color: isActive ? '#0369a1' : '#334155',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <span>{opt.label}</span>
                      {isActive && <Check style={{ width: 14, height: 14, color: '#0ea5e9', flexShrink: 0 }} />}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Font — Custom Dropdown */}
      <div style={{ background: 'white', borderRadius: 18, padding: isMobile ? 16 : 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Type style={{ width: 16, height: 16, color: '#0ea5e9' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Font</span>
        </div>
        <div ref={fontDropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { const next = !fontDropdownOpen; if (next) setFontDropDirection(calcDropDirection(fontDropdownRef, 340)); setFontDropdownOpen(next); setTemplateDropdownOpen(false) }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              background: fontDropdownOpen ? '#dbeafe' : '#eff6ff', color: '#0369a1', fontWeight: 600,
              border: fontDropdownOpen ? '1.5px solid #93c5fd' : '1.5px solid #bfdbfe',
              fontSize: 14, fontFamily: (FONT_OPTIONS.find(f => f.id === migrateFontId(fontFamily)) || FONT_OPTIONS[0]).preview,
            }}
          >
            <span>{(FONT_OPTIONS.find(f => f.id === migrateFontId(fontFamily)) || FONT_OPTIONS[0]).label}</span>
            <ChevronDown style={{
              width: 16, height: 16, transition: 'transform 0.2s',
              transform: fontDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </button>

          <AnimatePresence>
            {fontDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: fontDropDirection === 'down' ? -8 : 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: fontDropDirection === 'down' ? -8 : 8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'absolute', left: 0, right: 0,
                  ...(fontDropDirection === 'down' ? { top: '100%', marginTop: 6 } : { bottom: '100%', marginBottom: 6 }),
                  background: 'white', borderRadius: 14,
                  border: '1px solid #e2e8f0', boxShadow: fontDropDirection === 'down' ? '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' : '0 -8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
                  maxHeight: 320, overflowY: 'auto', zIndex: 50, padding: '6px',
                }}
              >
                {['Sans-Serif', 'Serif', 'Mixed'].map((cat) => {
                  const fonts = FONT_OPTIONS.filter((f) => f.category === cat)
                  if (fonts.length === 0) return null
                  return (
                    <div key={cat}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                        color: '#94a3b8', padding: '8px 10px 4px', userSelect: 'none',
                      }}>{cat}</div>
                      {fonts.map((opt) => {
                        const isActive = migrateFontId(fontFamily) === opt.id
                        return (
                          <button key={opt.id}
                            onClick={() => { setFontFamily(opt.id); setFontDropdownOpen(false) }}
                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f0f9ff' }}
                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                            style={{
                              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '8px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                              fontSize: 13, fontFamily: opt.preview, transition: 'all 0.15s',
                              background: isActive ? '#eff6ff' : 'transparent',
                              color: isActive ? '#0369a1' : '#334155',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          >
                            <span>{opt.label}</span>
                            {isActive && <Check style={{ width: 14, height: 14, color: '#0ea5e9', flexShrink: 0 }} />}
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PDF Size & Language */}
      <div style={{ background: 'white', borderRadius: 18, padding: isMobile ? 16 : 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {/* PDF Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <FileText style={{ width: 16, height: 16, color: '#0ea5e9' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Ukuran PDF</span>
        </div>
        <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #e2e8f0', marginBottom: 18 }}>
          {[
            { id: 'dynamic', label: 'Sesuai Konten' },
            { id: 'a4', label: 'A4 Penuh' },
          ].map((mode) => {
            const isActive = pdfSizeMode === mode.id
            return (
              <button key={mode.id} onClick={() => setPdfSizeMode(mode.id)}
                style={{
                  flex: 1, padding: '8px 0', fontSize: 13, cursor: 'pointer',
                  border: 'none', transition: 'all 0.2s', fontWeight: isActive ? 600 : 400,
                  background: isActive ? '#0ea5e9' : '#f8fafc',
                  color: isActive ? 'white' : '#64748b',
                }}
              >
                {mode.label}
              </button>
            )
          })}
        </div>

        {/* Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Languages style={{ width: 16, height: 16, color: '#0ea5e9' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>Bahasa CV</span>
        </div>
        <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
          {[
            { id: 'id', label: '🇮🇩 Indonesia' },
            { id: 'en', label: 'en English' },
          ].map((opt) => {
            const isActive = cvLanguage === opt.id
            return (
              <button key={opt.id} onClick={() => setCvLanguage(opt.id)}
                style={{
                  flex: 1, padding: '8px 0', fontSize: 13, cursor: 'pointer',
                  border: 'none', transition: 'all 0.2s', fontWeight: isActive ? 600 : 400,
                  background: isActive ? '#0ea5e9' : '#f8fafc',
                  color: isActive ? 'white' : '#64748b',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )

  return (
    <div style={{ paddingTop: isMobile ? 72 : 80, paddingBottom: 40, minHeight: '100vh', background: '#eef2f7' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', marginBottom: isMobile ? 16 : 24, gap: 12 }}>
          <div>
            <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 800, color: '#0f172a' }}>Preview CV</h1>
            <p style={{ fontSize: isMobile ? 13 : 14, color: '#64748b' }}>Lihat hasilnya dan sesuaikan warna tema</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentStep(2)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: isMobile ? '8px 14px' : '10px 18px', borderRadius: 12, background: 'white', color: '#475569', fontWeight: 500, fontSize: isMobile ? 13 : 14, border: '1px solid #e2e8f0', cursor: 'pointer', flex: isMobile ? 1 : undefined }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} /> Edit Data
            </button>

            {/* Save to Cloud */}
            <motion.button whileHover={isSaving ? {} : { scale: 1.03 }} whileTap={isSaving ? {} : { scale: 0.97 }}
              onClick={handleSaveToCloud}
              disabled={isSaving}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: isMobile ? '8px 14px' : '10px 20px', borderRadius: 12,
                background: saveStatus === 'success' ? '#10b981' : saveStatus === 'error' ? '#ef4444' : 'white',
                color: saveStatus ? 'white' : '#374151',
                fontWeight: 600, fontSize: isMobile ? 13 : 14,
                border: saveStatus ? 'none' : '1.5px solid #e2e8f0',
                cursor: isSaving ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: saveStatus === 'success' ? '0 4px 14px rgba(16,185,129,0.3)' : 'none',
                flex: isMobile ? 1 : undefined,
              }}
            >
              {isSaving ? (
                <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> {!isMobile && 'Menyimpan...'}</>
              ) : saveStatus === 'success' ? (
                <><CheckCircle2 style={{ width: 16, height: 16 }} /> {!isMobile && 'Tersimpan!'}</>
              ) : saveStatus === 'error' ? (
                <><AlertCircle style={{ width: 16, height: 16 }} /> Gagal</>
              ) : (
                <><CloudUpload style={{ width: 16, height: 16 }} /> {isMobile ? 'Cloud' : 'Simpan ke Cloud'}</>
              )}
            </motion.button>

            {/* Download PDF */}
            <motion.button whileHover={isExporting ? {} : { scale: 1.03 }} whileTap={isExporting ? {} : { scale: 0.97 }}
              onClick={handleDownload}
              disabled={isExporting}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: isMobile ? '8px 14px' : '10px 24px', borderRadius: 12,
                background: isExporting ? '#94a3b8' : '#0ea5e9', color: 'white', fontWeight: 600, fontSize: isMobile ? 13 : 14,
                border: 'none', cursor: isExporting ? 'wait' : 'pointer',
                boxShadow: isExporting ? 'none' : '0 6px 20px rgba(14,165,233,0.3)',
                flex: isMobile ? 1 : undefined,
              }}
            >
              {isExporting ? (
                <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> {isMobile ? 'PDF...' : 'Mengekspor...'}</>
              ) : (
                <><Download style={{ width: 16, height: 16 }} /> {isMobile ? 'PDF' : 'Download PDF'}</>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile: Collapsible Customize Toggle */}
        {isMobile && (
          <button
            onClick={() => setShowCustomizePanel(!showCustomizePanel)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px', borderRadius: 12, background: 'white', border: '1px solid #e2e8f0',
              cursor: 'pointer', marginBottom: 16, fontSize: 13, fontWeight: 600, color: '#475569',
            }}
          >
            <Palette style={{ width: 16, height: 16, color: '#0ea5e9' }} />
            {showCustomizePanel ? 'Tutup Kustomisasi' : 'Kustomisasi Warna, Font & Template'}
            <ChevronDown style={{ width: 14, height: 14, transition: 'transform 0.2s', transform: showCustomizePanel ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>
        )}

        {/* Mobile: Customize Panel (collapsible) */}
        {isMobile && showCustomizePanel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {renderCustomizePanel()}
          </div>
        )}

        <div style={{ display: isMobile ? 'block' : 'grid', gridTemplateColumns: isMobile ? undefined : '260px 1fr', gap: 24 }}>
          {/* Sidebar — Desktop only */}
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {renderCustomizePanel()}
            </div>
          )}

          {/* Preview */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 620 }}>
              {/* Shadow wrapper */}
              <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)', background: 'white' }}>
                {/* A4 sized container: 794px wide x 1123px tall (96dpi) - scaled down to fit */}
                <div
                  ref={previewRef}
                  style={{
                    width: 794,
                    maxHeight: 1123,
                    overflow: 'hidden',
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top left',
                    marginBottom: -contentHeight * (1 - previewScale),
                    marginRight: isMobile ? -(794 * (1 - previewScale)) : undefined,
                    pointerEvents: 'none',
                  }}
                >
                  <TemplateComponent data={cvData} themeColor={themeColor} fontFamily={fontFamily} lang={cvLanguage} />
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
                Preview skala {Math.round(previewScale * 100)}% — PDF: {pdfSizeMode === 'a4' ? 'A4 (210×297mm)' : `Dinamis (210×${Math.min(Math.ceil(contentHeight * 0.2646) + 1, 297)}mm)`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
